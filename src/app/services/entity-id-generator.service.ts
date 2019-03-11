import { Injectable } from '@angular/core';
import * as shorid from 'shortid';

@Injectable({
  providedIn: 'root',
})
export class EntityIdGeneratorService {
  constructor() {}

  generate(): EnityId {
    return shorid.generate();
  }
}

export type EnityId = string;
