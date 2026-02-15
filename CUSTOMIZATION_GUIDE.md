# Complete Customization Guide

This guide explains every customization option in `brand-config.js` in detail.

## Table of Contents
- [Client Branding](#client-branding)
- [QR Code Styling](#qr-code-styling)
- [Frame SVG Design](#frame-svg-design)
- [Frame Positioning](#frame-positioning)
- [Export Settings](#export-settings)
- [Logo Configuration](#logo-configuration)

---

## Client Branding

Controls the appearance of the web app itself (not the QR code output).

```javascript
clientBranding: {
  name: "Your Brand Name",  // Appears in the UI header and page title
  logo: "/logo.svg",        // Path to logo in /public folder (or null)
  colors: {
    primary: "#D4AF37",     // Main accent color (buttons, highlights)
    secondary: "#1a1a1a",   // Secondary color (typically dark)
    accent: "#F5F5DC",      // Text accents and highlights
    background: "#0a0a0a",  // Page background
    surface: "#1a1a1a",     // Card/panel backgrounds
    text: "#F5F5DC",        // Primary text color
  },
}
```

### Color Format
Use hex codes (#RRGGBB) for all colors. Tools for choosing colors:
- [Coolors.co](https://coolors.co) - Generate palettes
- [Adobe Color](https://color.adobe.com) - Color wheel
- [Paletton](https://paletton.com) - Advanced palette generator

### Design Tips
- **High contrast**: Ensure `text` and `background` have sufficient contrast
- **Consistency**: Use variations of 2-3 base colors
- **Brand alignment**: Match your client's existing brand colors

---

## QR Code Styling

Controls how the QR code itself looks. Based on the `qr-code-styling` library.

### Basic Structure

```javascript
qrOptions: {
  width: 2400,              // QR code resolution (don't change)
  height: 2400,             // QR code resolution (don't change)
  type: "svg",              // Output type (keep as "svg")
  margin: 10,               // White space around QR (pixels)
  
  dotsOptions: { ... },           // Main QR pattern dots
  cornersSquareOptions: { ... },  // Position detection corners (outer)
  cornersDotOptions: { ... },     // Position detection corners (inner)
  backgroundOptions: { ... },     // QR background color
  imageOptions: { ... },          // Logo in center settings
}
```

### Dots Options (Main Pattern)

The small squares that make up most of the QR code.

```javascript
dotsOptions: {
  color: "#1a1a1a",  // Solid color
  type: "rounded",   // Shape of dots
}
```

**Available Types:**
- `"rounded"` - Rounded squares (friendly, modern)
- `"dots"` - Perfect circles (playful, organic)
- `"classy"` - Diagonal cuts (sophisticated)
- `"classy-rounded"` - Rounded diagonal cuts
- `"square"` - Perfect squares (technical, precise)
- `"extra-rounded"` - Very rounded (soft, approachable)

**Gradient Option:**
```javascript
dotsOptions: {
  gradient: {
    type: "linear",      // or "radial"
    rotation: 0,         // 0-360 degrees (linear only)
    colorStops: [
      { offset: 0, color: "#FF0000" },
      { offset: 1, color: "#0000FF" }
    ]
  },
  type: "rounded"
}
```

### Corner Squares (Outer Position Markers)

The three large squares in the corners.

```javascript
cornersSquareOptions: {
  color: "#1a1a1a",
  type: "extra-rounded",  // Shape of outer corners
}
```

**Available Types:**
- `"dot"` - Circular
- `"square"` - Perfect square
- `"extra-rounded"` - Very rounded square

**Gradient Option:** Same as dots (see above)

### Corner Dots (Inner Position Markers)

The small dot inside each corner square.

```javascript
cornersDotOptions: {
  color: "#1a1a1a",
  type: "dot",  // "dot" or "square"
}
```

**Available Types:**
- `"dot"` - Circle (most common)
- `"square"` - Small square

**Gradient Option:** Same as dots (see above)

### Background Options

```javascript
backgroundOptions: {
  color: "#ffffff",  // Usually white for scannability
}
```

**Note:** Keep this white or very light for best QR code scanning.

### Image Options (Logo in Center)

```javascript
imageOptions: {
  hideBackgroundDots: true,  // Hide QR dots under logo
  imageSize: 0.3,            // Logo size (0.0-1.0, recommended: 0.2-0.4)
  margin: 8,                 // Padding around logo (pixels)
  crossOrigin: "anonymous",  // CORS setting (don't change)
}
```

**Best Practices:**
- Keep `imageSize` between 0.2-0.4 for reliable scanning
- Use `hideBackgroundDots: true` for cleaner look
- Higher error correction allows larger logos (see Advanced)

---

## Frame SVG Design

The decorative border/frame that wraps around the QR code.

### Basic Structure

```javascript
frameSVG: `
  <svg viewBox="0 0 3000 3000" xmlns="http://www.w3.org/2000/svg">
    <!-- Your frame design here -->
  </svg>
`
```

**Important:**
- Always use `viewBox="0 0 3000 3000"`
- The "hole" for the QR code should be white or transparent
- Use simple SVG shapes for best compatibility

### Common SVG Elements

**Rectangle (Border/Frame):**
```xml
<rect 
  x="50" y="50"           <!-- Position (top-left corner) -->
  width="2900" height="2900"  <!-- Size -->
  fill="#FAFAFA"          <!-- Fill color -->
  stroke="#D4AF37"        <!-- Border color -->
  stroke-width="20"       <!-- Border thickness -->
  rx="40"                 <!-- Corner rounding (0 = sharp) -->
/>
```

**Circle:**
```xml
<circle 
  cx="1500" cy="1500"     <!-- Center point -->
  r="1400"                <!-- Radius -->
  fill="none"             <!-- No fill (transparent) -->
  stroke="#D4AF37"        <!-- Border color -->
  stroke-width="10"       <!-- Border thickness -->
/>
```

**Line:**
```xml
<line 
  x1="100" y1="100"       <!-- Start point -->
  x2="200" y2="100"       <!-- End point -->
  stroke="#D4AF37"        <!-- Line color -->
  stroke-width="3"        <!-- Line thickness -->
/>
```

**Text:**
```xml
<text 
  x="1500" y="200"        <!-- Position -->
  font-family="serif"     <!-- Font -->
  font-size="60"          <!-- Size -->
  text-anchor="middle"    <!-- Alignment -->
  fill="#1a1a1a"          <!-- Text color -->
>
  Your Brand Name
</text>
```

**Gradient Fill:**
```xml
<defs>
  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" style="stop-color:#FF0000;stop-opacity:1" />
    <stop offset="100%" style="stop-color:#0000FF;stop-opacity:1" />
  </linearGradient>
</defs>
<rect x="0" y="0" width="3000" height="3000" fill="url(#grad1)" />
```

### Frame Design Workflow

1. **Design in a tool** (Figma, Illustrator, Inkscape)
   - Set canvas to 3000×3000px
   - Create your frame design
   - Leave a clear space for QR code (typically 1800×1800px centered)

2. **Export as SVG**
   - File → Export → SVG
   - Settings: "Inline styles" or "Presentation attributes"
   - No responsive settings needed

3. **Clean up the code**
   - Open SVG in text editor
   - Copy everything INSIDE the `<svg>` tags (not including the `<svg>` tag itself)
   - Paste into `frameSVG` in `brand-config.js`

4. **Test**
   - Run `npm run dev`
   - Check if QR code aligns correctly
   - Adjust `framePosition` if needed

---

## Frame Positioning

Controls where the QR code appears within your frame.

```javascript
framePosition: {
  x: 600,        // X position (pixels from left)
  y: 600,        // Y position (pixels from top)
  scale: 1.0,    // Scale factor (usually 1.0)
  qrSize: 1800,  // Size of QR code (pixels)
}
```

### Calculating Position

For a **centered QR code**:
```javascript
// If your frame canvas is 3000×3000
// And QR should be 1800×1800
x = (3000 - 1800) / 2 = 600
y = (3000 - 1800) / 2 = 600
qrSize = 1800
```

For an **off-center QR code**:
```javascript
// Top-left corner at 500px from left, 400px from top
x = 500
y = 400
qrSize = 1800
```

### Visual Guide

```
+----------------------------------+ (3000×3000 canvas)
|                                  |
|     +-----------------+          |
|     |                 |          | <- y position (600px)
|     |   QR CODE       |          |
|     |   1800×1800     |          |
|     |                 |          |
|     +-----------------+          |
|     ^                            |
|     x position (600px)           |
+----------------------------------+
```

### Tips
- Start with centered (600, 600) and adjust from there
- Keep QR code away from frame edges (at least 100px margin)
- Test scanning after any position changes

---

## Export Settings

Controls the final output files.

```javascript
exportSettings: {
  finalWidth: 3000,   // Output width (pixels)
  finalHeight: 3000,  // Output height (pixels)
  formats: {
    png: { 
      quality: 1.0,              // 0.0-1.0 (1.0 = best)
      type: "image/png" 
    },
    jpeg: { 
      quality: 0.95,             // 0.0-1.0 (0.95 = very high)
      type: "image/jpeg" 
    },
    svg: { 
      enabled: true              // true/false
    },
  },
}
```

### Resolution Guide
- **3000×3000px** - High-quality print (recommended)
- **2000×2000px** - Standard print
- **1000×1000px** - Web only (not recommended for this tool)

### Quality Settings
- **PNG**: Always use 1.0 (lossless)
- **JPEG**: 0.9-0.95 for high quality, 0.8-0.85 for smaller files

---

## Logo Configuration

Controls the logo that appears in the center of the QR code.

```javascript
export const BRAND_LOGO = {
  enabled: true,
  url: "/logo.svg",  // Path to logo in /public folder
};
```

### Logo Requirements
- **Format**: SVG (preferred) or PNG
- **Size**: Any (will be scaled automatically)
- **Color**: Contrasting with QR code
- **Complexity**: Simple shapes work best

### Using Base64 (for portability)
```javascript
export const BRAND_LOGO = {
  enabled: true,
  url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0i...",
};
```

### Creating a Logo
1. Design in vector editor (Figma, Illustrator, Inkscape)
2. Export as SVG
3. Place in `/public/logo.svg`
4. Or convert to base64: [Base64 Encoder](https://base64.guru/converter/encode/image)

---

## Advanced Customization

### Error Correction Levels

Higher levels allow more damage/coverage but make denser QR codes.

```javascript
qrOptions: {
  // Add this line:
  errorCorrectionLevel: "M",  // "L", "M", "Q", or "H"
  // ...rest of options
}
```

**Levels:**
- **L** - 7% correction (smallest QR, logo ~15% of area)
- **M** - 15% correction (default, logo ~25% of area)
- **Q** - 25% correction (logo ~30% of area)
- **H** - 30% correction (densest QR, logo ~35% of area)

### Data Types

QR codes can encode different data types:

**URL:**
```
https://example.com
```

**Phone Number:**
```
tel:+1234567890
```

**Email:**
```
mailto:info@example.com
```

**WiFi:**
```
WIFI:T:WPA;S:NetworkName;P:Password;;
```

**SMS:**
```
sms:+1234567890?body=Hello
```

**vCard (Contact):**
```
BEGIN:VCARD;
VERSION:3.0;
FN:John Doe;
TEL:+1234567890;
EMAIL:john@example.com;
END:VCARD
```

---

## Testing Checklist

Before deploying for a client:

- [ ] QR code scans correctly on multiple devices
- [ ] Logo appears centered and clear
- [ ] Frame aligns perfectly with QR code
- [ ] Colors match client brand
- [ ] All three export formats work (PNG, JPEG, SVG)
- [ ] UI displays brand name correctly
- [ ] High-resolution exports are crisp (check at 100% zoom)
- [ ] Download files have reasonable sizes (<5MB)

---

## Common Issues & Solutions

**QR won't scan:**
- Reduce logo size (`imageSize: 0.2` instead of 0.4)
- Increase error correction (`errorCorrectionLevel: "H"`)
- Ensure background is white or very light
- Check contrast between dots and background

**Frame misaligned:**
- Adjust `framePosition` x/y values
- Ensure `qrSize` matches your frame's "hole"
- Check that frame SVG uses `viewBox="0 0 3000 3000"`

**Logo doesn't show:**
- Verify `/public/logo.svg` exists
- Check `BRAND_LOGO.enabled` is true
- Ensure logo file is valid SVG or PNG
- Check browser console for CORS errors

**Colors look wrong:**
- Use hex format: `#RRGGBB` (not `rgb()` or color names)
- Check for typos in hex codes
- Ensure sufficient contrast for readability

**Export is blurry:**
- Don't reduce `finalWidth`/`finalHeight` below 3000px
- Use PNG for highest quality
- Check quality settings (should be 1.0 for PNG)

---

## Resources

### Tools
- **Color Palettes**: [Coolors.co](https://coolors.co), [Adobe Color](https://color.adobe.com)
- **SVG Editors**: [Figma](https://figma.com), [Inkscape](https://inkscape.org) (free)
- **QR Testing**: [QR Code Generator](https://www.qr-code-generator.com/)
- **Base64 Encoder**: [Base64.guru](https://base64.guru/converter/encode/image)

### Documentation
- [qr-code-styling Library](https://github.com/kozakdenys/qr-code-styling)
- [SVG Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial)
- [Next.js Static Export](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)

---

**Questions?** Review the examples in `BRAND_TEMPLATES.md` for inspiration!
