import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { SharedService, Selection } from 'src/app/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-canvas',
  templateUrl: './image-canvas.component.html',
  styleUrls: ['./image-canvas.component.scss']
})
export class ImageCanvasComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D | null;

  isDrawing = false;
  startX = 0;
  startY = 0;
  currentX = 0;
  currentY = 0;
  selections: (Selection | null)[] = [];
  tempSelection: Selection | null = null;

  image: HTMLImageElement | null = null;

  private selectionsSubscription: Subscription;

  constructor(private sharedService: SharedService) {
    this.selectionsSubscription = this.sharedService.selections$.subscribe(selections => {
      this.selections = selections;
      this.redrawCanvas();
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.canvas) {
      this.ctx = this.canvas.nativeElement.getContext('2d');
      if (!this.ctx) {
        throw new Error('Could not get 2D context from the canvas element.');
      }
    }
  }

  ngOnDestroy(): void {
    if (this.selectionsSubscription) {
      this.selectionsSubscription.unsubscribe();
    }
  }

  onImageAddClick(): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  onCanvasMouseDown(event: MouseEvent): void {
    this.isDrawing = true;
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.startX = event.clientX - rect.left;
    this.startY = event.clientY - rect.top;

    this.tempSelection = null;
    this.redrawCanvas();
  }

  onCanvasMouseMove(event: MouseEvent): void {
    if (!this.isDrawing) return;

    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.currentX = event.clientX - rect.left;
    this.currentY = event.clientY - rect.top;

    this.tempSelection = {
      x: Math.min(this.startX, this.currentX),
      y: Math.min(this.startY, this.currentY),
      width: Math.abs(this.currentX - this.startX),
      height: Math.abs(this.currentY - this.startY),
      fillStyle: 'rgba(255, 255, 0, 0.3)',
      strokeStyle: 'red'
    };

    this.redrawCanvas();
  }

  onCanvasMouseUp(): void {
    if (!this.isDrawing) return;
    this.isDrawing = false;
  }

  clearCanvas(): void {
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    }
  }

  drawSelections(): void {
    if (!this.ctx) return;
    
    this.selections.forEach(selection => {
      if (selection) {
        this.ctx!.fillStyle = selection.fillStyle;
        this.ctx!.strokeStyle = selection.strokeStyle;
        this.ctx!.lineWidth = 2;
        this.ctx!.fillRect(selection.x, selection.y, selection.width, selection.height);
        this.ctx!.strokeRect(selection.x, selection.y, selection.width, selection.height);
      }
    });
  }

  drawTempSelection(): void {
    if (!this.ctx || !this.tempSelection) return;
    
    this.ctx.fillStyle = this.tempSelection.fillStyle;
    this.ctx.strokeStyle = this.tempSelection.strokeStyle;
    this.ctx.lineWidth = 2;
    this.ctx.fillRect(this.tempSelection.x, this.tempSelection.y, this.tempSelection.width, this.tempSelection.height);
    this.ctx.strokeRect(this.tempSelection.x, this.tempSelection.y, this.tempSelection.width, this.tempSelection.height);
  }

  saveSelections(): void {
    if (this.tempSelection) {
      const availableIndex = this.selections.findIndex(sel => sel === null);
      if (availableIndex !== -1) {
        const updatedSelections = [...this.selections];
        updatedSelections[availableIndex] = this.tempSelection;
        this.sharedService.updateSelections(updatedSelections);
        // this.updateHotspotLabels();
        console.log("Saved Hotspot", availableIndex + 1);
      } else {
        console.log("Cannot Save, MAX 10");
      }
      this.tempSelection = null;
      this.redrawCanvas();
    }
  }

  redrawCanvas(): void {
    if (this.canvas && this.ctx) {
      this.clearCanvas();
      this.drawImage();
      this.drawSelections();
      this.drawTempSelection();
    }
  }

  drawImage(): void {
    if (this.ctx && this.image && this.canvas) {
      this.ctx.drawImage(this.image, 10, 10, this.canvas.nativeElement.width - 20, this.canvas.nativeElement.height - 10);
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.sharedService.updateSelections(new Array(10).fill(null));
      this.tempSelection = null;

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.image = new Image();
        this.image.onload = () => {
          this.redrawCanvas();
        };
        this.image.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}