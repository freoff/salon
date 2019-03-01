import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ClientEventFormComponent } from '../client-event-form/client-event-form.component';
import { HTMLIonOverlayElement } from '@ionic/core';
@Component({
  selector: 'app-client-events',
  templateUrl: './client-events.component.html',
  styleUrls: ['./client-events.component.scss'],
})
export class ClientEventsComponent implements OnInit {
  public static CLIENT_EVENT_MODAL_ID = 'CLIENT_EVENT_MODAL_ID';
  @Output() emitAddEvent = new EventEmitter<any>();
  eventModal: any;
  constructor(private modalController: ModalController, private pop: PopoverController) {}

  ngOnInit() {}

  async onAddEvent() {
    this.eventModal = await this.pop.create({
      component: ClientEventFormComponent,
      cssClass: ['add-client-event-popover'],
    });
    this.eventModal.present();
  }
  //   this.evenModal = await this.modalController.create({
  //     id: ClientEventsComponent.CLIENT_EVENT_MODAL_ID,
  //     component: ClientEventFormComponent,
  //     cssClass: ['modal', 'modal-small'],
  //   });
  //   console.log(this.evenModal);
  //
  //   if (this.evenModal) {
  //     this.evenModal.present();
  //     this.evenModal.onDidDismiss().then((data) => this.emitAddEvent.emit(data));
  //   }
  // }
}
