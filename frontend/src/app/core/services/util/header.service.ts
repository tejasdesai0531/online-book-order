import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  @Output() editEvent = new EventEmitter();

  private isEdit: boolean;
  private area: string;

  constructor() {
    this.isEdit = false;
  }

  setOptions(isEdit: boolean) {
    this.isEdit = isEdit;
  }

  editButtonClicked() {
    this.isEdit = !this.isEdit;
    this.editEvent.emit(this.isEdit);
  }
}
