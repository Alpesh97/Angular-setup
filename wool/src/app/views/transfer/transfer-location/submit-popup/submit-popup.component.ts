import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-submit-popup',
  templateUrl: './submit-popup.component.html',
  styleUrls: ['./submit-popup.component.scss']
})
export class SubmitPopupComponent implements OnInit {

  constructor(public router: Router,
    public dialogRef: MatDialogRef<SubmitPopupComponent>,) { }

  ngOnInit(): void {
  }

  goToStowage = () => {
    this.router.navigate(["./transfer"]);
    this.dialogRef.close();
  }

}
