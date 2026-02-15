# Brand Template Examples

Copy these pre-configured templates into your `brand-config.js` for instant branding.

## 1. Luxury/Premium Brand (Gold & Black)

```javascript
export const BRAND_SETTINGS = {
  clientBranding: {
    name: "QR code generator",
    logo: "/logo.svg",
    colors: {
      primary: "#D4AF37", // Gold
      secondary: "#1a1a1a", // Deep black
      accent: "#F5F5DC", // Beige/cream
      background: "#0a0a0a", // Almost black
      surface: "#1a1a1a", // Card background
      text: "#F5F5DC", // Light text
    },
  },
  qrOptions: {
    width: 2400,
    height: 2400,
    type: "svg",
    margin: 10,
    dotsOptions: { color: "#1a1a1a", type: "extra-rounded" },
    cornersSquareOptions: { color: "#1a1a1a", type: "extra-rounded" },
    cornersDotOptions: { color: "#1a1a1a", type: "dot" },
    backgroundOptions: { color: "#ffffff" },
    imageOptions: { hideBackgroundDots: true, imageSize: 0.3, margin: 8 },
  },
  frameSVG: `
    <svg viewBox="0 0 3000 3000" xmlns="http://www.w3.org/2000/svg">
      <rect x="50" y="50" width="2900" height="2900" fill="#FAFAFA" stroke="#D4AF37" stroke-width="20" rx="40"/>
      <rect x="150" y="150" width="2700" height="2700" fill="none" stroke="#D4AF37" stroke-width="4" rx="20" opacity="0.5"/>
      <rect x="600" y="600" width="1800" height="1800" fill="white" stroke="#D4AF37" stroke-width="2" rx="20"/>
    </svg>
  `,
  framePosition: { x: 600, y: 600, scale: 1.0, qrSize: 1800 },
  exportSettings: {
    finalWidth: 3000,
    finalHeight: 3000,
    formats: {
      png: { quality: 1.0, type: "image/png" },
      jpeg: { quality: 0.95, type: "image/jpeg" },
      svg: { enabled: true },
    },
  },
};
```

---

## 2. Tech/Startup (Neon Blue & Dark)

```javascript
export const BRAND_SETTINGS = {
  clientBranding: {
    name: "Tech QR",
    logo: "/logo.svg",
    colors: {
      primary: "#00D9FF", // Neon cyan
      secondary: "#0a0a0a", // Pure black
      accent: "#7B68EE", // Medium slate blue
      background: "#000000", // Black
      surface: "#1a1a2e", // Dark blue-black
      text: "#FFFFFF", // White
    },
  },
  qrOptions: {
    width: 2400,
    height: 2400,
    type: "svg",
    margin: 10,
    dotsOptions: { color: "#000000", type: "square" },
    cornersSquareOptions: { color: "#00D9FF", type: "square" },
    cornersDotOptions: { color: "#7B68EE", type: "square" },
    backgroundOptions: { color: "#ffffff" },
    imageOptions: { hideBackgroundDots: true, imageSize: 0.3, margin: 8 },
  },
  frameSVG: `
    <svg viewBox="0 0 3000 3000" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="3000" height="3000" fill="#0a0a0a"/>
      <rect x="50" y="50" width="2900" height="2900" fill="none" stroke="#00D9FF" stroke-width="8" rx="0"/>
      <rect x="100" y="100" width="2800" height="2800" fill="none" stroke="#7B68EE" stroke-width="2" rx="0" opacity="0.5"/>
      <rect x="600" y="600" width="1800" height="1800" fill="#1a1a2e" stroke="#00D9FF" stroke-width="4" rx="10"/>
    </svg>
  `,
  framePosition: { x: 600, y: 600, scale: 1.0, qrSize: 1800 },
  exportSettings: {
    finalWidth: 3000,
    finalHeight: 3000,
    formats: {
      png: { quality: 1.0, type: "image/png" },
      jpeg: { quality: 0.95, type: "image/jpeg" },
      svg: { enabled: true },
    },
  },
};
```

---

## 3. Minimalist/Clean (White & Gray)

