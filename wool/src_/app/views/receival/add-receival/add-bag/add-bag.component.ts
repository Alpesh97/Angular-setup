import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreHelperService } from 'src/app/providers/core-helper/core-helper.service';

@Component({
  selector: 'app-add-bag',
  templateUrl: './add-bag.component.html',
  styleUrls: ['./add-bag.component.scss']
})
export class AddBagComponent {
  @ViewChild('addBag') private addBagEle: ElementRef;
  public bags: number;
  constructor(
    public dialogRef: MatDialogRef<AddBagComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private coreHelperService: CoreHelperService
  ) {
    this.bags = this.data;
  }

  ngAfterViewInit(): void {
    this.addBagEle.nativeElement.select();
  }
  
  public closeModel = () => {
    if (this.bags < 0) {
      this.coreHelperService.openErrorToaster("Please Enter Valid Bale Number");
      return;
    }
    this.dialogRef.close(this.bags);
  }
}
