import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city: any;
  weather: any;
  error!: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Get current location coordinates
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.getcurrent(latitude, longitude);
      },
      (error) => {
        this.error = 'Unable to retrieve your location.';
      }
    );
  }

  getWeather() {
    const apiKey = '47e7bf8a1850e44152cab5254f222a2d'
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${apiKey}`;

    this.http.get(apiUrl).subscribe((response: any) => {
      this.weather = response;
    });
  }

  getcurrent(latitude: any, longitude: any) {
    const apiKey = '47e7bf8a1850e44152cab5254f222a2d'
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.weather = response;
      },
      (error) => {
        this.error = 'Unable to retrieve weather data.';
      }
    );
  }
}
