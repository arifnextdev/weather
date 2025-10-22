# 🚀 Quick Setup Guide

## Step 1: Get Your OpenWeather API Key

1. Go to [https://openweathermap.org/api](https://openweathermap.org/api)
2. Click "Sign Up" (top right)
3. Create a free account
4. After login, go to "API keys" section
5. Copy your API key (or generate a new one)

## Step 2: Configure the App

1. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your API key:
   ```
   EXPO_PUBLIC_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Run the App

```bash
npx expo start
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator  
- Scan QR code with Expo Go app on your phone

## ⚠️ Important Notes

- **API Key Activation**: New API keys may take 10-15 minutes to activate
- **Location Permissions**: The app will request location access on first launch
- **Internet Connection**: Required for fetching weather data

## 🎯 Testing the App

1. **Home Screen**: Should automatically detect your location and show current weather
2. **Forecast Screen**: Displays 5-day forecast and hourly predictions
3. **Search Screen**: Try searching for cities like "London", "Tokyo", "New York"

## 🐛 Common Issues

### "API key not valid"
- Wait 10-15 minutes after creating your API key
- Check that you copied the key correctly
- Ensure no extra spaces in the `.env` file

### "Location permission denied"
- Go to device Settings → Apps → Expo Go → Permissions
- Enable Location access

### App won't start
- Clear cache: `npx expo start -c`
- Reinstall: `rm -rf node_modules && npm install`

## 📱 Recommended Testing

- Test on both iOS and Android if possible
- Try different cities in the search
- Test with location services off
- Pull to refresh on each screen

---

Need help? Check the main README.md for detailed documentation.
