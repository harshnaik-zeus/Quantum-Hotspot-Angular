import { Injectable } from '@angular/core';

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

  constructor() { }

  // Getter function to retrieve the selections
  getSelections(): Selection[] {
    return this.selections;
  }

  // Setter function to update the selections array
  setSelections(selections: Selection[]): void {
    this.selections = selections;
  }

  // Function to add a single selection to the array
  addSelection(selection: Selection): void {
    this.selections.push(selection);
  }

  // Function to clear the selections
  clearSelections(): void {
    this.selections = [];
  }
}
