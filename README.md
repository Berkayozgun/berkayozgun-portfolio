# Berkay Özgün Portfolio

Modern, responsive portfolio web application showcasing Berkay Özgün's software development experience, projects, skills, and professional achievements.

## ✨ Features

### 🎯 Core Sections
- **About Me**: Personal introduction and skills showcase
- **Projects**: Interactive carousel with 10+ projects from Elmali Tech, personal projects, and more
- **Certifications**: Professional certifications (Cisco, Alibaba Cloud, IBM)
- **Education**: Academic background and achievements
- **Blog**: Medium articles about software development and technology
- **Experience**: Work history with detailed descriptions
- **Contact**: Interactive contact form

### 🎨 UI/UX Features
- **Multi-language support**: Turkish & English with seamless switching
- **Modern responsive design**: Optimized for all devices
- **Project carousel/slider**: 
  - Smooth auto-slide with pause on hover
  - Manual navigation with arrows and dots
  - Responsive layout (1-3 projects visible based on screen size)
  - Project detail modals with image galleries
- **Dark/light theme**: Toggle between themes
- **Smooth animations**: Framer Motion powered transitions
- **Performance optimized**: Fast loading and smooth interactions

### 🚀 Technical Features
- TypeScript for type safety
- Vite for fast development and building
- TailwindCSS for styling
- Framer Motion for animations
- i18next for internationalization
- Responsive design with mobile-first approach

## 📸 Screenshots

![Portfolio Homepage](public/portfolio-website.png)

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/berkayozgun/portfolio.git
   cd berkayozgun-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:5173
   ```

## 🏗️ Build & Deploy

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Deployment
The build output will be in the `dist/` folder. Deploy to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag `dist/` folder to Netlify
- **GitHub Pages**: Use GitHub Actions
- **Any static server**: Upload `dist/` contents

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library

### Internationalization
- **i18next** - Translation management
- **react-i18next** - React integration

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📊 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components
│   ├── ProjectCarousel.tsx
│   ├── ProjectModal.tsx
│   └── Navigation.tsx
├── pages/              # Page components
│   └── Home.tsx        # Main portfolio page
├── data/               # Static data
│   └── profile.json    # Portfolio content
├── i18n/               # Internationalization
│   └── locales/        # Translation files
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── styles/             # Global styles
```

## 🎯 Key Features Explained

### Project Carousel
- **Auto-slide**: Projects automatically cycle through
- **Hover pause**: Stops auto-slide when user hovers
- **Manual control**: Arrow buttons and dot indicators
- **Responsive**: Adapts to screen size (1-3 projects visible)
- **Smooth animations**: Direction-aware slide transitions

### Multi-language Support
- **Turkish & English**: Complete translations
- **Seamless switching**: No page reload required
- **RTL support**: Ready for right-to-left languages

### Performance Optimizations
- **Code splitting**: Lazy loading of components
- **Image optimization**: Optimized project images
- **Bundle optimization**: Minimal bundle size
- **Fast loading**: Optimized for Core Web Vitals

## 🚀 Demo

> [Live Demo](https://berkayozgun.vercel.app) <!-- Update with your actual deployed link -->

## 📝 License & Contact

This is a personal portfolio project. For suggestions, contributions, or questions:

- **Email**: [Your Email]
- **LinkedIn**: [Your LinkedIn]
- **GitHub**: [Your GitHub]

---

**Berkay Özgün** © 2024 - Software Engineer & Web Developer
