import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { analyzeImage } from './image/analyzeImage';
import { convertToWebP, convertToAvif } from './image/convertImage';
import { estimateWebPSize, estimateAvifSize } from './image/estimateSize';
import { getInspectorHtml } from './webview/inspectorHtml';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'imageInspector.open',
      async (uri: vscode.Uri) => {
        if (!uri || !fs.existsSync(uri.fsPath)) {
          vscode.window.showErrorMessage(
            'Image Inspector: No file selected or file does not exist.'
          );
          return;
        }

        try {
          // Аналіз зображення
          const infoRaw = await analyzeImage(uri.fsPath);

          // Забезпечуємо числа для width, height і hasAlpha
          const info = {
            width: infoRaw.width ?? 0,
            height: infoRaw.height ?? 0,
            format: infoRaw.format,
            sizeKB: infoRaw.sizeKB,
            hasAlpha: infoRaw.hasAlpha ?? false,
            colorSpace: infoRaw.colorSpace ?? 'unknown',
          };

          // Читаємо файл як Buffer для оцінки стиснення
          const buffer = fs.readFileSync(uri.fsPath);
          const webpSize = await estimateWebPSize(buffer);
          const avifSize = await estimateAvifSize(buffer);

          // Створюємо Webview
          const panel = vscode.window.createWebviewPanel(
            'imageInspector',
            `Image Inspector: ${path.basename(uri.fsPath)}`,
            vscode.ViewColumn.Beside,
            {
              enableScripts: true,
              localResourceRoots: [vscode.Uri.file(path.dirname(uri.fsPath))],
            }
          );

          panel.webview.html = getInspectorHtml(
            panel,
            uri.fsPath,
            info,
            webpSize,
            avifSize
          );

          // Обробка повідомлень з Webview
          panel.webview.onDidReceiveMessage(async msg => {
            try {
              if (msg.command === 'saveWebP') {
                const outputPath = await vscode.window.showSaveDialog({
                  defaultUri: vscode.Uri.file(
                    uri.fsPath.replace(/\.[^/.]+$/, '.webp')
                  ),
                  filters: { WebP: ['webp'] },
                });
                if (outputPath) {
                  await convertToWebP(uri.fsPath, outputPath.fsPath);
                  vscode.window.showInformationMessage(
                    `Saved WebP: ${outputPath.fsPath}`
                  );
                }
              } else if (msg.command === 'saveAvif') {
                const outputPath = await vscode.window.showSaveDialog({
                  defaultUri: vscode.Uri.file(
                    uri.fsPath.replace(/\.[^/.]+$/, '.avif')
                  ),
                  filters: { AVIF: ['avif'] },
                });
                if (outputPath) {
                  await convertToAvif(uri.fsPath, outputPath.fsPath);
                  vscode.window.showInformationMessage(
                    `Saved AVIF: ${outputPath.fsPath}`
                  );
                }
              }
            } catch (err: any) {
              vscode.window.showErrorMessage(
                `Image Inspector error: ${err.message}`
              );
            }
          });
        } catch (err: any) {
          vscode.window.showErrorMessage(
            `Image Inspector error: ${err.message}`
          );
        }
      }
    )
  );
}

export function deactivate() {}
