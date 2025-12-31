# FocusTime-Productivity-Tracking-Web-App

## Project Overview
FocusTime is a Progressive Web Application designed to help students improve productivity through focused study sessions, task management, and time tracking.

The application combines:
- Pomodoro based focus sessions
- Task management
- User Authentication
- Clear and consistent UI
- Offline-ready PWA capabilities

The project is developed as a team-based web application, following proper software engineering practices and based on the provided documents.

## Key Features
- User Authentication and Profile Management
- Pomodoro Timer with Focus Mode
- Task Board
- Reusable UI Components
- Progressive Web App
- Progress Tracking and Analytics

## Tech Stack
- Frontend: React 19.2.3
- Styling: Plain CSS
- Build Tool: Vite 5.x
- Routing: React Router DOM 7.11.0
- Icons: React Icons 5.5.0, Lucide React 0.562.0
- Backend: Firebase (Authentication & Firestore)
- PWA: Service Workers + Web App Manifest
- Version Control: Git and GitHub

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd FocusTime-Productivity-Tracking-Web-App
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal)

### Building for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Project Structure

```
FocusTime-Productivity-Tracking-Web-App/
├── public/                 # Static assets
│   ├── images/           # Image files
│   ├── favicon.ico       # App icon
│   └── manifest.json     # PWA manifest
├── src/
│   ├── assets/           # App assets (logos, etc.)
│   ├── components/       # Reusable UI components
│   ├── context/          # React context providers
│   ├── data/             # Mock data and constants
│   ├── features/         # Feature modules
│   │   ├── auth/        # Authentication pages
│   │   ├── home/        # Home page
│   │   ├── pomodoro/    # Pomodoro timer
│   │   ├── tasks/       # Task board
│   │   ├── progress/    # Progress tracking
│   │   └── mentora/     # Mentora feature components
│   ├── hooks/            # Custom React hooks
│   ├── services/        # API and service integrations
│   ├── styles/           # Global styles
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── index.html            # HTML template
├── vite.config.mjs       # Vite configuration
└── package.json          # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Backend Guidelines
- Firebase Authentication
- Firestore database structure
- Shared service for features

## Progressive Web App (PWA)
FocusTime supports PWA functionality:
- Installable on desktop and mobile
- Offline-ready basic support
- App manifest and service worker included

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary.
