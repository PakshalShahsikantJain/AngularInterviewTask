// weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'GUz6Op0tz49J3bmJLUVtF2vf5osINRnq';  // Replace with your actual API key
  private baseUrl = 'https://api.tomorrow.io/v4/timelines';

  constructor(private http: HttpClient) {}

  getWeatherData(): Observable<any> {
    const headers = new HttpHeaders().set('apikey', this.apiKey);

    const body = {
      location: "51.5074,-0.1278", // Replace with your location (latitude,longitude)
      fields: ["temperature", "weatherCode"],
      units: "metric",
      timesteps: ["1h"],
      startTime: new Date().toISOString(), // Optional: specify a start time for the data
      endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString() // Optional: specify an end time
    };

    return this.http.post(this.baseUrl, body, { headers });
  }
}
