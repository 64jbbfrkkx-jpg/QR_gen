# ⚡ Quick Start - White-Label QR Generator

## Get Running in 3 Minutes

### Step 1: Install
```bash
cd qr-generator
npm install
```

### Step 2: Run
```bash
npm run dev
```

Open http://localhost:3000 - You'll see the **Luxe QR** demo!

### Step 3: Customize for Your First Client

Open `brand-config.js` and change:

```javascript
clientBranding: {
  name: "YOUR CLIENT NAME HERE",  // ← Change this
  colors: {
    primary: "#YOUR_COLOR",        // ← And these
    // ... update the rest
  }
}
```

Refresh the page - instant rebrand! ✨

---

## Deploy to GitHub Pages (5 minutes)

```bash
# 1. Create GitHub repo (do this on GitHub.com)
# 2. Push your code
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main

# 3. Enable GitHub Pages
# Go to: Settings → Pages → Source: "GitHub Actions" → Save
```

Your site will be live at:
```
https://USERNAME.github.io/REPO
```

---

## File Guide

**Must Edit:**
- `brand-config.js` - All branding (colors, QR style, frame)
- `public/logo.svg` - Replace with client logo

**Documentation:**
- `README.md` - Full documentation
- `DEPLOYMENT.md` - Deployment guide
- `BRAND_TEMPLATES.md` - 6 ready-to-use templates
- `CUSTOMIZATION_GUIDE.md` - Every option explained

**Don't Touch:**
- `app/` folder - The engine (works as-is)
- `components/` - UI components
- `.github/` - Auto-deployment
- Other config files

---

## Ready-to-Use Templates

Check `BRAND_TEMPLATES.md` for 6 complete brand configs:
1. **Luxury** (Gold & Black)
2. **Tech** (Neon Blue)
3. **Minimalist** (White & Gray)
4. **Nature** (Green & Earth)
5. **Corporate** (Navy & Silver)
6. **Sunset** (Orange & Pink)

Copy-paste any template into `brand-config.js` and you're done!

---

## Common Tasks

**Change QR dot style:**
```javascript
dotsOptions: {
  type: "rounded" // Try: dots, square, classy, extra-rounded
}
```

**Change frame:**
```javascript
frameSVG: `
  <svg viewBox="0 0 3000 3000">
    <!-- Your custom SVG here -->
  </svg>
`
```

**Change colors:**
Update the `colors` object in `clientBranding`

---

## Testing

1. Enter a URL
2. Click Download → PNG
3. Scan with your phone
4. ✅ Works? You're ready to deploy!

---

## Multiple Clients?

For each new client:

1. Clone this folder with a new name
2. Edit `brand-config.js` only
3. Push to a new GitHub repo
4. Enable Pages

**Result:** Each client gets their own branded QR generator at their own URL!

---

## Need Help?

- **Customization:** See `CUSTOMIZATION_GUIDE.md`
- **Templates:** See `BRAND_TEMPLATES.md`
- **Deployment:** See `DEPLOYMENT.md`
- **Everything:** See `README.md`

---

**That's it!** You now have a production-ready, white-label QR generator. 🎉

Typical setup time per client: **5 minutes**
Monthly cost: **$0** (GitHub Pages is free)
