# 🚀 Quick Deployment Guide

## For New Clients - 5-Minute Setup

### Step 1: Clone the Repository
```bash
git clone <this-repo-url> client-name-qr
cd client-name-qr
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Customize Brand Settings
Edit `brand-config.js`:

1. **Update client name and colors**
   ```javascript
   clientBranding: {
     name: "Client Name",
     colors: {
       primary: "#CLIENT_PRIMARY",
       // ... update all colors
     }
   }
   ```

2. **Replace logo** (optional)
   - Add client logo to `/public/logo.svg`
   - Update logo path in config

3. **Customize frame** (optional)
   - Modify `frameSVG` with custom design
   - Adjust `framePosition` to align QR code

4. **Adjust QR styling** (optional)
   - Change dot types, colors, corner styles

### Step 4: Test Locally
```bash
npm run dev
# Visit http://localhost:3000
```

Test the QR generator:
- Enter a test URL
- Toggle logo on/off
- Download PNG/JPEG/SVG
- Verify the branded output

### Step 5: Deploy to GitHub

#### Initial Setup
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Client Name QR Generator"

# Create GitHub repo (via GitHub.com or CLI)
# Then push:
git remote add origin https://github.com/username/client-name-qr.git
git branch -M main
git push -u origin main
```

#### Enable GitHub Pages
1. Go to your repo on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment"
   - Source: **GitHub Actions**
4. Click **Save**

The site will automatically deploy! Check the **Actions** tab to monitor progress.

### Step 6: Share with Client
Your QR generator will be live at:
```
https://username.github.io/client-name-qr
```

## For Updates

When you need to update the branding or features:

```bash
# 1. Make changes to brand-config.js or other files
# 2. Test locally
npm run dev

# 3. Commit and push
git add .
git commit -m "Update: Description of changes"
git push

# GitHub Actions will automatically redeploy
```

## Advanced: Custom Domain

To use a custom domain (e.g., qr.clientdomain.com):

1. Add a `CNAME` file to `/public/`:
   ```
   qr.clientdomain.com
   ```

2. In your domain's DNS settings, add a CNAME record:
   ```
   Type: CNAME
   Name: qr
   Value: username.github.io
   ```

3. In GitHub repo Settings → Pages:
   - Set custom domain: `qr.clientdomain.com`
   - Enable "Enforce HTTPS"

## Troubleshooting

**Build fails on GitHub Actions:**
- Check the Actions tab for specific errors
- Ensure all dependencies are in `package.json`
- Verify `next.config.js` has `output: 'export'`

**QR code doesn't show:**
- Clear browser cache
- Check browser console for errors
- Verify the URL input is not empty

**Wrong colors/branding:**
- Double-check `brand-config.js` was saved
- Rebuild: `npm run build`
- Hard refresh browser (Cmd/Ctrl + Shift + R)

## Multi-Client Workflow

For agencies managing multiple clients:

```bash
# Client 1
git clone <repo> luxe-qr && cd luxe-qr
# Customize brand-config.js
git commit -am "Luxe branding"
git push

# Client 2
git clone <repo> tech-qr && cd tech-qr
# Customize brand-config.js
git commit -am "Tech branding"
git push

# Repeat for each client
```

Each gets its own repository and deployment pipeline!

---

**Time per client:** ~5 minutes
**Cost:** $0 (GitHub Pages is free for public repos)
**Maintenance:** Automatic deployments on every push
