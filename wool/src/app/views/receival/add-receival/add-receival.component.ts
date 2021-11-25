import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  BrandDetails,
  BrandRequestModal,
  BrandResponseModal,
  BrokerRequestModal,
  BrokerResponseModal,
  Carrier,
  CarrierRequestModal,
  CarrierResponseModal,
  CommentResponseModal,
  QualitySchemeResponseModal,
  ReceivalRequestModal,
} from 'src/app/models/receival.model';
import { CoreHelperService } from 'src/app/providers/core-helper/core-helper.service';
import { CoreStorageDataService } from 'src/app/providers/core-storage/core-storage-data.service';
import { ReceivalService } from 'src/app/services/receival.service';

import { AddBagComponent } from './add-bag/add-bag.component';
import { SubmitPopupComponent } from './submit-popup/submit-popup.component';
import { UnknownBrandComponent } from './unknown-brand/unknown-brand.component';


@Component({
  selector: 'add-receival.component',
  templateUrl: './add-receival.component.html',
  styleUrls: ['./add-receival.component.scss']
})
export class AddReceivalComponent implements OnInit {

  public isShowOtherComment: boolean;
  public brokerList: Array<BrokerResponseModal> = [];
  public brandList: Array<BrandResponseModal> = [];
  public carrierList: Array<Carrier> = [];
  public qualitySchemeList: Array<QualitySchemeResponseModal> = [];
  public commentList: Array<CommentResponseModal> = [];
  public otherComment: string;

  private selectedBrand: BrandResponseModal = new BrandResponseModal();
  public selectedBrokerId: string = "";
  private selectedBroker: BrokerResponseModal = new BrokerResponseModal();
  private selectedCarrier: CarrierResponseModal = new CarrierResponseModal();
  public selectedQualitySchemes: string = "None";

  public classerStencil: string;
  public actualCount: number;
  public bags: number;
  public classReportAttached: boolean;
  public receivalForm: FormGroup;

  public mode = "indeterminate";
  public isBrandLoader: boolean = false;
  public isCarrierLoader: boolean = false;
  public isClickedToSubmit: boolean = false;

  private brandApiCount: number = 0;
  private carrierApiCount: number = 0;
  public brandInputText: string = '';
  public carrierInputText: string = '';

  constructor(public matDialog: MatDialog,
    private receivalService: ReceivalService,
    private formBuilder: FormBuilder,
    private coreHelperService: CoreHelperService,
    private coreStorageDataService: CoreStorageDataService,
    private router: Router) {
    this.qualitySchemeList = [];
    this.qualitySchemeList.push({ qualitySchemeDesc: "None", changed: "", id: null, clipPreparationWiCode: "None", idPk: null, printRegistration: "", qualitySchemeShortName: "", registrationRequired: "" })
    this.getCommentsList();
    this.formInitializer();
    this.onChangeBrokerSearch();
    this.brandList.push({ clipBrand: "UNKNWN", brand: null, clientAccountDetails: null, isBold: false });
  }

  ngOnInit(): void {
    this.coreStorageDataService.setCustomHeader("Wool Receival");
  }

  private formInitializer = () => {
    this.receivalForm = this.formBuilder.group({
      brokerIdKey: [null, Validators.required],
      clipBrand: [null, Validators.required],
      carrierName: [null, Validators.required],
      classerStencil: [null, Validators.compose([Validators.maxLength(6), Validators.minLength(6)])],
      actualCount: [null, Validators.compose([Validators.required, Validators.min(0)])],
      qualitySchemes: [""],
      comment: [null],
      otherComment: [null],
      classReportAttached: [false],
      bags: [0]
    });
  }

  openSubmitDialog = () => {

    if (this.coreHelperService.isNullOrUndefined(this.carrierList.find(c => c.carrierName === this.selectedCarrier.carrierName))) {
      this.setNewCarrierData();
    }

    if (this.receivalForm.invalid) {
      this.isClickedToSubmit = true;
      return;
    }

    this.receivalService.addReceival(this.setAddReceivalRequestModal()).subscribe((response) => {
      if (!response["response"]) {
        if (response["data"] === "classerStencil") {
          this.receivalForm.controls.classerStencil.setErrors({ 'incorrect': true });
          return;
        }
        if (response["data"] === "receivalCarrier") {
          this.isClickedToSubmit = true;
          this.receivalForm.controls.carrierName.setErrors({ 'incorrect': true });
          return;
        }
        this.coreHelperService.openErrorToaster(response["message"]);
        return;
      }
      this.coreHelperService.openSuccessToaster(response["message"]);
      const dialogRef = this.matDialog.open(SubmitPopupComponent, { panelClass: 'custom-popup', data: response["data"], disableClose: true });
      dialogRef.afterClosed().subscribe(() => {

        this.router.navigateByUrl("**");
      });
    });
  }

