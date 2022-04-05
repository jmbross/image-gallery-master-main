import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Data } from '@angular/router';
import { Image } from 'src/app/Image';
import { ImagesService } from 'src/app/service/images.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  id: number = 0;
  title: string = '';
  thumbnailUrl: string = '';
  href: string = '';
  url: string = '';
  data: Image[] = [];
  modal: any;

  @Output() btnClick = new EventEmitter();

  constructor(private imagesService: ImagesService) {}

  ngOnInit(): void {
    this.imagesService.getImages().subscribe((data) => {
      this.data = data;
      this.ordenamientoArray(data);
    });
  }
  onbtnClick(Image: any) {
    this.title = Image.title;
    this.url = Image.url;
  }

  ordenamientoArray(data: any[]) {
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const count = element.title.match(/[aeiou]/gi).length;
      data[i].vocales = count;
    }
    data.sort(this.compare);
    
  }
  compare(a: any, b: any) {
    if (a.vocales < b.vocales) {
      return -1;
    }
    if (a.vocales > b.vocales) {
      return 1;
    }
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }
}
