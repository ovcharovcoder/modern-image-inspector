import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { analyzeImage } from './image/analyzeImage';
import { estimateWebPSave, estimateAvifSave } from './image/estimateSize';
import { saveAsWebP, saveAsAvif } from './image/convertImage';
import { getInspectorHtml } from './webview/inspectorHtml';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'imageInspector.open',
    async (uri: vscode.Uri) => {
      try {
        if (!uri) {
          const selected = await vscode.window.showOpenDialog({
            canSelectMany: false,
            filters: { Images: ['png', 'jpg', 'jpeg'] },
          });
          if (!selected || selected.length === 0) return;
          uri = selected[0];
        }

        const filePath = uri.fsPath;
        const fileBuffer = fs.readFileSync(filePath);

        // Отримуємо інформацію про зображення
        const info = await analyzeImage(filePath);

        // Оцінка розміру після конвертації
        const webp = await estimateWebPSave(fileBuffer);
        const avif = await estimateAvifSave(fileBuffer);

        const panel = vscode.window.createWebviewPanel(
          'imageInspector',
          'Image Inspector',
          vscode.ViewColumn.One,
          {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(path.dirname(filePath))],
          }
        );

        // HTML для Webview
        panel.webview.html = getInspectorHtml(
          panel,
          filePath,
          info,
          webp.sizeKB,
          avif.sizeKB
        );

        // Обробка повідомлень від Webview (кнопки збереження)
        panel.webview.onDidReceiveMessage(async message => {
          if (message.command === 'saveWebP') {
            const savePath = await vscode.window.showSaveDialog({
              defaultUri: vscode.Uri.file(
                filePath.replace(/\.[^.]+$/, '.webp')
              ),
            });
            if (savePath) {
              await saveAsWebP(fileBuffer, savePath.fsPath);
              vscode.window.showInformationMessage(
                `Saved as WebP: ${savePath.fsPath}`
              );
            }
          } else if (message.command === 'saveAvif') {
            const savePath = await vscode.window.showSaveDialog({
              defaultUri: vscode.Uri.file(
                filePath.replace(/\.[^.]+$/, '.avif')
              ),
            });
            if (savePath) {
              await saveAsAvif(fileBuffer, savePath.fsPath);
              vscode.window.showInformationMessage(
                `Saved as AVIF: ${savePath.fsPath}`
              );
            }
          }
        });
      } catch (err: any) {
        vscode.window.showErrorMessage(
          `Image Inspector error: ${err.message || err}`
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
