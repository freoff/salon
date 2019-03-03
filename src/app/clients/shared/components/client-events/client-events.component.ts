import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ClientEventFormComponent } from '../client-event-form/client-event-form.component';
import { HTMLIonOverlayElement } from '@ionic/core';
import { ECHILD } from 'constants';
import { Client } from 'src/app/clients/models/client.interface';
@Component({
  selector: 'app-client-events',
  templateUrl: './client-events.component.html',
  styleUrls: ['./client-events.component.scss'],
})
export class ClientEventsComponent implements OnInit {
  public static CLIENT_EVENT_MODAL_ID = 'CLIENT_EVENT_MODAL_ID';
  @Input() client: Client;
  @Output() addClientEvent = new EventEmitter<any>();
  eventModal: any;
  constructor(private modalController: ModalController, private pop: PopoverController) {}

  ngOnInit() {}

  async onAddEvent(event: any) {
    this.eventModal = await this.pop.create({
      component: ClientEventFormComponent,
      cssClass: ['add-client-event-popover'],
    });
    this.eventModal.present();
    this.eventModal.onDidDismiss().then(({data}) => {
      console.log('data', data);
      if (data) {
        this.addClientEvent.emit(data);
      }
    });
  }
}
