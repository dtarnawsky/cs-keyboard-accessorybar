import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Keyboard, KeyboardStyle } from '@capacitor/keyboard';


@Component({
  selector: 'app-accessory-bar',
  templateUrl: './accessory-bar.component.html',
  styleUrls: ['./accessory-bar.component.scss']
})
export class AccessoryBarComponent implements OnInit, OnDestroy {
  @Output() clicked = new EventEmitter<string>();

  show = false;

  nextEmit: string;

  async ngOnInit() {
    console.log('ngOnInit');

    await Keyboard.addListener('keyboardWillShow', () => {
      console.log('keyboardWillShow');
      this.show = true;
    });

    await Keyboard.addListener('keyboardWillHide', () => {
      console.log('keyboardWillHide');
      this.show = false;
    });

    console.log('ngOnInit2');
  }

  async choose(value: string, block?: boolean) {
    if (block) {
      setTimeout(() => {
        this.clicked.emit(value);
        console.log('keyboard show()');
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
