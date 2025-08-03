# Zentri - Smart OPD Registration & Patient Queue Management

A modern React TypeScript application for hospital queue management with real-time updates, QR code scanning, and multi-hospital support.

## 🚀 Features

- **Patient Interface**: Online registration, QR code scanning, queue tracking
- **Doctor Interface**: Patient queue management, appointment viewing
- **Multi-Hospital Support**: Support for multiple hospitals and departments
- **Real-time Updates**: Live queue position tracking
- **Modern UI/UX**: Beautiful animations and responsive design with Zentri branding
- **QR Code Integration**: Easy patient registration and tracking

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Material-UI (MUI)** for UI components
- **React Router DOM** for navigation
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **Vite** for fast development and building
- **Date-fns** for date handling

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd project

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🚀 Deployment

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Vercel will automatically detect the Vite configuration and deploy

### Option 2: Netlify

1. Push your code to GitHub
2. Connect your repository to [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Option 3: GitHub Pages

1. Push your code to GitHub
2. Enable GitHub Pages in your repository settings
3. The GitHub Actions workflow will automatically deploy on push to main

### Option 4: Manual Deployment

```bash
# Build the project
npm run build

# The built files will be in the 'dist' directory
# Upload the contents of 'dist' to your web server
```

## 📁 Project Structure

```
src/
├── components/     # Reusable components (including ZentriLogo)
├── context/       # App state management
├── pages/         # Main application pages
├── theme/         # Material-UI theme configuration
└── main.tsx       # Application entry point
```

## 🎨 Available Routes

- `/` - Home page with patient/doctor selection
- `/patient` - Patient interface
- `/doctor` - Doctor interface  
- `/patient/register` - Patient registration form
- `/patient/qr-scan` - QR code scanner
- `/patient/queue/:tokenId` - Patient queue tracking

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run start` - Start production server

## 🌐 Environment Variables

No environment variables are required for basic functionality. The app uses client-side state management.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue in the GitHub repository. 