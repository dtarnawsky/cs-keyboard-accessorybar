import { EventEmitter, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  received = new EventEmitter<string>();

  constructor() { }

  send(text: string) {
    this.received.emit(text);
  }
}
