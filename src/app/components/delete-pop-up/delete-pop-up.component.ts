import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-pop-up',
  templateUrl: './delete-pop-up.component.html',
  styleUrls: ['./delete-pop-up.component.scss'],
})
export class DeletePopUpComponent implements OnInit {
  @Output() confirmDeleteEmitter = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  confirmation(decision) {
    this.confirmDeleteEmitter.emit(decision);
  }
}
