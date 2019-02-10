import { Component, EventEmitter, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-client-search-input',
  templateUrl: './client-search-input.component.html',
  styleUrls: ['./client-search-input.component.scss'],
})
export class ClientSearchInputComponent implements OnInit, OnDestroy {
  closeSubscription = new Subject();
  @Output() changeSearchTerm = new EventEmitter();
  searchTerm = new FormControl('');
  constructor(private rendrer: Renderer2) {}

  ngOnInit() {
    this.searchTerm.valueChanges
      .pipe(takeUntil(this.closeSubscription))
      .subscribe((value) => this.changeSearchTerm.emit(value));
  }

  clearInput() {
    this.searchTerm.patchValue('');
  }

  ngOnDestroy(): void {
    this.closeSubscription.next();
  }
}
