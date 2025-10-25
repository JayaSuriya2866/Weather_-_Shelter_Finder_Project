import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpclient: HttpClient) { }

  private api_key: string = "1a4335255c134102883182138251810";

  private base_url: string = "http://api.weatherapi.com/v1/";
  

  // Get Weather by location (latitude and longitude)
  getWeatherByLocation(lat: number, lon: number) {
    return this.httpclient.get(`${this.base_url}current.json?key=${this.api_key}&q=${lat},${lon}`);
  }

  //Get Current Weather
  getCurrentWeatherByCity(cityName: string) {
    return this.httpclient.get(`${this.base_url}current.json?key=${this.api_key}&q=${cityName}`);
  }

  //Get Weather Forecast
  getWeatherForecastByCity(cityName: string, days: number) {
    return this.httpclient.get(`${this.base_url}forecast.json?key=${this.api_key}&q=${cityName}&days=${days}`);
  }

  //Get Weather Alerts
  getWeatherAlertsByCity(cityName: string) {
    return this.httpclient.get(`${this.base_url}alerts.json?key=${this.api_key}&q=${cityName}&alerts=yes`);
  }

}
