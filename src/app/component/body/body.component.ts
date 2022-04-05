import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Data } from '@angular/router';
import { Image } from 'src/app/Image';
import { ImagesService } from 'src/app/service/images.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  id: number = 0;
  title: string = "";
  thumbnailUrl: string = "";
  href: string = "";
  url: string = "";
  data: Image[] = [];
  modal: any;
  
  
  

  @Output() btnClick = new EventEmitter();

  constructor(private imagesService: ImagesService) { }

  ngOnInit(): void {
    this.imagesService.getImages().subscribe(data => {
      this.data = data;
      
      this.ordenamientoArray(data);
    })
  }
  onbtnClick(Image: any) {
    this.title = (Image.title);
    this.url = (Image.url);
  }
 
   ordenamientoArray(data: any[]){
    
    for (let i = 0; i < data.length; i++) {
     const element = data[i];
     const count = element.title.match(/[aeiou]/gi).length;
     const cantVocales= {"vocales" : count};
     
     
     
     element.vocales = Object.assign(element.vocales, cantVocales);
       //propiedad                         target          sourse
     
     
     
        //console.log(element.title)
     //console.log (count);
     //console.log (cantVocales);
   }
     
 } 

}