```javascript
export const BRAND_SETTINGS = {
  clientBranding: {
    name: "Clean QR",
    logo: "/logo.svg",
    colors: {
      primary: "#2C3E50", // Dark gray-blue
      secondary: "#FFFFFF", // White
      accent: "#7F8C8D", // Medium gray
      background: "#ECF0F1", // Light gray
      surface: "#FFFFFF", // White
      text: "#2C3E50", // Dark gray-blue
    },
  },
  qrOptions: {
    width: 2400,
    height: 2400,
    type: "svg",
    margin: 10,
    dotsOptions: { color: "#2C3E50", type: "rounded" },
    cornersSquareOptions: { color: "#2C3E50", type: "extra-rounded" },
    cornersDotOptions: { color: "#2C3E50", type: "dot" },
    backgroundOptions: { color: "#ffffff" },
    imageOptions: { hideBackgroundDots: true, imageSize: 0.3, margin: 8 },
  },
  frameSVG: `
    <svg viewBox="0 0 3000 3000" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="3000" height="3000" fill="#FFFFFF"/>
      <rect x="50" y="50" width="2900" height="2900" fill="none" stroke="#ECF0F1" stroke-width="40" rx="30"/>
      <rect x="600" y="600" width="1800" height="1800" fill="#FAFAFA" stroke="#2C3E50" stroke-width="2" rx="15"/>
    </svg>
  `,
  framePosition: { x: 600, y: 600, scale: 1.0, qrSize: 1800 },
  exportSettings: {
    finalWidth: 3000,
    finalHeight: 3000,
    formats: {
      png: { quality: 1.0, type: "image/png" },
      jpeg: { quality: 0.95, type: "image/jpeg" },
      svg: { enabled: true },
    },
  },
};
```

---

## 4. Nature/Organic (Green & Earth Tones)

```javascript
export const BRAND_SETTINGS = {
  clientBranding: {
    name: "Nature QR",
    logo: "/logo.svg",
    colors: {
      primary: "#2E7D32", // Forest green
      secondary: "#1B5E20", // Dark green
      accent: "#AED581", // Light green
      background: "#F1F8E9", // Very light green
      surface: "#FFFFFF", // White
      text: "#1B5E20", // Dark green
    },
  },
  qrOptions: {
    width: 2400,
    height: 2400,
    type: "svg",
    margin: 10,
    dotsOptions: { color: "#1B5E20", type: "classy-rounded" },
    cornersSquareOptions: { color: "#2E7D32", type: "extra-rounded" },
    cornersDotOptions: { color: "#1B5E20", type: "dot" },
    backgroundOptions: { color: "#F1F8E9" },
    imageOptions: { hideBackgroundDots: true, imageSize: 0.3, margin: 8 },
  },
  frameSVG: `
    <svg viewBox="0 0 3000 3000" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="3000" height="3000" fill="#F1F8E9"/>
      <circle cx="1500" cy="1500" r="1450" fill="none" stroke="#AED581" stroke-width="20" opacity="0.3"/>
      <circle cx="1500" cy="1500" r="1300" fill="none" stroke="#2E7D32" stroke-width="10" opacity="0.5"/>
      <circle cx="1500" cy="1500" r="900" fill="#FFFFFF" stroke="#2E7D32" stroke-width="4"/>
    </svg>
  `,
  framePosition: { x: 600, y: 600, scale: 1.0, qrSize: 1800 },
  exportSettings: {
    finalWidth: 3000,
    finalHeight: 3000,
    formats: {
      png: { quality: 1.0, type: "image/png" },
      jpeg: { quality: 0.95, type: "image/jpeg" },
      svg: { enabled: true },
    },
  },
};
```

---

## 5. Corporate/Professional (Navy & Silver)

