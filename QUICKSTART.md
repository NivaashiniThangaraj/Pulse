# Quick Start Guide - MedCare Hospital

Get up and running with the MedCare Hospital system in 5 minutes!

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Modern web browser
- (Optional) Supabase account for database features

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd medcare-hospital
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
cp .env.example .env.local
```

Then edit `.env.local` with your configuration if needed.

## Running the Project

### Development Mode
```bash
npm run dev
```
This starts a development server at `http://localhost:3000`

The app will automatically open and show the landing page with the door animation.

### Production Build
```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

## First Time Experience

1. **Open the app** - You'll see the stunning door opening animation
2. **Wait for the doors to open** (3.5 seconds)
3. **Explore the landing page**:
   - Scroll through departments
   - View the expert team
   - Check out features and statistics
4. **Book an Appointment**:
   - Click "Book Appointment" button
   - Fill in your details
   - Select a department
   - Choose a date
   - Submit!
5. **Access the Dashboard**:
   - Click "Access Dashboard" button
   - View real-time bed status
   - Check activity logs
   - Toggle dark mode

## Key Features at a Glance

### Landing Page
- ✨ Animated door opening with stethoscope
- 🏥 Hospital overview and services
- 👨‍⚕️ Meet the expert medical team
- 📋 Book appointments easily
- 🎨 Beautiful responsive design
- 🌙 Dark mode support

### ICU Dashboard
- 📊 Real-time bed monitoring
- 📋 Activity logs and events
- 👥 Staff assignment tracking
- 🔍 Search and filter capabilities
- 📱 Fully responsive interface
- 🌗 Dark/light mode toggle

## Project Structure

```
medcare-hospital/
├── landing.html           # Landing page
├── landing-style.css      # Landing page styles
├── landing-script.js      # Landing page interactivity
├── index.html             # Dashboard page
├── style.css              # Dashboard styles
├── script.js              # Dashboard interactivity
├── supabase-client.js     # Database client
├── db-setup.sql           # Database schema
├── package.json           # Dependencies
├── vite.config.js         # Build configuration
└── README.md              # Full documentation
```

## Customization

### Change Hospital Information

Edit `landing.html`:
```html
<!-- Update hospital name, address, phone, email in contact section -->
<h4>Location</h4>
<p>Your Hospital Address<br>City, State ZIP</p>
```

### Change Colors

Edit `style.css` and `landing-style.css`:
```css
:root {
  --primary: #10b981;        /* Green */
  --secondary: #0ea5e9;      /* Blue */
  --accent: #f59e0b;         /* Amber */
}
```

### Update Doctor Information

Edit `landing.html` in the doctors section:
```html
<div class="doctor-card">
  <div class="doctor-image">DR</div>
  <h3>Dr. Name</h3>
  <p class="specialty">Specialty</p>
  <p class="bio">Bio</p>
</div>
```

## Database Setup (Optional)

To enable full Supabase integration:

1. Create a Supabase account: https://supabase.com
2. Create a new project
3. In Supabase SQL Editor, paste the contents of `db-setup.sql`
4. Copy your project URL and Anon Key
5. Update `.env.local`:
```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Troubleshooting

### Port Already in Use
```bash
# Use a different port
npm run dev -- --port 3001
```

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run build
```

### Dependencies Issues
```bash
# Update npm and packages
npm update
npm audit fix
```

### Dark Mode Not Persisting
- Check that localStorage is enabled in your browser
- Clear browser cache and try again

## Performance Tips

1. **Development**: Use `npm run dev` for hot module reloading
2. **Production**: Always use `npm run build` for optimized assets
3. **Caching**: The build automatically handles cache busting
4. **Images**: SVGs are embedded for better performance

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Latest |
| Firefox | ✅ Latest |
| Safari  | ✅ Latest |
| Edge    | ✅ Latest |
| Mobile  | ✅ All modern |

## Security Notes

- Never commit `.env` files to version control
- Keep Supabase keys secure
- Use environment variables for sensitive data
- Regularly update dependencies: `npm update`

## Getting Help

### Documentation
- Full docs: See `README.md`
- Features list: See `FEATURES.md`
- Database schema: See `db-setup.sql`

### Common Questions

**Q: Can I use this without Supabase?**
A: Yes! The app works with mock data. Firebase integration is also available.

**Q: How do I deploy this?**
A: Use the `dist/` folder generated by `npm run build`. Deploy to Netlify, Vercel, or any static host.

**Q: Can I customize the design?**
A: Absolutely! Edit `style.css` and `landing-style.css` to match your brand.

**Q: Is this HIPAA compliant?**
A: The design is HIPAA-ready, but requires proper backend implementation.

## Next Steps

1. ✅ Explore the current features
2. 📝 Customize with your hospital info
3. 🎨 Update colors and branding
4. 🗄️ Set up Supabase database
5. 📤 Deploy to production

## Support

- Email: support@medcarehospital.com
- Documentation: See README.md
- Issues: Check GitHub issues

---

**Happy coding! 🚀**
