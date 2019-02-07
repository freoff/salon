import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { isEmpty } from 'underscore';
import { FormState } from '../../types/form-status.enum';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
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
    this.isUpdate$ = this.params$.pipe(map((formState) => FormState.isUpdate(formState)));
  }
}
