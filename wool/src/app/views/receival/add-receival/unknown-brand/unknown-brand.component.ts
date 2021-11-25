import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-unknown-brand',
  templateUrl: './unknown-brand.component.html',
  styleUrls: ['./unknown-brand.component.scss']
})
export class UnknownBrandComponent implements OnInit {
  brand: string;
  constructor(public dialogRef: MatDialogRef<UnknownBrandComponent>,) { }

  ngOnInit(): void {
  }

  public closeModel = () => {
    debugger
    this.dialogRef.close(this.brand);
  }

}
