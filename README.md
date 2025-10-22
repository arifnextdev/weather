# 🌤️ Weather App

A beautiful, professional weather application built with React Native and Expo. Get real-time weather information, 5-day forecasts, and search for weather in any city around the world.

## ✨ Features

- **📍 Current Location Weather**: Automatically detects your location and displays current weather conditions
- **🔮 5-Day Forecast**: View detailed weather forecasts for the next 5 days
- **🔍 City Search**: Search for weather information in any city worldwide
- **💫 Beautiful Animations**: Smooth animations and dynamic backgrounds based on weather conditions
- **⚡ Skeleton Loading**: Professional loading states with animated skeletons
- **🎨 Weather-Based Gradients**: Dynamic color gradients that change based on weather conditions
- **📊 Detailed Weather Info**: Temperature, humidity, wind speed, pressure, visibility, sunrise/sunset times
- **🔄 Pull to Refresh**: Easy refresh functionality on all screens
- **🌓 Dark Mode Support**: Automatic theme switching based on system preferences

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd weather
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get OpenWeather API Key**
   - Visit [OpenWeather API](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate your API key

4. **Configure Environment Variables**
   ```bash
   # Create .env file from example
   cp .env.example .env
   
   # Edit .env and add your API key
   EXPO_PUBLIC_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

5. **Start the development server**
   ```bash
   npx expo start
   ```

6. **Run the app**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your physical device

## 📱 App Structure

```
weather/
├── app/                      # Main application screens
│   ├── (tabs)/              # Tab-based navigation
│   │   ├── index.tsx        # Home/Weather screen
│   │   ├── forecast.tsx     # 5-Day forecast screen
│   │   └── search.tsx       # City search screen
│   └── _layout.tsx          # Root layout
├── components/              # Reusable components
│   └── weather/            # Weather-specific components
│       ├── AnimatedBackground.tsx
│       ├── ForecastCard.tsx
│       ├── LoadingSkeleton.tsx
│       ├── Skeleton.tsx
│       ├── WeatherCard.tsx
│       └── WeatherDetail.tsx
├── services/               # API and service layers
│   ├── weatherApi.ts       # OpenWeather API integration
│   └── locationService.ts  # Location services
├── types/                  # TypeScript type definitions
│   └── weather.ts
├── utils/                  # Utility functions
│   └── weatherHelpers.ts
└── constants/             # App constants and themes
```

## 🎨 Key Technologies

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tooling
- **TypeScript**: Type-safe code
- **Expo Router**: File-based routing
- **Axios**: HTTP client for API requests
- **Expo Location**: Native location services
- **Lucide React Native**: Beautiful icon library
- **React Native Reanimated**: Smooth animations
- **Expo Linear Gradient**: Gradient backgrounds

## 🌐 API Integration

This app uses the [OpenWeather API](https://openweathermap.org/api) for weather data:

- **Current Weather Data**: Real-time weather conditions
- **5-Day Forecast**: Weather predictions for the next 5 days
- **Geocoding**: Location-based weather search

## 📋 Available Scripts

- `npm start`: Start the Expo development server
- `npm run android`: Run on Android emulator
- `npm run ios`: Run on iOS simulator
- `npm run web`: Run in web browser
- `npm run lint`: Run ESLint

## 🔐 Permissions

The app requires the following permissions:

- **Location**: To fetch weather data for your current location
  - iOS: `NSLocationWhenInUseUsageDescription`
  - Android: `ACCESS_COARSE_LOCATION`, `ACCESS_FINE_LOCATION`

## 🎯 Features Breakdown

### Home Screen
- Current weather conditions
- Temperature (feels like, min, max)
- Weather details (humidity, wind, pressure, visibility)
- Sunrise and sunset times
- Pull-to-refresh functionality

### Forecast Screen
- 5-day weather forecast
- Daily temperature highs and lows
- Hourly forecast for the next 24 hours
- Weather conditions and wind speed

### Search Screen
- Search weather by city name
- Recent searches history
- Detailed weather information for searched locations
- Country and coordinates display

## 🎨 UI/UX Features

- **Dynamic Backgrounds**: Color gradients change based on weather conditions
- **Smooth Animations**: Subtle animations enhance user experience
- **Loading States**: Professional skeleton loaders during data fetch
- **Error Handling**: User-friendly error messages and retry options
- **Responsive Design**: Works on various screen sizes
- **Haptic Feedback**: Tactile feedback on tab navigation

## 🐛 Troubleshooting

### Location Permission Issues
- Make sure location services are enabled on your device
- Grant location permissions when prompted
- Check app settings if permissions were previously denied

### API Key Issues
- Verify your API key is correct in the `.env` file
- Ensure the API key is active (new keys may take a few minutes)
- Check your API usage limits on OpenWeather dashboard

### Build Issues
- Clear cache: `npx expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Reset Metro bundler: `npx react-native start --reset-cache`

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using React Native and Expo
