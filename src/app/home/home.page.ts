import { Component } from '@angular/core';
import { Keyboard } from '@capacitor/keyboard';
import { AlertController } from '@ionic/angular';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  message: string;

  constructor(private chatService: ChatService, private alert: AlertController) {
    this.chatService.received.subscribe(async (text: string) => {
      console.log('home received', text);
      if (text === 'test') {
        this.message = `You clicked test at ${new Date().toTimeString()}`;
        return;
      }

      //await Keyboard.hide();

      setTimeout(async () => {
        const ctrl = await this.alert.create({ header: `You clicked ${text}`, buttons: ['OK'] });
        ctrl.present();
      }, 600); // Enough time for the keyboard to disappear
    });
  }

}
