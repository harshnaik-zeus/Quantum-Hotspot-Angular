import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-image-canvas',
  templateUrl: './image-canvas.component.html',
  styleUrls: ['./image-canvas.component.scss']
})
export class ImageCanvasComponent implements OnInit, AfterViewInit {

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D | null;

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    // Ensure that canvas context is retrieved after view initialization
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

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const img = new Image();
        img.onload = () => {
          // Clear the canvas before drawing the new image
          this.ctx?.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
          // Draw the uploaded image on the canvas
          this.ctx?.drawImage(img, 10, 10, this.canvas.nativeElement.width - 20, this.canvas.nativeElement.height - 10);
        };
        img.src = e.target?.result as string; // Set the source of the image
      };
      reader.readAsDataURL(file); // Convert the image file to base64 URL
    }
  }
}
