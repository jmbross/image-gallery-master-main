import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../Image';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/photos?albumId=1';


  constructor(private http:HttpClient) { }

  getImages():Observable<any[]>{    
      return this.http.get<Image[]>(this.apiUrl);
    }
 
}
