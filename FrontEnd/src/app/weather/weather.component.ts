// weather.component.ts
import { Component, OnInit } from '@angular/core';
import { WeatherService} from '../wetherdata.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherData: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather(): void {
    this.weatherService.getWeatherData().subscribe(
      (data: any) => {
        this.weatherData = data;
        console.log('Weather Data:', this.weatherData);
      },
      error => {
        console.error('Error fetching weather:', error);
      }
    );
  }
}
