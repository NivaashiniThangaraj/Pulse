# Deployment Guide - MedCare Hospital

Ready to go live? Follow this guide to deploy your hospital application to the world.

## Pre-Deployment Checklist

- [ ] All content updated (hospital info, doctors, departments)
- [ ] Supabase database configured (optional but recommended)
- [ ] Environment variables set in `.env`
- [ ] All features tested locally
- [ ] Build completes without errors: `npm run build`
- [ ] No console errors in browser
- [ ] Responsive design tested on mobile/tablet
- [ ] Dark mode working correctly
- [ ] Forms tested and working

## Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized files ready for deployment.

## Deployment Options

### Option 1: Netlify (Recommended)

**Easiest deployment method**

1. **Connect Repository**
   ```
   Go to https://app.netlify.com
   Click "New site from Git"
   Select your repository
   ```

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Environment Variables**
   - Add your `.env` variables in Netlify dashboard
   - Under "Site settings" → "Build & deploy" → "Environment"

4. **Deploy**
   - Netlify automatically deploys on every push
   - Your site is live at `your-site.netlify.app`

### Option 2: Vercel

**Great performance and easy integration**

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts**
   - Connect your Git repository
   - Select the project
   - Confirm build settings

4. **Set Environment Variables**
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   ```

### Option 3: GitHub Pages

**Free hosting with GitHub**

1. **Update `vite.config.js`**
   ```javascript
   export default defineConfig({
     base: '/medcare-hospital/'
   })
   ```

2. **Build**
   ```bash
   npm run build
   ```

3. **Push to GitHub**
   ```bash
   git add dist/
   git commit -m "Build for production"
   git push
   ```

4. **Enable GitHub Pages**
   - Go to repository settings
   - Select "Pages"
   - Choose "Deploy from a branch"
   - Select `main` and `dist/` folder

### Option 4: Traditional Hosting (cPanel, Shared Hosting)

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Upload `dist/` contents**
   - Use FTP or File Manager
   - Upload all files from `dist/` to `public_html/`

3. **Set up `.htaccess` (for Apache)**
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

4. **Your site is live!**
   - Visit your domain

## Domain Configuration

### Linking a Custom Domain

**Netlify:**
1. Site settings → Domain management
2. Add custom domain
3. Follow DNS instructions

**Vercel:**
1. Project settings → Domains
2. Add your domain
3. Update DNS records

**GitHub Pages:**
1. Repository settings → Pages
2. Add custom domain
3. Update DNS CNAME record

### DNS Records

For domain `hospital.com`:

```
Type:  CNAME
Name:  www
Value: your-deployment.netlify.app
```

Or for apex domain:

```
Type:  A
Value: 75.2.60.5  (Netlify)

Type:  AAAA
Value: 2606:4700:3033::6815:3c05  (Netlify)
```

## Post-Deployment

### 1. Verify Everything Works
- [ ] Landing page loads
- [ ] Door animation plays
- [ ] All links work
- [ ] Dashboard accessible
- [ ] Forms submit
- [ ] Dark mode works
- [ ] Mobile responsive

### 2. Set Up SSL/HTTPS
- Netlify: Automatic (included)
- Vercel: Automatic (included)
- Traditional hosting: Use Let's Encrypt

### 3. Configure Supabase (if used)

1. **Add domain to CORS**
   ```
   Supabase Dashboard → Settings → API
   Add your domain to allowed origins
   ```

2. **Update redirect URLs**
   ```
   Authentication → URL Configuration
   Add your domain
   ```

### 4. Monitor Performance

Use tools to track performance:
- Google PageSpeed Insights
- Lighthouse
- WebPageTest

### 5. Set Up Analytics

Optional: Add Google Analytics
```html
<!-- Add to landing.html <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## Database Deployment (Supabase)

### Set Up Supabase Database

1. **Create Supabase Project**
   - Visit https://supabase.com
   - Create new project
   - Wait for database to be ready

2. **Run Migrations**
   - Open SQL Editor
   - Paste `db-setup.sql` contents
   - Execute

3. **Get API Keys**
   - Settings → API
   - Copy Project URL
   - Copy Anon Key
   - Copy Service Role Key

4. **Update Environment Variables**
   - In deployment platform add:
     ```
     VITE_SUPABASE_URL=your-url
     VITE_SUPABASE_ANON_KEY=your-key
     ```

5. **Test Connection**
   - Open deployment
   - Try to book appointment
   - Check if data appears in Supabase

## SSL/HTTPS Setup

Most modern platforms include SSL automatically. To verify:
1. Visit your domain
2. Check browser address bar
3. Should show 🔒 lock icon
4. URL should start with `https://`

## Email Configuration (Optional)

To enable appointment confirmations:

1. **Using a service like SendGrid**
   ```bash
   npm install @sendgrid/mail
   ```

2. **Add environment variable**
   ```
   VITE_SENDGRID_API_KEY=your-key
   ```

3. **Update appointment handler** in `landing-script.js`

## Performance Optimization

### Image Optimization
- Current: Using SVGs (optimized)
- Future: Use WebP for photos
- Use image CDN for faster delivery

### Caching Strategy
- Static assets cached for 1 year
- HTML cached for 1 day
- API responses cached as needed

### Code Splitting
- Current: Already done by Vite
- Landing page: Separate bundle
- Dashboard: Separate bundle

## Security Checklist

- [ ] HTTPS enabled
- [ ] No sensitive keys in source code
- [ ] Environment variables not committed
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] Input validation active
- [ ] Security headers set
- [ ] Regular backups enabled

### Add Security Headers

If using traditional hosting, add to `.htaccess`:
```apache
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

## Scaling & Growth

As your platform grows:

1. **Database Optimization**
   - Add indexes
   - Archive old data
   - Use partitioning

2. **Content Delivery**
   - Use CDN
   - Compress assets
   - Optimize images

3. **Monitoring**
   - Set up alerts
   - Track metrics
   - Monitor errors

4. **Backup Strategy**
   - Regular backups
   - Test restore process
   - Keep backups off-site

## Troubleshooting

### Site Shows Blank Page
- Check browser console for errors
- Verify build completed: `npm run build`
- Check deployment logs
- Verify environment variables

### Database Not Connecting
- Check Supabase is running
- Verify API keys correct
- Check CORS settings
- Test connection from browser console

### Slow Performance
- Check network tab for large files
- Use Chrome DevTools Performance
- Check if CDN is enabled
- Verify database queries are optimized

### Mobile Issues
- Test on actual mobile device
- Check viewport meta tag
- Verify touch events work
- Test slow 3G network

## Rollback Procedure

If something goes wrong:

**Netlify:**
1. Deployments tab
2. Click previous deployment
3. Click "Restore"

**Vercel:**
1. Deployments tab
2. Select previous deployment
3. Click "Promote to Production"

**GitHub Pages:**
1. Revert commit: `git revert <commit-hash>`
2. Push to main

## Support & Resources

- Netlify Docs: https://docs.netlify.com
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Vite Docs: https://vitejs.dev/guide/

---

**Congratulations! Your hospital platform is live! 🎉**

**Keep it updated and maintained for the best user experience.**
