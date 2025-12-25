import * as vscode from 'vscode';
import * as path from 'path';

export function getInspectorHtml(
  panel: vscode.WebviewPanel,
  filePath: string,
  info: any,
  webpSize: number,
  avifSize: number
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
    width: 350px;
    padding: 24px;
    border-right: 1px solid var(--vscode-editorWidget-border);
    box-sizing: border-box;
    background: var(--vscode-sideBar-background);
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .section {
    display: flex;
    flex-direction: column;
  }

  .section h2 {
    font-size: 1.5em;
    margin: 0 0 12px 0;
    border-bottom: 1px solid var(--vscode-editorWidget-border);
    padding-bottom: 6px;
  }

  .section p {
    margin: 4px 0;
  }

  .section .value {
    font-weight: 600;
  }

  .info button {
    margin-top: 8px;
    padding: 10px 16px;
    cursor: pointer;
    background-color: var(--vscode-button-background);
    color: var(--vscode-button-foreground);
    border: none;
    border-radius: 5px;
    font-size: 1em;
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
    padding: 20px;
  }

  .image-container img {
    max-width: 800px;
    max-height: 800px;
    object-fit: contain;
    filter: var(--image-filter, none);
    border-radius: 6px;
  }

  hr {
    border: none;
    border-top: 1px solid var(--vscode-editorWidget-border);
    margin: 16px 0;
  }
</style>
</head>
<body>
  <div class="info">
    <div class="section">
      <h2>Basic Info</h2>
      <p><strong>Filename:</strong> <span class="value">${path.basename(filePath)}</span></p>
      <p><strong>Format:</strong> <span class="value">${info.format}</span></p>
      <p><strong>Dimensions:</strong> <span class="value">${info.width} × ${info.height}</span></p>
      <p><strong>Original size:</strong> <span class="value">${info.sizeKB.toFixed(2)} KB</span></p>
    </div>

    <div class="section">
      <h2>Estimated Compression</h2>
      <p><strong>WebP (q75):</strong> <span class="value">${webpSize.toFixed(2)} KB</span></p>
      <p><strong>AVIF (q50):</strong> <span class="value">${avifSize.toFixed(2)} KB</span></p>
      <button onclick="convertWebP()">Save as WebP</button>
      <button style="background-color: #4CAF50; color: white;" onclick="convertAvif()">Save as AVIF</button>
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
