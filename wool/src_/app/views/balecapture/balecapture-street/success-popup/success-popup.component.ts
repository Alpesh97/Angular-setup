import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoreStorageDataService } from 'src/app/providers/core-storage/core-storage-data.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.scss']
})
export class SuccessPopupComponent implements OnInit, OnDestroy {


  constructor(public router: Router,
    public dialogRef: MatDialogRef<SuccessPopupComponent>,
    private coreStorageDataService: CoreStorageDataService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.coreStorageDataService.setCustomHeader("");
  }

  goToBalecapture = () => {
    this.router.navigate(["./balecapture"]);
    this.dialogRef.close();
  }

}
