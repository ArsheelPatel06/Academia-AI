# Academia AI - Intelligent Education Management System

A modern, responsive web application for educational institutions to manage students, attendance, schedules, and academic analytics.

## 🌟 Features

### 📊 **Dashboard & Analytics**

- **Overview Dashboard** - Real-time statistics and key metrics
- **Student Performance Analytics** - AI-powered grade predictions
- **Attendance Tracking** - Comprehensive attendance management
- **Interactive Charts** - Performance distribution and feature importance visualizations

### 📅 **Calendar & Scheduling**

- **Interactive Calendar** - Monthly view with event management
- **Event Management** - Add, edit, and delete academic events
- **Lecture Scheduling** - Subject-specific lecture organization
- **Color-coded Events** - Visual categorization system

### 👥 **Student Management**

- **Class Management** - Detailed class information and schedules
- **Attendance Tracking** - Real-time attendance marking
- **Assignment Management** - Track assignments and due dates
- **Notes System** - Academic notes and observations

### 🎨 **Modern UI/UX**

- **Dark/Light Mode** - Complete theme switching
- **Responsive Design** - Works on all devices
- **Interactive Elements** - Smooth animations and transitions
- **Professional Interface** - Clean, modern design

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)

1. **Fork this repository** to your GitHub account
2. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` (will be created automatically)
   - Save
3. **Access your site**: `https://yourusername.github.io/repository-name`

### Option 2: Local Development

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/academia-ai.git
   cd academia-ai
   ```

2. **Open in browser**:

   - Navigate to `frontend/login.html`
   - Or use a local server:

   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve .

   # Using PHP
   php -S localhost:8000
   ```

3. **Access the application**:
   - Open `http://localhost:8000` in your browser
   - You'll be automatically redirected to the login page

## 🔐 Authentication

### Demo Credentials

- **Username**: `admin`
- **Password**: `admin`

### Features

- **Session Management** - Persistent login state
- **Auto-redirect** - Unauthenticated users redirected to login
- **Secure Storage** - Local storage for user data

## 📁 Project Structure

```
academia-ai/
├── frontend/                 # Frontend application
│   ├── login.html           # Login page with 3D background
│   ├── dashboard.html       # Main dashboard
│   ├── calendar.html        # Interactive calendar
│   ├── analytics.html       # Analytics and charts
│   ├── graph.html          # Performance graphs
│   ├── attendance.html     # Attendance management
│   ├── classes.html        # Class management
│   ├── profile.html        # User profile
│   ├── about.html          # About page
│   ├── style/              # CSS stylesheets
│   │   └── style.css      # Main stylesheet
│   └── js/                 # JavaScript files
│       └── global.js      # Global functionality
├── backend/                # Backend API (if needed)
├── assets/                 # Images and static assets
├── index.html             # Main redirect page
└── README.md              # This file
```

## 🎨 Design System

### Color Palette

- **Primary Blue**: `#3b82f6`
- **Accent Green**: `#10b981`
- **Warning Orange**: `#f59e0b`
- **Error Red**: `#ef4444`
- **Purple**: `#8b5cf6`

### Typography

- **Primary Font**: Segoe UI, system fonts
- **Headings**: Bold weights for hierarchy
- **Body Text**: Regular weight for readability

## 🔧 Technologies Used

### Frontend

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Interactive functionality
- **Chart.js** - Data visualization
- **Font Awesome** - Icons
- **Spline 3D** - Interactive 3D backgrounds

### Features

- **Local Storage** - Data persistence
- **Responsive Design** - Mobile-first approach
- **Progressive Enhancement** - Works without JavaScript
- **Accessibility** - ARIA labels and semantic HTML

## 📱 Responsive Design

The application is fully responsive and works on:

- **Desktop** - Full feature set with side navigation
- **Tablet** - Optimized layout with touch interactions
- **Mobile** - Simplified navigation and touch-friendly controls

## 🌙 Dark/Light Mode

- **Automatic Detection** - Respects system preferences
- **Manual Toggle** - User can switch themes
- **Persistent Settings** - Remembers user preference
- **Complete Coverage** - All components support both themes

## 🚀 Deployment

### GitHub Pages

The project is configured for automatic deployment to GitHub Pages:

1. **Push to main branch** - Triggers automatic deployment
2. **GitHub Actions** - Builds and deploys automatically
3. **Live Site** - Available at `https://username.github.io/repo-name`

### Custom Domain

To use a custom domain:

1. Add your domain to GitHub Pages settings
2. Update the redirect in `index.html` if needed
3. Configure DNS settings for your domain

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature-name`
3. **Make your changes**
4. **Commit your changes**: `git commit -m 'Add feature'`
5. **Push to the branch**: `git push origin feature-name`
6. **Submit a pull request**

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:

1. Check the browser console for errors
2. Ensure you're using a modern browser
3. Clear browser cache and try again
4. Open an issue on GitHub with details

## 🎯 Roadmap

- [ ] **Real-time Collaboration** - Live updates for multiple users
- [ ] **Advanced Analytics** - Machine learning insights
- [ ] **Mobile App** - Native mobile application
- [ ] **API Integration** - Backend server implementation
- [ ] **Multi-language Support** - Internationalization
- [ ] **Advanced Security** - Enhanced authentication system

---

**Built with ❤️ for modern education management**
# Academia-Ai
