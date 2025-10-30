import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { CurrentWeather } from '../class/currentWeather'
import { Location } from '../class/location';
import { Forecastday } from '../class/forecastday';
import { Alert } from '../class/alert';
import { take } from 'rxjs';




@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  voices: SpeechSynthesisVoice[] = [];
  selectedVoice: SpeechSynthesisVoice | null = null;

  ngOnInit(): void {
    // geolocation
    this.weatherService.getPosition()
      .pipe(take(1))
      .subscribe({
        next: (coords: GeolocationCoordinates) => {
          this.fetchWeatherByCoords(coords.latitude, coords.longitude);
        },
        error: (err: GeolocationPositionError | Error) => {
          console.error('Error getting location: ', err.message);
          this.onSearch('');
        }
      });
    // user input search
    this.onSearch('');
    this.loadVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
    }
    window.addEventListener('keydown', this.handleKeydown.bind(this));
  }
  title = 'accessible_weather-shelter_finder';


  constructor(private weatherService: WeatherService) { }

  // set default city until user searches for a city
  tempSearchTerm: string = 'New York';
  onSearch(searchTerm: string): void {
    const city = searchTerm && searchTerm.trim() ? searchTerm.trim() : 'New York';
    this.tempSearchTerm = city;
    console.log("You searched for:", city);
    this.fetchWeatherByCity(city);
    this.fetchForecastByCity(city, 5);
    this.fetchAlertsByCity(city);
    // input field will be cleared after search
    this.tempSearchTerm = '';
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.handleKeydown.bind(this));
  }

  // Variables to store specific parts of the response
  getLocation: Location | undefined
  getCurrent: CurrentWeather | undefined;
  getForecastDay: Forecastday[] | undefined;
  getAlerts: any = [];
  getAlert: Alert[] = [];
  // Variables to store fetched data
  getFetchedWeather: any;
  getFetchedForecast: any;
  getFetchedAlerts: any;

  fetchWeatherByCoords(lat: number, lon: number) {
    this.weatherService.getCurrentWeatherByCoords(lat, lon).subscribe({
      next: (weatherResponse) => {
        this.getFetchedWeather = weatherResponse;
        this.getLocation = this.getFetchedWeather.location;
        this.getCurrent = this.getFetchedWeather.current;
        this.getAlerts = this.fetchAlertsByCity(this.getFetchedWeather.location.name)
      },
      error: (error) => {
        console.error('Error fetching weather data by coords:', error);
      }
    });

    this.weatherService.getWeatherForecastByCoords(lat, lon, 5).subscribe({
      next: (forecastResponse) => {
        this.getFetchedForecast = forecastResponse;
        this.getForecastDay = this.getFetchedForecast.forecast.forecastday;
      },
      error: (error) => {
        console.error('Error fetching forecast by coords:', error);
      }
    });
  }


  fetchWeatherByCity(cityName: string) {
    this.weatherService.getCurrentWeatherByCity(cityName).subscribe({
      next: (weatherResponse) => {
        // console.log('Weather data:', weatherResponse);
        this.getFetchedWeather = weatherResponse;
        this.getLocation = this.getFetchedWeather.location;
        this.getCurrent = this.getFetchedWeather.current;
        // console.log('Location:', this.getLocation);
        // console.log('Current Weather:', this.getCurrent);
        // console.log(this.getLocation?.name,'name')
        // console.log(this.getLocation?.country,'country')
        // console.log(this.getLocation?.lat,'lat')
        // console.log(this.getLocation?.lon,'lon')
        // console.log(this.getCurrent?.temp_c,'temp_c')
        // console.log(this.getCurrent?.temp_f,'temp_f')
        // console.log(this.getCurrent?.uv,'uv')
        // console.log(this.getCurrent?.wind_kph,'wind_kph')
        // console.log(this.getCurrent?.humidity,'humidity')
      },
      error: (error) => {
        console.error('Error fetching weather data:', error);
      }
    });
  }


  fetchForecastByCity(cityName: string, days: number) {
    this.weatherService.getWeatherForecastByCity(cityName, days).subscribe({
      next: (forecastResponse) => {
        // console.log("---------------------forecast-------------------");
        // console.log('Weather forecast data:', forecastResponse);
        this.getFetchedForecast = forecastResponse;
        this.getForecastDay = this.getFetchedForecast.forecast.forecastday;
        // console.log('Weather Forecast:', this.getForecastDay);
        // console.log(this.getForecastDay, 'forecastday');
        // console.log(this.getForecastDay && this.getForecastDay[0]?.date, 'date');
        // console.log(this.getForecastDay && this.getForecastDay[0]?.day?.condition?.text, 'condition');
        // console.log(this.getForecastDay && this.getForecastDay[0]?.day?.maxwind_kph, 'maxwind_kph');
        // console.log(this.getForecastDay && this.getForecastDay[0]?.day?.maxtemp_c, 'maxtemp_c');
        // console.log(this.getForecastDay && this.getForecastDay[0]?.day?.mintemp_c, 'mintemp_c');
        // console.log(this.getForecastDay && this.getForecastDay[0]?.day?.avghumidity, 'avghumidity');
        // console.log(this.getForecastDay && this.getForecastDay[0]?.day?.daily_chance_of_rain, 'daily_chance_of_rain');
        // console.log(this.getForecastDay && this.getForecastDay[0]?.day?.daily_chance_of_snow, 'daily_chance_of_snow');
        // console.log(this.getForecastDay && this.getForecastDay[0]?.astro?.sunrise, 'sunrise');
        // console.log(this.getForecastDay && this.getForecastDay[0]?.astro?.sunset, 'sunset');
      },
      error: (error) => {
        console.error('Error fetching weather forecast data:', error);
      }
    });
  }


  fetchAlertsByCity(cityName: string) {
    this.weatherService.getWeatherAlertsByCity(cityName).subscribe({
      next: (alertsResponse) => {
        // console.log('Weather alerts data:', alertsResponse);
        this.getFetchedAlerts = alertsResponse;
        this.getAlerts = this.getFetchedAlerts.alerts;
        // console.log('Weather Alerts:', this.getAlerts);
        this.getAlert = this.getAlerts.alert;
        this.getAlert.forEach((alert: any) => {
          // console.log('Alert:', alert);
        });
      },
      error: (error) => {
        console.error('Error fetching weather alerts data:', error);
      }
    });
  }



  loadVoices() {
    if ('speechSynthesis' in window) {
      this.voices = window.speechSynthesis.getVoices();
      if (this.voices.length && !this.selectedVoice) {
        this.selectedVoice = this.voices[0];
      }
    }
  }
  onVoiceChange(event: any) {
  }



  popupMessage: string = '';
  popupFontSize: number = 18;
  popupDarkTheme: boolean = true;
  isTTSPaused: boolean = false;

  showPopup(message: string) {
    this.popupMessage = message;
  }

  hidePopup() {
    this.popupMessage = '';
     if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    this.isTTSPaused = false;
  }
  }

  togglePopupTheme() {
    this.popupDarkTheme = !this.popupDarkTheme;
  }

  increasePopupFont() {
    if (this.popupFontSize < 36) this.popupFontSize += 2;
  }

  decreasePopupFont() {
    if (this.popupFontSize > 12) this.popupFontSize -= 2;
  }

  togglePauseResumeTTS() {
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.speaking) {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
          this.isTTSPaused = false;
        } else {
          window.speechSynthesis.pause();
          this.isTTSPaused = true;
        }
      }
    }
  }

  speak(text: string) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isTTSPaused = false;
      const utterance = new SpeechSynthesisUtterance(text);
      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }
      utterance.onend = () => {
        this.hidePopup();
        this.isTTSPaused = false;
      };
      utterance.onerror = () => {
        this.hidePopup();
        this.isTTSPaused = false;
      };
      window.speechSynthesis.speak(utterance);
      this.showPopup('🔊 ' + text);
    } else {
      this.showPopup('Text-to-speech not supported in this browser.');
      setTimeout(() => this.hidePopup(), 4000);
    }
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      return;
    }
    const key = event.key.toLowerCase();
    if (key === 'c') {
      this.speak(
        'Current weather in ' + this.getLocation?.name + ', ' +
        'temperature ' + this.getCurrent?.temp_c + ' degrees Celsius, ' +
        'humidity ' + this.getCurrent?.humidity + ' percent, ' +
        'wind ' + this.getCurrent?.wind_kph + ' kilometers per hour.'
      );
    } else if (['1', '2', '3', '4', '5'].includes(key)) {
      const idx = parseInt(key, 10) - 1;
      if (this.getForecastDay && this.getForecastDay[idx]) {
        const day = this.getForecastDay[idx];
        this.speak(
          'Forecast for ' + day.date + ': ' + day.day?.condition?.text +
          ', max temperature ' + day.day?.maxtemp_c + ' degrees, min temperature ' +
          day.day?.mintemp_c + ' degrees, humidity ' + day.day?.avghumidity + ' percent.'
        );
      }
    } else if (key === 'a') {
      if (this.getAlert && this.getAlert.length > 0) {
        const alert = this.getAlert[0];
        this.speak(
          'Alert: ' + alert.headline +
          '. Severity: ' + alert.severity +
          '. Description: ' + alert.desc
        );
      }
    }
  }
}
