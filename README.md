# PULSE: Patient Utilization and Logging System for Efficiency

A comprehensive healthcare management platform featuring real-time ICU monitoring, appointment booking, and integrated hospital services.

## Features

### Landing Page
- **Stunning Door Opening Animation**: Immersive entrance with stethoscope animation
- **Hero Section**: Modern presentation of services
- **Departments**: Browse hospital departments
- **Expert Team**: View medical specialists
- **Statistics**: Hospital metrics and achievements
- **Appointment Booking**: Easy-to-use appointment scheduling
- **Responsive Design**: Works seamlessly on all devices

### ICU Dashboard
- **Real-Time Monitoring**: Live bed status and patient vitals
- **Activity Log**: Comprehensive event tracking
- **Advanced Analytics**: Data visualization and insights
- **Dark Mode**: Eye-friendly interface option
- **Responsive Layout**: Optimized for all screen sizes

### Design Excellence
- Modern, professional color palette (Emerald Green & Sky Blue)
- Smooth animations and micro-interactions
- HIPAA-compliant security design
- Premium typography with Inter font
- Comprehensive shadow system for depth
- Mobile-first responsive design

## Getting Started

### Installation

1. **Clone or download the project**
```bash
git clone <repository-url>
cd medcare-hospital
```

2. **Install dependencies** (if using Node.js/Vite)
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

### File Structure

```
medcare-hospital/
├── landing.html              # Main landing page
├── landing-style.css         # Landing page styles
├── landing-script.js         # Landing page functionality
├── index.html                # ICU dashboard
├── style.css                 # Dashboard styles
├── script.js                 # Dashboard functionality
├── supabase-client.js        # Database integration
├── db-setup.sql              # Database schema
└── README.md                 # This file
```

## Features in Detail

### Landing Page Components

#### Door Animation
- CSS-based door opening effect
- Stethoscope icon with rotation animation
- Smooth fade transition

#### Sections
1. **Hero**: Main call-to-action with illustration
2. **Features**: 6 key system features with icons
3. **Departments**: Hospital departments with emojis
4. **Expert Team**: Doctor profiles with ratings
5. **Statistics**: Key hospital metrics
6. **Contact**: Location, phone, and email
7. **Appointment Modal**: Booking form with validation

### Dashboard Features

#### Real-Time Updates
- Bed status monitoring
- Patient vitals tracking
- Activity log with filtering
- Summary statistics

#### User Interactions
- Click beds for detailed information
- Search and filter events
- Dark mode toggle
- Responsive navigation

## Customization

### Colors
Edit the CSS variables in `:root` selector:
```css
:root {
  --primary: #10b981;
  --secondary: #0ea5e9;
  --accent: #f59e0b;
  --danger: #ef4444;
}
```

### Database Setup

To enable full Supabase integration:

1. Create a Supabase account at https://supabase.com
2. Run the SQL from `db-setup.sql` in your Supabase SQL editor
3. Update credentials in `supabase-client.js`:
```javascript
const SUPABASE_URL = 'your-project-url';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Fonts**: Google Fonts (Inter, Playfair Display)
- **Database**: Supabase (PostgreSQL)
- **Security**: HIPAA-compliant design
- **Responsive**: Mobile-first approach

## Browser Support

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers

## Performance

- Optimized animations with GPU acceleration
- Lazy loading for images
- Efficient CSS with CSS variables
- Minimal JavaScript bundle
- No external dependencies (except Supabase)

## Security

- Row-Level Security (RLS) policies
- HIPAA compliance considerations
- Data encryption support
- Secure authentication ready
- Input validation on forms

## Accessibility

- Semantic HTML structure
- Sufficient color contrast
- Keyboard navigation support
- ARIA labels for screen readers
- Responsive text sizing

## Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Mobile app
- [ ] Video consultations
- [ ] Integration with medical devices
- [ ] AI-powered diagnostics
- [ ] Multi-language support






