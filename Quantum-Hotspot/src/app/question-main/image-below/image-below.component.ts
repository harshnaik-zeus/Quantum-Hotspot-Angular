import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService, Selection } from '../../shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-below',
  templateUrl: './image-below.component.html',
  styleUrls: ['./image-below.component.scss']
})
export class ImageBelowComponent implements OnInit, OnDestroy {

  selections: (Selection | null)[] = [];
  private selectionsSubscription: Subscription | undefined;
  hotspotRadios: string[] = [];

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.selectionsSubscription = this.sharedService.selections$.subscribe(selections => {
      this.selections = selections;
      this.updateHotspotLabels(); 
    });
  }

  ngOnDestroy(): void {
    this.selectionsSubscription?.unsubscribe();
  }

  private updateHotspotLabels(): void {
    this.hotspotRadios = this.selections
      .map((selection, index) => selection ? `Hotspot ${index + 1}` : '')
      .filter(label => label !== '');  // Only include non-empty labels
  }

}
