import {Injectable} from '@angular/core';
import {ClientsModule} from './clients.module';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormStatus} from '../types/form-status.enum';

@Injectable({providedIn: ClientsModule})
export class ClientFormController {
    private _form: FormGroup;

    get form() {
        return this._form;
    }
    constructor(private fb: FormBuilder) {
        this.initializeForm();
    }

    isUpdateForm = () => FormStatus.isUpdate(this._form.get(['formState', 'formStatus']).value);

    private initializeForm() {
        this._form = this.fb.group({
            client: this.fb.group({
                fname: ['', [Validators.required, Validators.minLength(3)]],
                lname: ['', [Validators.required, Validators.minLength(3)]],
                telephone: [],
                email: ['', [Validators.email]],
                clientNotes: this.fb.array([])
            }),
            formState: this.fb.group({
                formStatus: FormStatus.createNew
            })
        });
    }
}
