import * as vscode from 'vscode';
import * as path from 'path';

export function getInspectorHtml(
  panel: vscode.WebviewPanel,
  filePath: string,
  info: any,
  webpSize: string,
  avifSize: string
) {
  const imageSrc = panel.webview.asWebviewUri(vscode.Uri.file(filePath));

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Image Inspector</title>
    <style>
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        display: flex;
        height: 100vh;
        background-color: var(--vscode-editor-background);
        color: var(--vscode-editor-foreground);
      }
      .info {
        width: 320px;
        padding: 20px;
        border-right: 1px solid var(--vscode-editorWidget-border);
        box-sizing: border-box;
        background: var(--vscode-sideBar-background);
        display: flex;
        flex-direction: column;
      }
      .section {
        margin-bottom: 20px;
      }
      .section h3 {
        margin-bottom: 10px;
        font-size: 1.1em;
        border-bottom: 1px solid var(--vscode-editorWidget-border);
        padding-bottom: 4px;
      }
      .section p {
        margin: 4px 0;
      }
      .section .value {
        font-weight: 600;
      }
      .info button {
        margin-top: 6px;
        padding: 6px 12px;
        cursor: pointer;
        background-color: var(--vscode-button-background);
        color: var(--vscode-button-foreground);
        border: none;
        border-radius: 3px;
        transition: background 0.2s ease;
      }
      .info button:hover {
        background-color: var(--vscode-button-hoverBackground);
      }
      .image-container {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--vscode-editor-background);
        padding: 10px;
      }
      .image-container img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        filter: var(--image-filter, none);
        border-radius: 4px;
      }
    </style>
  </head>
  <body>
    <div class="info">
      <div class="section">
        <h3>Basic Info</h3>
        <p><strong>Filename:</strong> <span class="value">${path.basename(filePath)}</span></p>
        <p><strong>Format:</strong> <span class="value">${info.format}</span></p>
        <p><strong>Dimensions:</strong> <span class="value">${info.width} × ${info.height}</span></p>
        <p><strong>Original size:</strong> <span class="value">${info.sizeKB} KB</span></p>
      </div>
      <div class="section">
        <h3>Estimated Compression</h3>
        <p><strong>WebP (q75):</strong> <span class="value">${webpSize} KB</span></p>
        <p><strong>AVIF (q50):</strong> <span class="value">${avifSize} KB</span></p>
        <button onclick="convertWebP()">Save as WebP</button>
        <button onclick="convertAvif()">Save as AVIF</button>
      </div>
    </div>
    <div class="image-container">
      <img src="${imageSrc}" />
    </div>
    <script>
      const vscode = acquireVsCodeApi();
      function convertWebP() {
        vscode.postMessage({ command: 'saveWebP' });
      }
      function convertAvif() {
        vscode.postMessage({ command: 'saveAvif' });
      }

      // Автоматичне затемнення зображення під темну тему
      const body = document.body;
      const img = document.querySelector('img');
      const observer = new MutationObserver(() => {
        const isDark = getComputedStyle(body).getPropertyValue('--vscode-editor-background').includes('#1e1e1e');
        if (isDark) {
          img.style.filter = 'brightness(0.9)';
        } else {
          img.style.filter = 'none';
        }
      });
      observer.observe(body, { attributes: true, childList: true, subtree: true });
    </script>
  </body>
  </html>
  `;
}
