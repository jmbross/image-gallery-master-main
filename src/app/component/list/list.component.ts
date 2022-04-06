import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/service/images.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private dataSvc: ImagesService) { }

  ngOnInit(): void {
   this.dataSvc.getImages().subscribe(res => console.log(res));

  }

}