  private setNewBrandData = () => {
    if (!this.coreHelperService.isNullOrUndefined(this.selectedBrand.brand)) {
      this.receivalForm.controls.clipBrand.setValue(this.selectedBrand.brand.clipBrand);
      this.selectedBrand.brand.clipCodeKey = "";
      this.selectedBrand.brand.woolNumberKey = "UNKNWN";
    }
  }

  private setNewCarrierData = () => {
    if (!this.coreHelperService.isNullOrUndefined(this.selectedCarrier)) {
      this.receivalForm.controls.carrierName.setValue(this.selectedCarrier.carrierName);
      this.selectedCarrier.receivalCarrierSgt = 0;
    }
  }

  private setAddReceivalRequestModal = (): ReceivalRequestModal => {
    let data = new ReceivalRequestModal({
      actualCount: this.receivalForm.controls.actualCount.value,
      numberOfBags: this.receivalForm.controls.bags.value,
      brokerIdKey: this.receivalForm.controls.brokerIdKey.value,
      stateCodeKey: this.selectedBroker.stateCodeKey,
      centreCodeKey: this.selectedBroker.centreCodeKey,
      clipBrand: this.receivalForm.controls.clipBrand.value,
      clipCodeKey: this.selectedBrand.brand.clipCodeKey,
      woolNumberKey: this.selectedBrand.brand.woolNumberKey,
      carrierName: this.receivalForm.controls.carrierName.value,
      receivalCarrierSgt: this.selectedCarrier.receivalCarrierSgt.toString(),
      receivedByUser: this.coreStorageDataService.getUserName(),
      classerRegistrationNbr: this.receivalForm.controls.classerStencil.value,
      classerSpecReceived: this.receivalForm.controls.classReportAttached.value,
      qualityScheme: this.selectedQualitySchemes !== "None" ? this.receivalForm.controls.qualitySchemes.value : "",
      comment: this.receivalForm.controls.comment.value === "Other" ? this.receivalForm.controls.otherComment.value : this.receivalForm.controls.comment.value,
      receivalCentreCode: this.selectedBroker.receivalCentreCode
    });
    return data;
  }

  openBagDialog = () => {
    const dialogRef = this.matDialog.open(AddBagComponent,
      { panelClass: 'custom-popup', data: this.receivalForm.controls.bags.value, autoFocus: false }
    );
    dialogRef.afterClosed().subscribe((response) => {
      if (this.coreHelperService.isNullOrUndefined(response)) {
        this.receivalForm.controls.bags.setValue(0);
        return;
      }
      this.receivalForm.controls.bags.setValue(response);
    });
  }

  onChangeBrokerSearch = () => {
    let brokerRequestModal = new BrokerRequestModal({ search: "", receivalCentreCode: this.coreStorageDataService.getCentreCode(), pageNo: 0 })
    this.receivalService.getBrokerBySearch(brokerRequestModal).subscribe((response) => {
      if (response["response"]) {
        this.brokerList = response["data"] as Array<BrokerResponseModal>;
      } else {
        this.coreHelperService.openErrorToaster(response["message"]);
      }
    });
  }

  onChangeBrandSearch = (data: string) => {
    this.brandInputText = data;
    if (!this.coreHelperService.isStringEmptyOrWhitespace(data)) {
      this.brandInputText = this.brandInputText.toUpperCase();
    }
    this.selectedBrand = new BrandResponseModal();
    this.selectedBrand.brand = new BrandDetails();
    this.selectedBrand.brand.clipBrand = data;
    this.selectedBrand.clipBrand = data;
    this.receivalForm.controls.clipBrand.setValue(null);
    
    if (data.length > 2) {
      this.isBrandLoader = true;
      this.brandApiCount++;
      let brandRequestModal = new BrandRequestModal({ clipBrand: data, brokerIdKey: this.selectedBroker.brokerIdKey, stateCodeKey: this.coreStorageDataService.getStateCode(), centreCodeKey: this.selectedBroker.centreCodeKey })
      this.receivalService.getBranchByBrokerId(brandRequestModal).subscribe((response) => {
        if (response["response"]) {
          this.brandList = [];
          this.brandList = Object.assign([], response["data"]);
          this.brandList.push({ clipBrand: "UNKNWN", brand: null, clientAccountDetails: null, isBold: false });
        } else {
          this.coreHelperService.openErrorToaster(response["message"]);
        }
        this.brandApiCount--;
        this.isBrandLoader = this.brandApiCount !== 0;
      });
    }
  }

