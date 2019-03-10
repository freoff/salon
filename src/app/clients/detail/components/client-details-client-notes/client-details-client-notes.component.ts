import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Client} from '../../../models/client.interface';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-client-details-client-notes',
  templateUrl: './client-details-client-notes.component.html',
  styleUrls: ['./client-details-client-notes.component.scss'],
})
export class ClientDetailsClientNotesComponent implements OnInit {
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
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  onCancel() {
    debugger;
    this.editMessage = false;
    this.formControl.patchValue(this.client.clientNotes);
  }

  onSaveNote() {
    this.saveNote.emit({client: this.client, note: this.formControl.value});
    this.editMessage = false;
  }
  toggleEditMessage() {
    this.editMessage = !this.editMessage;
  }
}