```javascript
export const BRAND_SETTINGS = {
  clientBranding: {
    name: "Corporate QR",
    logo: "/logo.svg",
    colors: {
      primary: "#003366", // Navy blue
      secondary: "#001F3F", // Dark navy
      accent: "#C0C0C0", // Silver
      background: "#F5F5F5", // Light gray
      surface: "#FFFFFF", // White
      text: "#001F3F", // Dark navy
    },
  },
  qrOptions: {
    width: 2400,
    height: 2400,
    type: "svg",
    margin: 10,
    dotsOptions: { color: "#001F3F", type: "square" },
    cornersSquareOptions: { color: "#003366", type: "square" },
    cornersDotOptions: { color: "#003366", type: "square" },
    backgroundOptions: { color: "#ffffff" },
    imageOptions: { hideBackgroundDots: true, imageSize: 0.3, margin: 8 },
  },
  frameSVG: `
    <svg viewBox="0 0 3000 3000" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="3000" height="3000" fill="#FFFFFF"/>
      <rect x="100" y="100" width="2800" height="2800" fill="none" stroke="#003366" stroke-width="15" rx="0"/>
      <rect x="150" y="150" width="2700" height="2700" fill="none" stroke="#C0C0C0" stroke-width="3" rx="0" opacity="0.5"/>
      <rect x="600" y="600" width="1800" height="1800" fill="#F5F5F5" stroke="#003366" stroke-width="3" rx="0"/>
    </svg>
  `,
  framePosition: { x: 600, y: 600, scale: 1.0, qrSize: 1800 },
  exportSettings: {
    finalWidth: 3000,
    finalHeight: 3000,
    formats: {
      png: { quality: 1.0, type: "image/png" },
      jpeg: { quality: 0.95, type: "image/jpeg" },
      svg: { enabled: true },
    },
  },
};
```

---

## 6. Sunset/Warm (Orange & Pink Gradient)

```javascript
export const BRAND_SETTINGS = {
  clientBranding: {
    name: "Sunset QR",
    logo: "/logo.svg",
    colors: {
      primary: "#FF6B6B", // Coral red
      secondary: "#FF8E53", // Orange
      accent: "#FFA07A", // Light salmon
      background: "#2C1810", // Dark brown
      surface: "#3D2817", // Brown
      text: "#FFE5D9", // Peach
    },
  },
  qrOptions: {
    width: 2400,
    height: 2400,
    type: "svg",
    margin: 10,
    dotsOptions: {
      gradient: {
        type: "radial",
        colorStops: [
          { offset: 0, color: "#FF6B6B" },
          { offset: 1, color: "#FF8E53" },
        ],
      },
      type: "dots",
    },
    cornersSquareOptions: { color: "#FF6B6B", type: "extra-rounded" },
    cornersDotOptions: { color: "#FF8E53", type: "dot" },
    backgroundOptions: { color: "#FFF5EE" },
    imageOptions: { hideBackgroundDots: true, imageSize: 0.3, margin: 8 },
  },
  frameSVG: `
    <svg viewBox="0 0 3000 3000" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sunsetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FF6B6B;stop-opacity:0.2" />
          <stop offset="100%" style="stop-color:#FF8E53;stop-opacity:0.2" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="3000" height="3000" fill="url(#sunsetGrad)"/>
      <rect x="50" y="50" width="2900" height="2900" fill="none" stroke="#FF6B6B" stroke-width="15" rx="50"/>
      <rect x="600" y="600" width="1800" height="1800" fill="#FFF5EE" stroke="#FF8E53" stroke-width="3" rx="30"/>
    </svg>
  `,
  framePosition: { x: 600, y: 600, scale: 1.0, qrSize: 1800 },
  exportSettings: {
    finalWidth: 3000,
    finalHeight: 3000,
    formats: {
      png: { quality: 1.0, type: "image/png" },
      jpeg: { quality: 0.95, type: "image/jpeg" },
      svg: { enabled: true },
    },
  },
};
```

---

## How to Use These Templates

1. Copy the entire `BRAND_SETTINGS` object from any template
2. Paste it into your `brand-config.js` file (replacing the existing one)
3. Update the `name` field with your client's brand name
4. Fine-tune colors if needed
5. Replace `/public/logo.svg` with the client's logo
6. Test and deploy!

## Mixing & Matching

Feel free to mix elements from different templates:

- Use the frame from Template 1 with colors from Template 2
- Combine QR styling from Template 4 with the frame from Template 3
- Create your own unique combinations!

## Custom Frame Generator

Want to create custom frames? Use tools like:

- **Figma** → Export as SVG
- **Adobe Illustrator** → Save as SVG
- **Inkscape** (free) → Export as Plain SVG
- **Code** → Hand-write SVG directly

Tips:

- Keep the viewBox at `0 0 3000 3000`
- Make the "QR hole" white or transparent
- Use simple shapes for best compatibility
- Test before deploying!