  onChangeCarrierSearch = (data: string) => {
    this.selectedCarrier = new CarrierResponseModal();
    this.selectedCarrier.carrierName = data;
    this.receivalForm.controls.carrierName.setValue(data);
    if (data.length > 2) {
      this.isCarrierLoader = true;
      this.carrierList = [];
      this.carrierApiCount++;
      let carrierRequestModal = new CarrierRequestModal({ carrierName: data, centreCodeKey: this.selectedBroker.centreCodeKey })
      this.receivalService.getCarrierByName(carrierRequestModal).subscribe((response) => {
        if (response["response"]) {
          this.carrierList = response["data"] as Array<CarrierResponseModal>;
        } else {
          this.coreHelperService.openErrorToaster(response["message"]);
        }
        this.carrierApiCount--;
        this.isCarrierLoader = this.carrierApiCount !== 0;
      });
    }
  }

  onChangeQualitySchemesSearch = (data: string) => {
    this.receivalForm.controls.qualitySchemes.setValue(null);
  }

  onChangeCommentSearch = (data: string) => {
    this.isShowOtherComment = false;
  }

  getQualitySchemes = () => {
    this.receivalService.getQualitySchemes(this.receivalForm.controls.brokerIdKey.value).subscribe((response) => {
      if (response["response"]) {
        this.qualitySchemeList = [];
        this.qualitySchemeList.push({ qualitySchemeDesc: "None", changed: "", id: null, clipPreparationWiCode: "None", idPk: null, printRegistration: "", qualitySchemeShortName: "", registrationRequired: "" })
        this.receivalForm.controls.qualitySchemes.setValue("");
        this.qualitySchemeList.push(...response["data"] as Array<QualitySchemeResponseModal>);
      } else {
        this.coreHelperService.openErrorToaster(response["message"]);
      }
    });
  }

  getCommentsList = () => {
    this.receivalService.getComments().subscribe((response) => {
      if (response["response"]) {
        this.commentList = response["data"] as Array<CommentResponseModal>;
        this.commentList.push({ id: -1, comment: "OTHER" });
      } else {
        this.coreHelperService.openErrorToaster(response["message"]);
      }
    })
  }

  selectEvent = (type: string, data) => {
    switch (type) {
      case "qualitySchemes":
        this.receivalForm.controls.qualitySchemes.setValue(this.selectedQualitySchemes);
        break;
      case "carrier":
        this.isCarrierLoader = false;
        this.receivalForm.controls.carrierName.setValue(data.carrierName);
        this.selectedCarrier = data;
        break;
      case "brand":
        this.isBrandLoader = false;
        this.selectedBrand = new BrandResponseModal();
        this.selectedBrand.brand = new BrandDetails();
        this.receivalForm.controls.clipBrand.setValue(data.clipBrand);
        this.selectedBrand.brand.clipBrand = data.clipBrand;
        this.selectedBrand.brand = data.brand;
        this.selectedBrand.clientAccountDetails = data.clientAccountDetails;
        this.selectedBrand.clipBrand = data.clipBrand;
        if (data.clipBrand.toLowerCase() === "unknwn") {
          const dialogRef = this.matDialog.open(UnknownBrandComponent,
            { panelClass: 'custom-popup', autoFocus: false }
          );
          dialogRef.afterClosed().subscribe((response) => {
            this.selectedBrand = new BrandResponseModal();
            this.selectedBrand.brand = new BrandDetails();
            if (this.coreHelperService.isStringEmptyOrWhitespace(response)) {
              this.receivalForm.controls.clipBrand.setValue("");
              this.brandInputText = "";
              return;
            }
            this.receivalForm.controls.clipBrand.setValue(response);
            this.selectedBrand.brand["clipBrand"] = response;
            this.selectedBrand.clipBrand = data.response;
            this.selectedBrand.brand["clipCodeKey"] = "";
            this.selectedBrand.brand["woolNumberKey"] = "AA0001";
          });
        }
        break;
      case "broker":
        this.selectedBroker = this.brokerList.find(b => b.id === Number(this.selectedBrokerId));
        this.receivalForm.controls.brokerIdKey.setValue(this.selectedBroker.brokerIdKey);
        this.receivalForm.controls.clipBrand.setValue("");
        this.receivalForm.controls.carrierName.setValue("");
        this.selectedBrand = new BrandResponseModal();
        this.selectedCarrier = new CarrierResponseModal();
        this.brandInputText = '';
        this.carrierInputText = '';
        this.brandList = [];
        this.brandList.push({ clipBrand: "UNKNWN", brand: null, clientAccountDetails: null, isBold: false });
        this.carrierList = [];
        this.getQualitySchemes();
        break;
      case "comment":
        this.receivalForm.controls.comment.setValue(data.comment);
        this.isShowOtherComment = false;
        if (data.id === -1) {
          this.isShowOtherComment = true;
        }
        break;
    }
  }
}
