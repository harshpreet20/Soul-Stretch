# Soul Stretch - Deployment Guide

Complete guide for deploying Soul Stretch to production.

## Pre-Deployment Checklist

- [ ] Update WhatsApp number in environment variables
- [ ] Set production site URL
- [ ] Test all forms locally
- [ ] Verify product images load correctly
- [ ] Test on mobile devices
- [ ] Build production bundle successfully

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the official Next.js deployment platform with zero-config deployment.

#### Setup

1. **Sign up for Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Soul Stretch website"
   git branch -M main
   git remote add origin <github-url>
   git push -u origin main
   ```

3. **Import project to Vercel**
   - Go to Vercel dashboard
   - Click "New Project"
   - Select your GitHub repository
   - Framework Preset: Next.js (auto-detected)
   - Click "Deploy"

#### Environment Variables

In Vercel Dashboard > Settings > Environment Variables, add:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
NEXT_PUBLIC_SITE_URL=https://soulstretch.in
```

#### Custom Domain

1. In Vercel > Project Settings > Domains
2. Add your custom domain (soulstretch.in)
3. Update your domain registrar DNS settings to point to Vercel
4. DNS Records (usually):
   - A: 76.76.19.161
   - CNAME: cname.vercel-dns.com (for subdomain)

#### Automatic Deployments

Every push to `main` branch automatically deploys to production.

### Option 2: Self-Hosted (Node.js)

For hosting on your own server or cloud platform.

#### Prerequisites
- Node.js 18+
- npm or yarn
- Reverse proxy (Nginx/Apache)

#### Build

```bash
npm install
npm run build
```

#### Environment

Create `.env.production.local`:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
NEXT_PUBLIC_SITE_URL=https://soulstretch.in
```

#### Start Server

```bash
npm start
```

Server runs on `http://localhost:3000`

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name soulstretch.in www.soulstretch.in;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### SSL/HTTPS

Use Let's Encrypt:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d soulstretch.in -d www.soulstretch.in
```

### Option 3: Docker Deployment

Containerize the application.

#### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### Build & Run

```bash
docker build -t soul-stretch:latest .
docker run -p 3000:3000 -e NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210 soul-stretch:latest
```

### Option 4: AWS Deployment

Using AWS Amplify or EC2.

#### AWS Amplify

1. Connect GitHub repository to AWS Amplify
2. Configure build settings:
   ```
   Build command: npm run build
   Start command: npm start
   ```
3. Set environment variables
4. Deploy

#### AWS EC2

1. Launch EC2 instance (Ubuntu)
2. SSH into instance
3. Install Node.js and nginx
4. Clone repository and follow self-hosted setup above

## Post-Deployment

### Verification

1. **Homepage**: Visit soulstretch.in - should load hero section
2. **Products**: Browse /products - grid should display all 11 products
3. **Product Detail**: Click product - should show full details
4. **Guides**: View /guides - should show 3 guides with full content
5. **Contact Form**: Test /contact form - should open WhatsApp
6. **Mobile**: Test on mobile - responsive layout should work

### Analytics

Add Google Analytics to track user behavior:

1. Create Google Analytics property
2. Add measurement ID to `app/layout.tsx`:

```typescript
<script async src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`} />
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Monitoring

Set up monitoring and error tracking:

- **Sentry** (error tracking)
- **Vercel Analytics** (performance monitoring)
- **Google Search Console** (SEO monitoring)

### Backup Strategy

- Version control all code in Git
- Regular database backups if using external services
- Store environment variables securely

## Maintenance

### Regular Updates

```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

### Content Updates

1. **Products**: Update in `/lib/products.ts` or Google Sheets
2. **Copy**: Update page content directly in `.tsx` files
3. **Images**: Update image URLs in product data

### Performance Optimization

- Monitor Core Web Vitals via Vercel Analytics
- Optimize images (use next/image)
- Enable caching headers
- Minify and compress assets (automatic with Next.js)

## Troubleshooting

### Build Fails

1. Check error message in build logs
2. Verify all dependencies are installed: `npm install`
3. Clear cache: `rm -rf .next node_modules && npm install`
4. Check TypeScript errors: `npx tsc --noEmit`

### Slow Performance

1. Check Vercel Analytics dashboard
2. Identify slow pages/components
3. Use Next.js Image Optimization
4. Enable caching
5. Review database queries (if applicable)

### WhatsApp Links Not Working

1. Verify phone number in environment variable
2. Check encoding of WhatsApp message URLs
3. Test on mobile device (WhatsApp web vs mobile app)

## Rollback Procedure

If deployment breaks production:

### Vercel

1. Go to Vercel Dashboard > Deployments
2. Find previous stable deployment
3. Click "Promote to Production"

### Git

```bash
# Revert to previous commit
git revert <commit-hash>
git push origin main
```

## DNS Configuration

Point your domain to Vercel:

### For Vercel

1. Add domain in Vercel project settings
2. Update registrar DNS:
   - Nameservers: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`, etc.
   - OR use A/CNAME records if registrar doesn't support nameserver changes

### For Custom Server

Update A record to server IP:
```
soulstretch.in  A  your.server.ip
```

## Support & Monitoring

### Uptime Monitoring

- Use UptimeRobot to monitor soulstretch.in
- Receive alerts if site goes down
- 5-minute check intervals

### Log Monitoring

View Vercel logs:
```
vercel logs <project-name>
```

### Performance Monitoring

- Use Lighthouse for Core Web Vitals
- Check PageSpeed Insights
- Monitor user experience metrics

## Success!

Once deployed and verified:

1. Share the live link with team
2. Update social media links
3. Submit sitemap to Google Search Console
4. Monitor analytics and user feedback
5. Iterate on design/content based on user behavior

## Questions?

For deployment help:
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Contact: support@soulstretch.in
