import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReceivalAdviceModal, ReceivalResponseModal, ReceivalAdviceRequestModal, ReceivalResponseIdModal } from 'src/app/models/receival.model';
import { ReceivalService } from 'src/app/services/receival.service';
import { CoreHelperService } from 'src/app/providers/core-helper/core-helper.service';

@Component({
  selector: 'app-submit-popup',
  templateUrl: './submit-popup.component.html',
  styleUrls: ['./submit-popup.component.scss']
})
export class SubmitPopupComponent {

  public receivalAdviceData: ReceivalAdviceModal = new ReceivalAdviceModal();
  public isPrint: boolean;
  public isEmail: boolean;
  public isSMS: boolean;

  constructor(
    public dialogRef: MatDialogRef<SubmitPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReceivalResponseModal,
    private receivalService: ReceivalService,
    private coreHelperService: CoreHelperService
  ) {
    if (!this.coreHelperService.isStringEmptyOrWhitespace(this.data.email)) {
      this.receivalAdviceData.email = this.data.email;
    }
    if (!this.coreHelperService.isNullOrUndefined(this.data.mobileNumber)) {
      this.receivalAdviceData.phoneNumber = this.data.mobileNumber.toString();
    }
  }

  onSubmit = () => {
    if (!this.isPrint && !this.isEmail && !this.isSMS) {
      this.coreHelperService.openErrorToaster("Please select the option")
      return;
    } else if (this.isEmail && this.coreHelperService.isStringEmptyOrWhitespace(this.receivalAdviceData.email)) {
      this.coreHelperService.openErrorToaster("Please enter email address");
      return;
    } else if (this.isSMS && this.coreHelperService.isStringEmptyOrWhitespace(this.receivalAdviceData.phoneNumber)) {
      this.coreHelperService.openErrorToaster("Please enter phone number");
      return;
    }

    this.receivalService.getReceivalAdvise(this.setReceivalAdviceRequestModal(this.receivalAdviceData, this.data)).subscribe((response) => {
      if (!response["response"]) {
        this.coreHelperService.openErrorToaster(response["message"]);
        return;
      }
      this.coreHelperService.openSuccessToaster(response["message"]);
      this.dialogRef.close();
    });
  }

  doCancel = () => {

    this.receivalService.getReceivalAdviceCancel(this.setReceivalAdviceRequestModal(this.receivalAdviceData, this.data)).subscribe((response) => {
      if (!response["response"]) {
        return;
      }

      this.dialogRef.close();
    });
  }

  private setReceivalAdviceRequestModal = (receivalAdviceModalData: ReceivalAdviceModal, addReceivalResponseData: ReceivalResponseModal): ReceivalAdviceRequestModal => {
    let request: ReceivalAdviceRequestModal = {
      id: addReceivalResponseData.id,
      email: this.isEmail ? receivalAdviceModalData.email : "",
      phoneNumber: this.isSMS ? receivalAdviceModalData.phoneNumber : "",
      printReceivalAdvice: this.isPrint ? "Y" : "N",
      receivalAdvicePdfLink: addReceivalResponseData.pdfLink,
      ...addReceivalResponseData.inputReceivalAdvice
    };
    return request;
  }
}
