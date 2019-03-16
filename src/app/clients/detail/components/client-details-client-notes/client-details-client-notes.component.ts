import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Client } from '../../../models/client.interface';
import { FormControl } from '@angular/forms';
import { IonText, IonTextarea } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { first, map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-client-details-client-notes',
  templateUrl: './client-details-client-notes.component.html',
  styleUrls: ['./client-details-client-notes.component.scss'],
})
export class ClientDetailsClientNotesComponent implements OnInit, AfterViewInit {
  @ViewChild('noteInput') noteInput: IonTextarea;
  get client(): Client {
    return this._client;
  }
  private _client: Client;
  @Input()
  set client(client: Client) {
    this.formControl.patchValue(client.clientNotes);
    this._client = client;
    this.cdr.markForCheck();
  }
  public editMessage = false;
  @Output() saveNote = new EventEmitter();

  formControl: FormControl = new FormControl('');
  constructor(private cdr: ChangeDetectorRef, private translationService: TranslateService) {}

  ngOnInit() {}

  ngAfterViewInit(): void {}

  onCancel() {
    this.editMessage = false;
    this.formControl.patchValue(this.client.clientNotes);
  }

  onSaveNote() {
    this.saveNote.emit({ client: this.client, note: this.formControl.value });
    this.editMessage = false;
  }
  toggleEditMessage() {
    this.editMessage = !this.editMessage;
    this.editMessage && setTimeout(() => this.noteInput.setFocus(), 300);
  }

  get clientNotes() {
    return this.translationService.get('clients.details.labels.noNotes').pipe(
      first(),
      map((translation) => (this.client.clientNotes.length > 3 ? this.client.clientNotes : translation)),
    );
  }
}
