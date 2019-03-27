import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ClientEventFormComponent } from './components/client-event-form/client-event-form.component';
import { ClientEvent } from '../models/client-event';
import { SharedModule } from './shared.module';

@Injectable({ providedIn: SharedModule })
export class ClientEventFormPopoverCreator {
  set currency(value: any) {
    this._currency = value;
  }
  get currency(): any {
    return this._currency;
  }
  private FORM_COMPONENT = ClientEventFormComponent;
  private popover: any;
  private eventModal: any;
  private _currency: any;
  constructor(private popoverController: PopoverController) {}

  async createUpdateForm(ce: ClientEvent, currency: string): Promise<any> {
    this.popover = await this.popoverController.create({
      component: this.FORM_COMPONENT,
      componentProps: {
        isUpdate: true,
        clientEvent: ce,
        currency: currency,
      },
      cssClass: ['add-client-event-popover'],
    });
    await this.popover.present();
    return this.popover.onDidDismiss();
    // return new Promise<any>((res, rej) => {
    //   this.popover.onDidDismiss((data) => res(data));
    // });
  }
  // async onAddEvent(event: any) {
  //   this.eventModal = await this.popoverController.create({
  //     component: ClientEventFormComponent,
  //     componentProps: { currency: this._currency },
  //     cssClass: ['add-client-event-popover'],
  //   });
  //   this.eventModal.present();
  //   this.eventModal.onDidDismiss().then(({ data }) => {
  //     if (data) {
  //       this.addClientEvent.emit(data);
  //     }
  //   });
  // }
}
