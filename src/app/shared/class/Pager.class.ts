import { Observable, ReplaySubject } from 'rxjs';

export class Pager<T> {
  private _data = new ReplaySubject<Array<T>>(1);

  get data(): Observable<Array<T>> {
    return this._data.asObservable();
  }

  constructor(private pageSize = 10, private pageNumber = 1, private collection?: T[]) {}

  next(): void {
    if (this.pageNumber < this.collection.length / this.pageSize) {
      return this.goToPage(this.pageNumber + 1);
    }
  }
  goToPage(pageNumber) {
    this.pageNumber = pageNumber;
    const result = this.collection.slice(this.pageSize * (this.pageNumber - 1), this.pageSize * this.pageNumber);
    this._data.next(result);
  }
  setCollection(collection: T[]) {
    this.collection = [...collection];
    this.goToPage(this.pageNumber);
  }

  previous() {
    if (this.pageSize > 1) {
      return this.goToPage(this.pageNumber - 1);
    }
  }
}
