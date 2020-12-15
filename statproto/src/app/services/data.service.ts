import { Injectable } from '@angular/core';
import { Link } from '../models/link';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  selected: Link[] = []

  constructor() { }
}
