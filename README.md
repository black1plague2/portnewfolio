# Developer Portfolio

A cutting-edge, immersive portfolio website featuring advanced 3D effects, rotating cube buttons, and cyberpunk aesthetics. Built with Vite and pure CSS 3D transforms.

## ✨ Features

### 🎮 3D Interactive Elements

- **3D Cube Buttons** - All buttons are actual 3D cubes with 6 faces that rotate and revolve
- **Mouse-Tracking** - Buttons and cards follow cursor movements with realistic depth
- **Revolving Animations** - Continuous rotation effects on hover
- **Parallax Effects** - Floating orbs that respond to mouse position
- **Glassmorphism** - Translucent cards with backdrop blur

### 🌟 Dark Cyberpunk Theme

- Neon cyan/magenta color scheme
- Glowing text effects
- 3D perspective grid background
- Animated vignette overlay
- Custom scrollbar styling

### 📱 Comprehensive Sections

- **Hero Section** - Immersive introduction with animated title
- **Skills Section** - Tech stack organized by category with hover effects
- **Projects Section** - 6 featured projects with status badges and stats
- **Hackathon Section** - Timeline of 6 hackathon victories with achievements
- **Experience Section** - Professional work history with company logos
- **Contact Section** - 3D button links to social profiles

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm installed

### Installation

```powershell
# Install dependencies
npm install
```

### Development

```powershell
# Start dev server (with hot reload)
npm run dev
```

The dev server will start at `http://localhost:5173` (or the next available port).

### Build for Production

```powershell
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
portfolio/
├── .vscode/
│   ├── settings.json      # Prettier config & format-on-save
│   └── extensions.json    # Recommended extensions
├── src/
│   ├── main.js           # 3D interactions & mouse tracking
│   └── styles.css        # Complete 3D effects & animations
├── index.html            # AR/VR developer layout
├── package.json          # Project dependencies
├── .gitignore
└── README.md             # This file
```

## 🎨 Customization

### Update Content

1. **Personal Info** - Edit `index.html` hero section with your name and title
2. **Skills** - Modify `.skills-section` to add/remove technologies
3. **Projects** - Update `.project-grid` with your GitHub projects
4. **Hackathons** - Add your achievements in `.timeline`
5. **Experience** - Update `.experience-grid` with your work history
6. **Contact** - Change social links in `.contact-section`

### Customize Theme

Edit CSS variables in `src/styles.css`:

```css
:root {
  --primary: #00ffff; /* Cyan glow color */
  --secondary: #ff00ff; /* Magenta accent */
  --accent: #00ff88; /* Green highlights */
  --dark: #0a0a0f; /* Background color */
  --text: #e0e0ff; /* Text color */
}
```

### Adjust 3D Effects

Modify button depth and rotation in `src/styles.css`:

```css
.btn-face-front {
  transform: translateZ(12px); /* Increase for more depth */
}

.btn-3d:hover {
  transform: rotateX(-20deg) rotateY(20deg); /* Adjust angles */
}
```

## 🎯 Interactive Features

- **Smooth Scroll Navigation** - Click nav buttons to jump to sections
- **Card Hover Effects** - Project cards tilt and glow on hover
- **Button Interactions** - All buttons have click feedback animations
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Performance** - Pure CSS animations (no heavy libraries)

## 🛠️ Tech Stack

- **Vite** - Lightning-fast dev server and build tool
- **Vanilla JavaScript** - No framework overhead
- **CSS3 3D Transforms** - Hardware-accelerated animations
- **CSS Grid & Flexbox** - Modern responsive layouts
- **Custom Properties** - Easy theme customization

## 🎨 Color Palette

```
Cyan (Primary):      #00ffff - Main accent and glows
Magenta (Secondary): #ff00ff - Highlights and gradients
Green (Accent):      #00ff88 - Success states
Dark (Background):   #0a0a0f - Main background
Text:                #e0e0ff - Primary text
```

## 📱 Responsive Breakpoints

- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: < 768px

## 🔧 VS Code Setup

Recommended extensions (auto-suggested):

- **Prettier** - Code formatting on save
- **Live Server** - Alternative dev server

## 📝 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Built with ❤️ by GARV BANSAL** | Powered by Vite ⚡
