Here is a `README.md` file based on the details you provided. You can copy and paste the text below directly into a file named `README.md` in your project's root directory.

-----

````markdown
# Accessible Weather Shelter

An accessible web application built with **Angular 16 Standalone components** to provide critical weather information for blind and visually impaired people.

This project analyzes current and forecasted weather data, presenting it through a clean UI and an essential **auditorial methodology (Text-to-Speech)**. In the event of severe weather, the app is designed to audibly alert the user and help them locate nearby shelters.

---

## 🚀 Core Features

* **Real-Time Weather Data**: Displays the current weather conditions and a 6-day forecast by integrating with the [WeatherAPI.com](https://www.weatherapi.com/) service.
* **Accessibility First (A11y)**: Designed specifically for blind and visually impaired users.
    * **Text-to-Speech (TTS)**: All critical weather information is converted to audio.
    * **Semantic HTML & ARIA**: Built with proper HTML structure and ARIA attributes for screen reader compatibility.
    * **Keyboard Navigation**: Fully navigable using a keyboard.
* **Severe Weather Alerts**: The app analyzes weather conditions for natural disasters, heavy rain, or other dangerous events.
* **Emergency Shelter Locator**: When a severe weather alert is active, the app will:
    1.  Immediately report the danger to the user via TTS.
    2.  Request the user's current location.
    3.  Display and announce nearby emergency shelters.

---

## 🛠️ Tech Stack

* **Frontend**: [Angular 16+](https://angular.io/)
    * **Standalone Components**: Built using Angular's modern, module-less standalone component architecture.
    * **Angular Router**: For navigating between app views.
    * **HttpClient**: For making requests to the weather API.
* **API**: [WeatherAPI.com](https://www.weatherapi.com/)
* **Accessibility**:
    * Web Speech API (SpeechSynthesis) for Text-to-Speech.
    * Browser Geolocation API for finding the user's location.

---

## 📦 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v18.10 or later)
* [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
* A free API Key from [WeatherAPI.com](https://www.weatherapi.com/signup.aspx)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/accessible-weather-shelter.git](https://github.com/your-username/accessible-weather-shelter.git)
    cd accessible-weather-shelter
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure API Key:**
    * Create a file named `environment.ts` in the `src/environments/` directory.
    * Add your API key to this file:

    ```typescript
    // src/environments/environment.ts
    export const environment = {
      production: false,
      weatherApiKey: 'YOUR_API_KEY_HERE'
    };
    ```

### Running the Development Server

Run the following command to start the app.

```bash
ng serve
````

Navigate to `http://localhost:4200/` in your browser. The app will automatically reload if you change any of the source files.

-----

## 🏗️ Project Structure

This project uses Angular 16 Standalone components, so you will not find `NgModule` files. Components, directives, and pipes are imported directly where they are needed.

```
/src
├── /app
│   ├── /components
│   │   ├── /current-weather
│   │   ├── /forecast
│   │   └── /shelter-locator
│   ├── /services
│   │   ├── /weather.service.ts     # Handles WeatherAPI calls
│   │   └── /tts.service.ts         # Manages Text-to-Speech
│   ├── /models
│   │   └── /weather.model.ts       # TypeScript interfaces for API data
│   ├── app.component.ts            # Main app component
│   ├── app.config.ts               # App configuration (routes, providers)
│   └── app.routes.ts               # App routing
├── /assets
│   └── /icons
├── /environments
│   ├── environment.ts
│   └── environment.development.ts
├── index.html
├── main.ts
└── styles.scss
```

```
```