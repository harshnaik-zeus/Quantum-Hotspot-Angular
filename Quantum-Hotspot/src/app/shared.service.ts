import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Selection {
  x: number;
  y: number;
  width: number;
  height: number;
  fillStyle: string;
  strokeStyle: string;
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private selections: Selection[] = [];
  private selectionsSubject = new BehaviorSubject<(Selection | null)[]>(new Array(10).fill(null));
  selections$ = this.selectionsSubject.asObservable();

  updateSelections(selections: (Selection | null)[]): void {
    this.selectionsSubject.next(selections);
  }
  getSelections(): Selection[] {
    return this.selections;
  }
}