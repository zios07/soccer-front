import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  dialog: NgbModalRef | null;
  
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  signup() {

  }

  login() {

  }

  open(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop', centered: true});
  }

}
