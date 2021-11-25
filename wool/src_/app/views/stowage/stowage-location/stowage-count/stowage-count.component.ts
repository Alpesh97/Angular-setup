import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreHelperService } from 'src/app/providers/core-helper/core-helper.service';

@Component({
  selector: 'app-stowage-count',
  templateUrl: './stowage-count.component.html',
  styleUrls: ['./stowage-count.component.scss']
})
export class StowageCountComponent implements OnInit {
  @ViewChild('count') private countEle: ElementRef;
  public blaseNumber: number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { maximumAllowedCount: number, availableCount: number },
    public dialogRef: MatDialogRef<StowageCountComponent>,
    private coreHelperService: CoreHelperService) { }

  ngOnInit(): void {
  }

  onSubmit = () => {
    if (this.blaseNumber < 0) {
      this.coreHelperService.openErrorToaster("Please add valid count");
      return
    }
    if (this.blaseNumber > this.data.availableCount) {
      this.coreHelperService.openErrorToaster(this.data.availableCount + " count is available");
      return
    }
    if (this.blaseNumber > this.data.maximumAllowedCount) {
      this.coreHelperService.openErrorToaster("Enter Maximum " + this.data.maximumAllowedCount + " count");
      return;
    }
    this.dialogRef.close(this.blaseNumber);
  }

  onCancel = () => {
    this.dialogRef.close(null);
  }

  ngAfterViewInit(): void {
    this.countEle.nativeElement.select();
  }
}
