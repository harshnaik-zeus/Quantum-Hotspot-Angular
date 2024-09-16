import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

interface Selection {
  x: number;
  y: number;
  width: number;
  height: number;
  fillStyle: string;
  strokeStyle: string;
}

@Component({
  selector: 'app-image-canvas',
  templateUrl: './image-canvas.component.html',
  styleUrls: ['./image-canvas.component.scss']
})
export class ImageCanvasComponent implements OnInit, AfterViewInit {

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D | null;

  isDrawing = false;
  startX = 0;
  startY = 0;
  currentX = 0;
  currentY = 0;
  selections: (Selection | null)[] = new Array(10).fill(null); // Array of size 10
  tempSelection: Selection | null = null;

  image: HTMLImageElement | null = null; // To store the loaded image

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.canvas) {
      this.ctx = this.canvas.nativeElement.getContext('2d');
      if (!this.ctx) {
        throw new Error('Could not get 2D context from the canvas element.');
      }
    }
  }

  onImageAddClick(): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.click(); // Simulate clicking the hidden file input
    }
  }

  onCanvasMouseDown(event: MouseEvent): void {
    this.isDrawing = true;
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.startX = event.clientX - rect.left;
    this.startY = event.clientY - rect.top;

    // Clear temporary selection
    this.tempSelection = null;
    this.clearCanvas();
    this.drawImage(); // Redraw the image first
    this.drawSelections();
    this.drawTempSelection();
    // this.drawTempCircle();
  }

  onCanvasMouseMove(event: MouseEvent): void {
    if (!this.isDrawing) return;

    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.currentX = event.clientX - rect.left;
    this.currentY = event.clientY - rect.top;

    // Create a temporary selection object
    this.tempSelection = {
      x: this.startX,
      y: this.startY,
      width: this.currentX - this.startX,
      height: this.currentY - this.startY,
      fillStyle: 'rgba(255, 255, 0, 0.3)', // Semi-transparent fill
      strokeStyle: 'red'
    };

    // Redraw the image and selections
    this.clearCanvas();
    this.drawImage(); // Redraw the image first
    this.drawSelections();
    this.drawTempSelection();
    // this.drawTempCircle();

  }

  onCanvasMouseUp(): void {
    if (!this.isDrawing) return;

    this.isDrawing = false;

    // Temporary selection is kept but not saved until 'saveSelections' is called
  }

  // Function to clear the canvas
  clearCanvas(): void {
    this.ctx?.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  // Function to draw all permanent selections
  drawSelections(): void {
    this.selections.forEach(selection => {
      if (selection) {
        this.ctx!.fillStyle = selection.fillStyle;
        this.ctx!.strokeStyle = selection.strokeStyle;
        this.ctx!.lineWidth = 2;

        // Draw the permanent selection on the canvas
        this.ctx!.fillRect(selection.x, selection.y, selection.width, selection.height);
        this.ctx!.strokeRect(selection.x, selection.y, selection.width, selection.height);
      }
    });
  }

  // Function to draw the temporary selection
  drawTempSelection(): void {
    if (this.tempSelection) {
      this.ctx!.fillStyle = this.tempSelection.fillStyle;
      this.ctx!.strokeStyle = this.tempSelection.strokeStyle;
      this.ctx!.lineWidth = 2;

      // Draw the temporary selection on the canvas
      this.ctx!.fillRect(this.tempSelection.x, this.tempSelection.y, this.tempSelection.width, this.tempSelection.height);
      this.ctx!.strokeRect(this.tempSelection.x, this.tempSelection.y, this.tempSelection.width, this.tempSelection.height);
    }
  }

  drawTempCircle(): void {
    if (this.tempSelection) {
      this.ctx!.fillStyle = this.tempSelection.fillStyle;
      this.ctx!.strokeStyle = this.tempSelection.strokeStyle;
      this.ctx!.lineWidth = 2;
  
      const radius = Math.sqrt(Math.pow(this.tempSelection.width, 2) + Math.pow(this.tempSelection.height, 2)) / 2;
      const centerX = this.tempSelection.x + this.tempSelection.width / 2;
      const centerY = this.tempSelection.y + this.tempSelection.height / 2;
  
      this.ctx!.beginPath();
      this.ctx!.arc(centerX, centerY, radius, 0, Math.PI * 2);
      this.ctx!.closePath();
      this.ctx!.fill();
      this.ctx!.stroke();
    }
  }
  

  // Function to save the current temporary selection to the permanent list
  saveSelections(): void {
    if (this.tempSelection) {
      // Find the first available null spot or replace the last selection if the array is full
      const availableIndex = this.selections.findIndex(sel => sel === null);
      if (availableIndex !== -1) {
        this.selections[availableIndex] = this.tempSelection; // Insert at the available index
        console.log("saved Hotspot" , availableIndex + 1);
      } else {
       console.log("Cannot Save, MAX 10");
      }
      this.tempSelection = null;
    }
    this.clearCanvas();
    this.drawImage(); // Redraw the image first
    this.drawSelections(); // Redraw everything
    // console.log('Saved Selections:', this.selections);
  }

  // Function to delete a selection by index
  // deleteSelection(index: number): void {
  //   if (index >= 0 && index < this.selections.length) {
  //     this.selections[index] = null; // Set the selection at the specified index to null
  //     this.clearCanvas();
  //     this.drawImage(); // Redraw the image first
  //     this.drawSelections(); // Redraw everything
  //     console.log(`Deleted selection at index ${index}`);
  //   }
  // }

  // Function to draw the image on the canvas
  drawImage(): void {
    if (this.image) {
      this.ctx?.drawImage(this.image, 10, 10, this.canvas.nativeElement.width - 20, this.canvas.nativeElement.height - 10);
    }
  }

  // Update: Clear selections when a new image is loaded, even if it's the same image
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      // Always reset selections, even if the image is the same
      this.selections = new Array(10).fill(null); // Clear previous selections and set array size to 10
      this.tempSelection = null; // Clear temporary selections
      this.clearCanvas(); // Clear the canvas

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.image = new Image();
        this.image.onload = () => {
          // Draw the new image (or the same image) on the canvas
          this.drawImage();
        };
        this.image.src = e.target?.result as string; // Set the source of the image
      };
      reader.readAsDataURL(file); // Convert the image file to base64 URL
    }
  }
}
