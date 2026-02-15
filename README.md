# White-Label QR Code Generator

A premium, fully customizable QR code generator built with Next.js, designed for easy white-labeling across multiple clients. Deploy a new branded instance in seconds by simply modifying a single configuration file.

## 🎯 Features

- **Single-File Branding**: All brand-specific logic isolated in `brand-config.js`
- **Custom Frame System**: Overlay QR codes on custom SVG frames with precise positioning
- **High-Resolution Exports**: 3000×3000px PNG, JPEG, and SVG downloads
- **Premium UI**: Dark-mode aesthetic with smooth animations and distinctive typography
- **Static Export**: Deploys to GitHub Pages with zero server costs
- **Live Preview**: Real-time QR code generation as you type

## 🚀 Quick Start

### 1. Installation

```bash
npm install
```

### 2. Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your QR generator.

### 3. Build for Production

```bash
npm run build
```

The static site will be generated in the `out/` directory.

## 🎨 Customization for New Clients

All customization happens in **`brand-config.js`**. Here's what you can configure:

### Client Branding (UI Colors & Name)

```javascript
clientBranding: {
  name: "Your Brand Name",
  logo: "/logo.svg",
  colors: {
    primary: "#YOUR_PRIMARY_COLOR",
    secondary: "#YOUR_SECONDARY_COLOR",
    accent: "#YOUR_ACCENT_COLOR",
    background: "#YOUR_BG_COLOR",
    surface: "#YOUR_CARD_COLOR",
    text: "#YOUR_TEXT_COLOR",
  },
}
```

### QR Code Styling

```javascript
qrOptions: {
  dotsOptions: {
    color: "#1a1a1a",
    type: "rounded", // Options: rounded, dots, classy, square, extra-rounded
  },
  cornersSquareOptions: {
    color: "#1a1a1a",
    type: "extra-rounded", // Options: dot, square, extra-rounded
  },
  // ... more options
}
```

**Available QR Styles:**
- **Dots**: `rounded`, `dots`, `classy`, `classy-rounded`, `square`, `extra-rounded`
- **Corners**: `dot`, `square`, `extra-rounded`

### Custom Frame SVG

Replace the `frameSVG` string with your own SVG design:

```javascript
frameSVG: `
  <svg viewBox="0 0 3000 3000" xmlns="http://www.w3.org/2000/svg">
    <!-- Your custom frame design here -->
    <!-- Make sure to include a "hole" where the QR code will sit -->
  </svg>
`,
```

**Frame Design Tips:**
- Use a 3000×3000px canvas
- Create a transparent or white "hole" for the QR code
- Add decorative borders, patterns, or branding elements
- Use your brand colors

### Frame Position (QR Alignment)

Adjust where the QR code appears within your frame:

```javascript
framePosition: {
  x: 600,        // X position (from left)
  y: 600,        // Y position (from top)
  scale: 1.0,    // Scale factor (1.0 = fit perfectly)
  qrSize: 1800,  // Size of QR code in pixels
}
```

### Logo in QR Center

Place your logo in `/public/logo.svg` and configure:

```javascript
export const BRAND_LOGO = {
  enabled: true,
  url: "/logo.svg",
};
```

## 📦 Deployment to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

1. **Create a new GitHub repository** for your client
2. **Push this code** to the repository
3. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: GitHub Actions
   - Save

The GitHub Actions workflow will automatically build and deploy on every push to `main`.

### Option 2: Manual Deployment

```bash
# Build the static site
npm run build

# The 'out' folder contains your static site
# Deploy it to any static hosting service
```

## 🔄 Workflow for Multiple Clients

### Client 1: "Luxe QR"
1. Clone/fork this repo as `luxe-qr-generator`
2. Update `brand-config.js` with Luxe branding
3. Replace `/public/logo.svg` with Luxe logo
4. Push to GitHub
5. Enable GitHub Pages
6. Done! → `username.github.io/luxe-qr-generator`

