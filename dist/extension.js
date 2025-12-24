"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const analyzeImage_1 = require("./image/analyzeImage");
const estimateSize_1 = require("./image/estimateSize");
const convertImage_1 = require("./image/convertImage");
const inspectorHtml_1 = require("./webview/inspectorHtml");
function activate(context) {
    const disposable = vscode.commands.registerCommand('imageInspector.open', async (uri) => {
        try {
            if (!uri) {
                const selected = await vscode.window.showOpenDialog({
                    canSelectMany: false,
                    filters: { Images: ['png', 'jpg', 'jpeg'] },
                });
                if (!selected || selected.length === 0)
                    return;
                uri = selected[0];
            }
            const filePath = uri.fsPath;
            const fileBuffer = fs.readFileSync(filePath);
            // Отримуємо інформацію про зображення
            const info = await (0, analyzeImage_1.analyzeImage)(filePath);
            // Оцінка розміру після конвертації
            const webp = await (0, estimateSize_1.estimateWebPSave)(fileBuffer);
            const avif = await (0, estimateSize_1.estimateAvifSave)(fileBuffer);
            const panel = vscode.window.createWebviewPanel('imageInspector', 'Image Inspector', vscode.ViewColumn.One, {
                enableScripts: true,
                localResourceRoots: [vscode.Uri.file(path.dirname(filePath))],
            });
            // HTML для Webview
            panel.webview.html = (0, inspectorHtml_1.getInspectorHtml)(panel, filePath, info, webp.sizeKB, avif.sizeKB);
            // Обробка повідомлень від Webview (кнопки збереження)
            panel.webview.onDidReceiveMessage(async (message) => {
                if (message.command === 'saveWebP') {
                    const savePath = await vscode.window.showSaveDialog({
                        defaultUri: vscode.Uri.file(filePath.replace(/\.[^.]+$/, '.webp')),
                    });
                    if (savePath) {
                        await (0, convertImage_1.saveAsWebP)(fileBuffer, savePath.fsPath);
                        vscode.window.showInformationMessage(`Saved as WebP: ${savePath.fsPath}`);
                    }
                }
                else if (message.command === 'saveAvif') {
                    const savePath = await vscode.window.showSaveDialog({
                        defaultUri: vscode.Uri.file(filePath.replace(/\.[^.]+$/, '.avif')),
                    });
                    if (savePath) {
                        await (0, convertImage_1.saveAsAvif)(fileBuffer, savePath.fsPath);
                        vscode.window.showInformationMessage(`Saved as AVIF: ${savePath.fsPath}`);
                    }
                }
            });
        }
        catch (err) {
            vscode.window.showErrorMessage(`Image Inspector error: ${err.message || err}`);
        }
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
