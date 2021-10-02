import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  @Output() loadingEvent = new EventEmitter();

  constructor() { }

  startLoadingIndicator() {
    this.loadingEvent.emit(true);
  }

  stopLoadingIndicator() {
    this.loadingEvent.emit(false);
  }
}