### Client 2: "Tech Startup"
1. Clone/fork this repo as `techstartup-qr`
2. Update `brand-config.js` with Tech Startup branding
3. Replace `/public/logo.svg` with Tech Startup logo
4. Push to GitHub
5. Enable GitHub Pages
6. Done! → `username.github.io/techstartup-qr`

**Repeat for each client** – it takes less than 5 minutes per instance!

## 🎨 Pre-Made Frame Templates

Here are some ready-to-use frame designs you can copy into `brand-config.js`:

### Minimalist Frame
```javascript
frameSVG: `
  <svg viewBox="0 0 3000 3000" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="3000" height="3000" fill="#FFFFFF"/>
    <rect x="500" y="500" width="2000" height="2000" fill="#F5F5F5" stroke="#333333" stroke-width="2"/>
  </svg>
`
```

### Luxury Gold Border
```javascript
frameSVG: `
  <svg viewBox="0 0 3000 3000" xmlns="http://www.w3.org/2000/svg">
    <rect x="50" y="50" width="2900" height="2900" fill="#FAFAFA" stroke="#D4AF37" stroke-width="20" rx="40"/>
    <rect x="600" y="600" width="1800" height="1800" fill="white" stroke="#D4AF37" stroke-width="2" rx="20"/>
  </svg>
`
```

### Tech/Neon Frame
```javascript
frameSVG: `
  <svg viewBox="0 0 3000 3000" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="3000" height="3000" fill="#0a0a0a"/>
    <rect x="600" y="600" width="1800" height="1800" fill="#1a1a1a" stroke="#00ffff" stroke-width="4" rx="20"/>
  </svg>
`
```

## 📁 Project Structure

```
qr-generator/
├── app/
│   ├── page.tsx          # Main QR generator UI
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/ui/        # shadcn/ui components
├── lib/                  # Utilities
├── public/
│   └── logo.svg          # Client logo
├── brand-config.js       # ⭐ MODIFY THIS FOR EACH CLIENT
├── next.config.js        # Next.js static export config
├── package.json          # Dependencies
└── .github/workflows/
    └── deploy.yml        # Automatic GitHub Pages deployment
```

## 🛠️ Technical Stack

- **Next.js 14** (Static Export)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **qr-code-styling** library
- **Lucide React** icons

## 🎯 Advanced Customization

### Custom QR Code Patterns

The `qr-code-styling` library supports many pattern types:

```javascript
qrOptions: {
  dotsOptions: {
    type: "rounded" | "dots" | "classy" | "classy-rounded" | "square" | "extra-rounded"
  },
  cornersSquareOptions: {
    type: "dot" | "square" | "extra-rounded"
  },
  cornersDotOptions: {
    type: "dot" | "square"
  }
}
```

### Error Correction Levels

Add to `qrOptions`:

```javascript
qrOptions: {
  errorCorrectionLevel: "L" | "M" | "Q" | "H", // L=7%, M=15%, Q=25%, H=30%
}
```

Higher levels allow for more logo coverage but create denser QR codes.

### Gradient QR Codes

```javascript
dotsOptions: {
  gradient: {
    type: "linear",
    rotation: 0,
    colorStops: [
      { offset: 0, color: "#FF0000" },
      { offset: 1, color: "#0000FF" }
    ]
  }
}
```

## 🐛 Troubleshooting

### QR Code Not Displaying
- Check that `qr-code-styling` is properly installed
- Verify the URL/text input is not empty
- Check browser console for errors

### GitHub Pages 404 Error
- Ensure GitHub Pages is enabled (Settings → Pages)
- Wait 2-3 minutes for initial deployment
- Check that the workflow completed successfully

### Canvas Export Fails
- Ensure the frame SVG is valid XML
- Check that `framePosition` coordinates are within bounds
- Verify image sources are accessible (CORS)

## 📄 License

MIT License - Free to use for commercial projects.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the `brand-config.js` comments
3. Consult the qr-code-styling documentation

---

Built with ❤️ for easy white-labeling across unlimited clients.
