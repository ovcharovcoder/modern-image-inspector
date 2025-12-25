# Modern Image Inspector

[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/ovcharovcoder.modern-image-inspector?color=blue)](https://marketplace.visualstudio.com/items?itemName=ovcharovcoder.modern-image-inspector)
[![GitHub Stars](https://img.shields.io/github/stars/ovcharovcoder/modern-image-inspector?color=yellow)](https://github.com/ovcharovcoder/modern-image-inspector)
[![License](https://img.shields.io/badge/license-MIT-green)](https://github.com/ovcharovcoder/modern-image-inspector/blob/main/LICENSE)

> Modern Image Inspector — Inspect image compression potential and convert images to WebP or AVIF directly in VS Code.

---

## ✨ Features

- 🖼 **Image Inspection** — Inspect PNG and JPG images and view filename, format, dimensions, and original file size.
- 📏 **Size Comparison** — Compare the original image size with estimated sizes for WebP (q75) and AVIF (q50).
- 🛠 **Convert & Save** — Convert and save images as WebP or AVIF directly from the inspector panel.
- 🖼 **Side-by-side Preview** — Clear layout with image information on the left and image preview on the right.
- 🛡 **Local & Secure** — All image processing is done locally using Sharp. No uploads, no tracking.


### Screenshot

![Modern Image Inspector Interface](https://raw.githubusercontent.com/ovcharovcoder/modern-image-inspector/main/images/1.png)

---

## 🛠 Installation

1. Open **VS Code → Extensions** (`Ctrl+Shift+X` / `Cmd+Shift+X`).
2. Search for **Modern Image Inspector** and click Install.

---

## 🎨 Usage

To inspect an image:

- Right-click a **PNG** or **JPG** file in the Explorer and select **Open Image Inspector**.
- The Webview panel will display:
  - **Basic Info**: filename, image format, dimensions, original file size.
  - **Estimated Compression**: predicted file sizes for WebP (q75) and AVIF (q50).
- Click the buttons to **Save as WebP** or **Save as AVIF**.
- Left side shows info and buttons; right side shows the image.
- All operations are performed locally and safely—no files are uploaded.

---

## 🧩 Contributing

Found a bug or want to suggest an improvement?  
Open an issue or pull request on [GitHub](https://github.com/ovcharovcoder/modern-image-inspector).

---

## 👤 Author

<img 
  src="https://raw.githubusercontent.com/ovcharovcoder/modern-image-inspector/main/images/avatar.png"
  alt="Andriy Ovcharov"
  width="60"
/>

Andriy Ovcharov  
📧 ovcharovcoder@gmail.com

---

## ☕ Support

If you enjoy Modern Image Inspector, consider supporting the author:  
[Donate via PayPal](https://www.paypal.com/donate/?business=datoshcode@gmail.com)

---

## 🪪 License

Released under the [MIT License](https://github.com/ovcharovcoder/modern-image-inspector/blob/main/LICENSE)

--- 

## 🧑‍💻 Development & Build

**Requirements**

- Node.js 18+
- npm 9+
- VS Code 1.81+


**Install & Build**
1. Download the project
2. To build, use the following commands:<br>
`npm install` <br>
`npm run package`

