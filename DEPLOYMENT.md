# 🚀 Deployment Guide - GitHub Pages

This guide will walk you through deploying your portfolio site to GitHub Pages at `fardeenul.github.io`.

## 📋 Prerequisites

Before deploying, ensure you have:
- [ ] Git installed on your computer
- [ ] GitHub account created
- [ ] Profile photo added to `assets/images/profile.jpg` (optional but recommended)
- [ ] Resume PDF added to `assets/resume.pdf` (optional but recommended)

## 🎯 Step-by-Step Deployment

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and log in
2. Click the "+" icon in the top right → "New repository"
3. **Important**: Name it exactly `fardeenul.github.io` (replace `fardeenul` with your GitHub username)
4. Make it **Public**
5. Do NOT initialize with README (we already have one)
6. Click "Create repository"

### Step 2: Initialize Git Locally

Open Terminal/Command Prompt and navigate to your project folder:

```bash
cd "/Users/mohammedfardeenulislam/Library/CloudStorage/OneDrive-GeorgiaInstituteofTechnology/PROJECTS/Personal Portfolio"
```

Initialize Git repository:

```bash
git init
```

### Step 3: Configure Git (First Time Only)

If you haven't set up Git before:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 4: Add and Commit Files

Add all files to Git:

```bash
git add .
```

Create your first commit:

```bash
git commit -m "Initial commit: Professional portfolio site"
```

### Step 5: Connect to GitHub

Set the main branch:

```bash
git branch -M main
```

Connect to your GitHub repository (replace `fardeenul` with your username):

```bash
git remote add origin https://github.com/fardeenul/fardeenul.github.io.git
```

### Step 6: Push to GitHub

Push your code to GitHub:

```bash
git push -u origin main
```

You may be prompted to log in to GitHub. Use your credentials or GitHub CLI.

### Step 7: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/fardeenul/fardeenul.github.io`
2. Click "Settings" (gear icon)
3. Scroll down and click "Pages" in the left sidebar
4. Under "Source", select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click "Save"

### Step 8: Wait for Deployment

- GitHub will build and deploy your site (takes 1-5 minutes)
- You'll see a green checkmark and message: "Your site is published at `https://fardeenul.github.io`"
- Click the link to view your live site!

## 🔄 Making Updates

After the initial deployment, to update your site:

1. Make changes to your files locally
2. Save changes
3. Add and commit:
```bash
git add .
git commit -m "Update: description of changes"
```
4. Push to GitHub:
```bash
git push
```
5. Changes will automatically deploy in 1-2 minutes

## ✅ Post-Deployment Checklist

After deployment, verify:
- [ ] Site loads at `https://fardeenul.github.io`
- [ ] All sections display correctly
- [ ] Navigation works smoothly
- [ ] Social links open correctly
- [ ] Projects links work
- [ ] Mobile responsive design works
- [ ] Profile image displays (if added)
- [ ] Resume downloads (if added)

## 🐛 Troubleshooting

### Site Not Loading?
- Wait 5-10 minutes (first deployment takes longer)
- Check GitHub Pages settings are correct
- Verify repository name is exactly `fardeenul.github.io`
- Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### Images Not Displaying?
- Verify file paths are correct and relative (no leading `/`)
- Check file names match exactly (case-sensitive)
- Ensure images are in `assets/images/` folder
- Commit and push the image files

### 404 Errors?
- All file paths should be relative
- Links should start without leading slash: `assets/...` not `/assets/...`
- Check `index.html` is in the root directory

### Resume Not Downloading?
- Verify `resume.pdf` is in `assets/` folder
- Check the file is committed: `git add assets/resume.pdf`
- Push to GitHub: `git push`

## 🎨 Optional: Custom Domain

To use a custom domain (e.g., `fardeenulislam.com`):

1. Purchase domain from registrar (Namecheap, GoDaddy, etc.)
2. In GitHub Pages settings, add custom domain
3. In domain registrar, add DNS records:
   - Type: `A`, Host: `@`, Value: GitHub IPs
   - Type: `CNAME`, Host: `www`, Value: `fardeenul.github.io`
4. Wait for DNS propagation (24-48 hours)

## 📧 Need Help?

If you encounter issues:
1. Check [GitHub Pages Documentation](https://docs.github.com/en/pages)
2. Search [GitHub Community](https://github.community)
3. Contact: mislam319@gatech.edu

## 🎉 Success!

Congratulations! Your professional portfolio is now live and accessible to recruiters worldwide.

**Share your portfolio:**
- Add to LinkedIn profile
- Include in resume
- Share on Twitter/social media
- Add to email signature

---

**Pro Tips:**
- Update regularly with new projects
- Monitor site traffic with Google Analytics (optional)
- Test on multiple devices and browsers
- Share with peers for feedback
- Add new projects as you complete them


