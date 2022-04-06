import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef,} from '@angular/core';
import { Image } from 'src/app/Image';
import { ImagesService } from 'src/app/service/images.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, CdkDrag, CdkDropList, transferArrayItem, } from '@angular/cdk/drag-drop';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  image: Image[] = [];
  amount: number = 0;
  title: string = '';
  thumbnailUrl: string = '';
  href: string = '';
  url: string = '';
  modalRef?: BsModalRef;
  suscription!: Subscription;
  template!: TemplateRef<any>;
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    href: new FormControl(''),
    url: new FormControl(''),
    thumbnailUrl: new FormControl(''),
  });
  constructor(
    private FormBuilder: FormBuilder,
    private imagesService: ImagesService,
    private cdr: ChangeDetectorRef,
    private modalService: BsModalService
  ) { }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
  onDrop(event: CdkDragDrop<Image[]>) {
    moveItemInArray(this.image, event.previousIndex, event.currentIndex);
  }
  ngOnInit(): void {
    this.imagesService.getImages().subscribe((image) => {
      this.image = image;
    });
  }
}
