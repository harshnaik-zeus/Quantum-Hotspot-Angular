import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService, Selection } from '../../shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-properties',
  templateUrl: './image-properties.component.html',
  styleUrls: ['./image-properties.component.scss']
})
export class ImagePropertiesComponent implements OnInit, OnDestroy {

  selections: (Selection | null)[] = [];
  private selectionsSubscription: Subscription | undefined;
  hotspotLabels: string[] = [];

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

  clearHotspots(): void {
    this.sharedService.updateSelections(new Array(10).fill(null));
    console.log("Selections cleared");
  }

  deleteHotspot(index: number):void{
    this.selections[index] = null;
    this.sharedService.updateSelections(this.selections);
  }


  private updateHotspotLabels(): void {
    this.hotspotLabels = this.selections
      .map((selection, index) => selection ? `Hotspot ${index + 1}` : '')
      .filter(label => label !== '');  // Only include non-empty labels
  }
} 