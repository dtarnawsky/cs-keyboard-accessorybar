import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Keyboard } from '@capacitor/keyboard';
import { IonButton, IonButtons, IonToolbar, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-accessory-bar',
  templateUrl: './accessory-bar.component.html',
  styleUrls: ['./accessory-bar.component.scss'],
  imports: [ IonicModule ],
  standalone: true
})
export class AccessoryBarComponent implements OnInit, OnDestroy {
  @Output() clicked = new EventEmitter<string>();
  @Input() label = 'Done';

  show = false;

  nextEmit: string;

  async ngOnInit() {
    await Keyboard.addListener('keyboardWillShow', () => {
      console.log('keyboardWillShow');
      this.show = true;
    });

    await Keyboard.addListener('keyboardWillHide', () => {
      console.log('keyboardWillHide');
      this.show = false;
    });
  }

  next() {
    let e: Element = this.surfaceLevel(document.activeElement);
    this.focus(this.findNext(e));

  }

  previous() {
    let e: Element = this.surfaceLevel(document.activeElement);
    this.focus(this.findPrevious(e));
  }

  surfaceLevel(e: Element) {
    if (e.nextElementSibling) {
      return e;
    }
    while (e.parentElement) {
      e = e.parentElement;
      if (e.tagName.toLowerCase().startsWith('ion-')) {
        return e;
      }
    }
    return e;
  }

  inputItems = ['input', 'ion-input', 'ion-textarea'];

  findNext(e: Element): HTMLElement {
    while (e.nextElementSibling) {
      e = e.nextElementSibling;
      if (this.inputItems.includes(e.tagName.toLowerCase())) {
        return e as HTMLElement;
      }
    }
    return undefined;
  }

  findPrevious(e: Element): HTMLElement {
    while (e.previousElementSibling) {
      e = e.previousElementSibling;
      if (this.inputItems.includes(e.tagName.toLowerCase())) {
        return e as HTMLElement;
      }
    }
    return undefined;
  }

  focus(e: HTMLElement) {
    if (!e) return;
    if (e.tagName.toLowerCase() == 'ion-input') {
      e = e.querySelector('.native-input');
    }
    if (e.tagName.toLowerCase() == 'ion-textarea') {
      e = e.querySelector('.native-textarea');
    }
    e.focus();
  }


  async choose(value: string, block?: boolean) {
    if (block) {
      setTimeout(() => {
        this.clicked.emit(value);
        Keyboard.show();
      }, 1);
      return;
    }

    this.show = false;
    this.clicked.emit(value);
  }

  async ngOnDestroy() {
    await Keyboard.removeAllListeners();
  }



}
