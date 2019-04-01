import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormState } from '../../types/form-status.enum';

@Component({
  selector: 'app-new',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  params$: Observable<FormState>;
  isUpdate$: Observable<boolean>;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.readParams();
  }

  private readParams() {
    this.params$ = this.route.paramMap.pipe(
      map((params) => (params.has('formState') ? (params.get('formState') as FormState) : FormState.createNew)),
    );

    // this.isUpdate$ = this.params$.pipe(map((formState) => FormState.isUpdate(formState)));
    this.isUpdate$ = this.route.data.pipe(
      distinctUntilChanged(),
      tap((data) => console.log('resolve with', data)),
      map((data) => !!data.client),
    );
  }
}
