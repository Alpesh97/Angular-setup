import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'message.component',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

 

  constructor(
    public dialogRef: MatDialogRef<MessageComponent>
    
  ) {
    

  onsubmit = () => {
   return;
  }

  oncancel = () => {

    this.dialogRef.close();
}

}
}
