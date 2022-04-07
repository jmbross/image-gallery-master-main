import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Image } from 'src/app/Image';
import { ImagesService } from 'src/app/service/images.service';
import { CdkDragDrop, CdkDragEnter, CdkDragMove, moveItemInArray } from '@angular/cdk/drag-drop';

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

  @ViewChild('dropListContainer') dropListContainer?: ElementRef;

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

  dropListReceiverElement?: HTMLElement;
  dragDropInfo?: {
    dragIndex: number;
    dropIndex: number;
  };

  dragEntered(event: CdkDragEnter<number>) {
    const drag = event.item;
    const dropList = event.container;
    const dragIndex = drag.data;
    const dropIndex = dropList.data;

    this.dragDropInfo = { dragIndex, dropIndex };

    const phContainer = dropList.element.nativeElement;
    const phElement = phContainer.querySelector('.cdk-drag-placeholder');

    if (phElement) {
      phContainer.removeChild(phElement);
      phContainer.parentElement?.insertBefore(phElement, phContainer);

      moveItemInArray(this.data, dragIndex, dropIndex);
    }
  }

  dragMoved(event: CdkDragMove<number>) {
    if (!this.dropListContainer || !this.dragDropInfo) return;

    const placeholderElement =
      this.dropListContainer.nativeElement.querySelector(
        '.cdk-drag-placeholder'
      );

    const receiverElement =
      this.dragDropInfo.dragIndex > this.dragDropInfo.dropIndex
        ? placeholderElement?.nextElementSibling
        : placeholderElement?.previousElementSibling;

    if (!receiverElement) {
      return;
    }

    receiverElement.style.display = 'none';
    this.dropListReceiverElement = receiverElement;
  }

  dragDropped(event: CdkDragDrop<number>) {
    if (!this.dropListReceiverElement) {
      return;
    }

    this.dropListReceiverElement.style.removeProperty('display');
    this.dropListReceiverElement = undefined;
    this.dragDropInfo = undefined;
  }


}
