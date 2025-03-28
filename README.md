# 🌦️ WeatherApp

A simple and clean React Native weather app built using **React Native CLI**, **Redux Toolkit**, and the **OpenWeatherMap API**. It supports both Android and iOS, includes dark mode toggle, persistent last searched city, and unit tests.

---

## 🚀 Features

- 🌇 Search weather by city name
- 🌤️ Shows temperature, weather condition, and icon
- 💡 Dark mode toggle
- 🧠 Stores last searched city using AsyncStorage
- 🔁 Handles loading and error states
- ✅ Unit tested components and Redux slice

---

## 📦 Tech Stack

- React Native CLI
- Redux Toolkit
- TypeScript
- Axios
- AsyncStorage
- Jest + React Native Testing Library

---

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16+ recommended)
- JDK 11 (for Android builds)
- Android Studio (or Xcode for iOS)
- React Native CLI

### Installation

- npm install
- Edit the file: src/services/weatherService.ts
- const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
- npx react-native run-android
- npx react-native run-ios

