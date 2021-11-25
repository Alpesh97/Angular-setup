import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  BalecaptureDiscrepancyResponseModal,
  BalecaptureResponseModal,
  BalesListModal,
  BalesModal,
  SubmitBalecaptureRequestModal,
  WoolBaleNumberRequestModal,
  WoolBaleNumberResponseModal,
  WoolTypeRequestModal,
  WoolTypeResponseModal,
  SaveBaleRequestModal,
} from 'src/app/models/baleCapture.model';
import { CoreHelperService } from 'src/app/providers/core-helper/core-helper.service';
import { CoreStorageDataService } from 'src/app/providers/core-storage/core-storage-data.service';
import { BalecaptureService } from 'src/app/services/balecapture.service';

import { SuccessPopupComponent } from './success-popup/success-popup.component';


@Component({
  selector: 'app-balecapture-street',
  templateUrl: './balecapture-street.component.html',
  styleUrls: ['./balecapture-street.component.scss']
})
export class BalecaptureStreetComponent implements OnInit {
  public showFooter = true;
  public discrepency: boolean;
  public balecaptureData: BalecaptureResponseModal;
  private permanentFillBaleNumberList: Array<WoolBaleNumberResponseModal> = [];
  private temporaryFillBaleNumberList: Array<WoolBaleNumberResponseModal> = [];
  public totalBaleCount: number = 0;
  public discrepancyList: Array<BalecaptureDiscrepancyResponseModal> = [];
  private pageNumber: number = 0;
  public searchWoolType: string = "";
  public woolTypeList: Array<WoolTypeResponseModal> = [];
  public baleList: Array<BalesListModal> = [];
  public selectedBale: BalesListModal = { baleDescriptionKey: "", baleNumberKey: "", bisStatisticType: "", isPermanentFill: false, isSelected: false, isTemporaryFill: false, isShowTooltip: false, tooltipPosition: "" };
  public temporaryFillBaleCount: number = 0;
  private brokerName: string;
  private searchCharacterCount: number = 0;
  public isSearchLoader: boolean = false;
  public originalTotalCount: number = 0


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setScreenWiseData();
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event) {
    this.setScreenWiseData();
  }

  constructor(public coreHelperService: CoreHelperService,
    private changeDetector: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router,
    private balecaptureService: BalecaptureService,
    private coreStorageDataService: CoreStorageDataService) {

    if (this.coreHelperService.isNullOrUndefined(this.router.getCurrentNavigation().extras.state)) {
      this.router.navigateByUrl("balecapture");
      return;
    }
    this.balecaptureData = this.router.getCurrentNavigation().extras.state["rowData"] as BalecaptureResponseModal;
    this.originalTotalCount = Number(this.balecaptureData.locationItemCount);
    this.totalBaleCount = Number(this.balecaptureData.locationItemCount);
    this.brokerName = this.balecaptureData.brokerName;
    this.coreStorageDataService.setCustomHeader(this.brokerName + " - " + this.temporaryFillBaleCount + " OF " + this.totalBaleCount);

    this.setScreenWiseData();
    this.setDefaultBaleList(1, 100);
    this.getBalesNumber();
    this.getDiscrepancyList();
    this.getWoolType();
  }

  private getBalesNumber = () => {
    let woolNumberRequestModal: WoolBaleNumberRequestModal = {
      brokerIdKey: this.balecaptureData.brokerKeyId,
      clipCodeKey: this.balecaptureData.clipCodeKey,
      woolNumberKey: this.balecaptureData.woolNumberKey,
      receivalCentreCode: this.balecaptureData.receivalCentreCode,
      stateCodeKey: this.coreStorageDataService.getStateCode(),
      locationItemSurrogate: this.balecaptureData.locationItemSurrogate
    };

    this.balecaptureService.getWoolBaleNumberList(woolNumberRequestModal).subscribe(response => {

      if (!response["response"]) {
        this.coreHelperService.openErrorToaster(response["message"]);
        return;
      }

      this.permanentFillBaleNumberList = response["data"]["submittedBales"];
      this.temporaryFillBaleNumberList = response["data"]["tempBales"];
      if (!this.coreHelperService.isArrayEmpty(this.baleList)) {
        if (this.permanentFillBaleNumberList.length > 0) {
          let maxCount = Number(this.permanentFillBaleNumberList[this.permanentFillBaleNumberList.length - 1].baleNumberKey);
          if (maxCount > 100) {
            this.setDefaultBaleList(1, maxCount);
          }
        }

        this.baleList.forEach(item => {
          if (!this.coreHelperService.isNullOrUndefined(this.permanentFillBaleNumberList.find(p => Number(p.baleNumberKey) === Number(item.baleNumberKey)))) {
            item.isPermanentFill = true;
          }
          const tempData = this.temporaryFillBaleNumberList.find(p => Number(p.baleNumberKey) === Number(item.baleNumberKey));
          if (!this.coreHelperService.isNullOrUndefined(tempData)) {
            this.temporaryFillBaleCount++;
            item.isTemporaryFill = true;
            item.id = tempData.id;
            item.bisStatisticType = tempData.bisStatisticType;
            item.baleDescriptionKey = tempData.baleDescriptionKey;
            this.coreStorageDataService.setCustomHeader(this.brokerName + " - " + this.temporaryFillBaleCount + " OF " + this.totalBaleCount);
          }
        });
      }
    });

  }

  ngOnInit(): void {
  }

  openSuccessDialog() {
    if (this.temporaryFillBaleCount != this.totalBaleCount) {
      return;
    }



    let submitBaleCapture: SubmitBalecaptureRequestModal = {
      brokerIdKey: this.balecaptureData.brokerKeyId,
      clipCodeKey: this.balecaptureData.clipCodeKey,
      woolNumberKey: this.balecaptureData.woolNumberKey,
      receivalCentreCode: this.balecaptureData.receivalCentreCode,
      stateCodeKey: this.coreStorageDataService.getStateCode(),
      locationItemSurrogate: this.balecaptureData.locationItemSurrogate.toString()
    };

    const temporaryFillData = this.baleList.filter(b => b.isTemporaryFill || b.isSelected);
    const lastSelectedRecord = temporaryFillData.find(t => this.coreHelperService.isNullOrUndefined(t.id));
    if (!this.coreHelperService.isNullOrUndefined(lastSelectedRecord)) {
      this.selectedBale = lastSelectedRecord;
      this.balecaptureService.saveBale(this.getBaleRequestModalData()).subscribe((response) => {
        if (!response["response"]) {
          this.coreHelperService.openErrorToaster(response["message"]);
          return;
        }
        this.baleList.forEach(item => {
          if (item.baleNumberKey === this.selectedBale.baleNumberKey) {
            item.id = response["data"]["id"];
            item.isTemporaryFill = true;
            item.isSelected = false;
            item.isPermanentFill = false;
            this.selectedBale = { baleDescriptionKey: "", baleNumberKey: "", bisStatisticType: "", isPermanentFill: false, isSelected: false, isTemporaryFill: false, isShowTooltip: false, tooltipPosition: "" };
          }
        });
        this.coreHelperService.openSuccessToaster(response["message"]);
        this.finalSubmitBale(submitBaleCapture);
      });
    } else {
      this.finalSubmitBale(submitBaleCapture);
    }


  }

  private finalSubmitBale = (submitBaleCapture: SubmitBalecaptureRequestModal) => {
    this.balecaptureService.submitBaleCapture(submitBaleCapture).subscribe(response => {
      if (!response["response"]) {
        this.coreHelperService.openErrorToaster(response["message"]);
        return;
      }
      const dialogRef = this.dialog.open(SuccessPopupComponent, { panelClass: 'custom-popup', disableClose: true });
    });
  }

  private getDiscrepancyList = () => {
    this.balecaptureService.getDiscrepancyList({ brokerIdKey: this.balecaptureData.brokerKeyId, pageNo: 0 }).subscribe(response => {
      if (!response["response"]) {
        this.coreHelperService.openErrorToaster(response["message"]);
        return;
      }
      this.discrepancyList = [];
      this.discrepancyList.push(...response["data"]);
    });
  }

  private setScreenWiseData = () => {
    this.showFooter = this.coreHelperService.checkIsDesktopScreen();
  }

  private getWoolType = () => {
    let woolTypeRequestModal: WoolTypeRequestModal = {
      brokerIdKey: this.balecaptureData.brokerKeyId,
      pageNo: this.pageNumber,
      pageSize: 25,
      search: this.searchWoolType,
      receivalCentreCode: this.balecaptureData.receivalCentreCode,
      stateCodeKey: this.coreStorageDataService.getStateCode()
    }
    this.isSearchLoader = true;
    this.balecaptureService.getWoolTypeList(woolTypeRequestModal).subscribe(response => {
      this.isSearchLoader = false;
      if (!response["response"]) {
        this.coreHelperService.openErrorToaster(response["message"]);
        return;
      }
      this.woolTypeList.push(...response["data"]);
      if (!this.coreHelperService.isStringEmptyOrWhitespace(this.selectedBale.baleNumberKey) && !this.coreHelperService.isStringEmptyOrWhitespace(this.searchWoolType)) {
        this.selectWoolType(this.woolTypeList[0]);
      }
      this.changeDetector.markForCheck();
    });
  }

  public onScroll = () => {
    this.pageNumber++;
    this.getWoolType();
  }

  public searchWoolTypeData = () => {
    if (this.searchWoolType.length >= 2) {
      this.searchCharacterCount++;
      setTimeout(() => {
        this.searchCharacterCount--;
        if (this.searchCharacterCount === 0) {
          this.pageNumber = 0;
          this.woolTypeList = [];
          this.getWoolType();
        }
      }, 1000);
    }
  }

  private setDefaultBaleList = (startIndex, endIndex) => {
    this.baleList = [];
    for (let index = startIndex; index <= endIndex; index++) {
      let bale: BalesListModal = { baleNumberKey: index.toString(), baleDescriptionKey: "", bisStatisticType: "", isPermanentFill: false, isTemporaryFill: false, isSelected: false, isShowTooltip: false, tooltipPosition: "" };
      this.baleList.push(bale);
    }
  }

  public selectBale = (bale: BalesListModal) => {
    if (bale.isSelected) {
      return;
    }

    this.baleList.forEach(item => item.isShowTooltip = false);
    if (this.totalBaleCount === this.temporaryFillBaleCount) {
      this.coreHelperService.openErrorToaster("Already Selected All Bales");
      return;
    }

    if (!this.coreHelperService.isStringEmptyOrWhitespace(this.selectedBale.baleNumberKey) &&
      this.coreHelperService.isNullOrUndefined(this.selectedBale.id) ||
      !this.coreHelperService.isStringEmptyOrWhitespace(this.selectedBale.baleDescriptionKey) ||
      !this.coreHelperService.isStringEmptyOrWhitespace(this.selectedBale.bisStatisticType)) {
      this.baleList.forEach(item => {
        if (item.baleNumberKey === this.selectedBale.baleNumberKey) {
          this.balecaptureService.saveBale(this.getBaleRequestModalData()).subscribe((response) => {
            if (!response["response"]) {
              this.coreHelperService.openErrorToaster(response["message"]);
              return;
            }
            this.coreHelperService.openSuccessToaster(response["message"]);
            item.id = response["data"]["id"];
            item.isTemporaryFill = true;
            item.isSelected = false;
            bale.isSelected = true;
            this.selectedBale = bale;
          });
        }
      });

    } else {
      this.baleList.forEach(item => {
        if (item.baleNumberKey === this.selectedBale.baleNumberKey) {
          item.isSelected = false;
        }
      });
      bale.isSelected = true;
      this.selectedBale = bale;
    }


    if (!this.coreHelperService.isStringEmptyOrWhitespace(this.searchWoolType)) {
      this.searchWoolType = "";
      this.pageNumber = 0;
      this.woolTypeList = [];
      this.getWoolType();
    }
  }

  private getBaleRequestModalData = (): SaveBaleRequestModal => {
    return {
      addOrRemove: "ADD",
      receivalCentreCode: this.balecaptureData.receivalCentreCode,
      stateCodeKey: this.coreStorageDataService.getStateCode(),
      baleDescriptionKey: this.selectedBale.baleDescriptionKey,
      baleNumberKey: this.selectedBale.baleNumberKey,
      bisStatisticType: this.selectedBale.bisStatisticType,
      brokerIdKey: this.balecaptureData.brokerKeyId,
      clipCodeKey: this.balecaptureData.clipCodeKey,
      locationItemSurrogate: this.balecaptureData.locationItemSurrogate.toString(),
      woolNumberKey: this.balecaptureData.woolNumberKey
    }
  }

  public selectWoolType = (woolType: WoolTypeResponseModal) => {
    if (this.coreHelperService.isStringEmptyOrWhitespace(this.selectedBale.baleNumberKey)) {
      this.coreHelperService.openErrorToaster("Please Select Wool Desc");
      return;
    }
    this.baleList.forEach(item => {
      if (item.baleNumberKey === this.selectedBale.baleNumberKey) {
        if (this.coreHelperService.isStringEmptyOrWhitespace(item.baleDescriptionKey)) {
          this.temporaryFillBaleCount++;
        }
        item.baleDescriptionKey = woolType.baleDescriptionKey;
        this.selectedBale.baleDescriptionKey = woolType.baleDescriptionKey;
        this.coreStorageDataService.setCustomHeader(this.brokerName + " - " + this.temporaryFillBaleCount + " OF " + this.totalBaleCount);
      }
    });
  }

  public selectDiscrepancy = (discrepancy: BalecaptureDiscrepancyResponseModal) => {
    if (this.coreHelperService.isStringEmptyOrWhitespace(this.selectedBale.baleNumberKey)) {
      this.coreHelperService.openErrorToaster("Please Select Bale");
      return;
    }
    if (this.coreHelperService.isStringEmptyOrWhitespace(this.selectedBale.baleDescriptionKey)) {
      this.coreHelperService.openErrorToaster("Please Select Wool Desc");
      return;
    }
    this.discrepancyList.forEach(item => {
      item.isSelected = item.bisStatisticType === discrepancy.bisStatisticType;
      this.selectedBale.bisStatisticType = discrepancy.bisStatisticType;
    });
  }

  public addNewBale = () => {
    for (let index = 0; index < 500; index++) {
      let bale: BalesListModal = {
        baleDescriptionKey: "",
        bisStatisticType: "",
        isPermanentFill: false,
        isSelected: false,
        isTemporaryFill: false,
        isShowTooltip: false,
        tooltipPosition: "",
        baleNumberKey: (this.baleList.length + 1).toString()
      }
      this.baleList.push(bale);
    }
  }

  public updateTotalBaleCount = (isAdded: boolean) => {
    if (isAdded) {
      if (this.originalTotalCount === this.totalBaleCount) {
        return;
      }
      this.totalBaleCount++;
    } else {
      if (this.totalBaleCount === 1) {
        return;
      }
      if (this.temporaryFillBaleCount === this.totalBaleCount) {
        return;
      }
      this.totalBaleCount--;
    }
    this.coreStorageDataService.setCustomHeader(this.brokerName + " - " + this.temporaryFillBaleCount + " OF " + this.totalBaleCount);
  }

  public resetAllTemporaryData = () => {
    this.totalBaleCount = Number(this.balecaptureData.locationItemCount);
    this.temporaryFillBaleCount = 0;
    this.selectedBale = { baleDescriptionKey: "", baleNumberKey: "", bisStatisticType: "", isPermanentFill: false, isSelected: false, isTemporaryFill: false, isShowTooltip: false, tooltipPosition: "" };
    this.setDefaultBaleList(1, 100);
    this.getBalesNumber();
    this.getDiscrepancyList();
    this.getWoolType();
  }

  public undoChanges = (baleItem: BalesListModal) => {
    let request: SaveBaleRequestModal = {
      addOrRemove: "REMOVE",
      receivalCentreCode: this.balecaptureData.receivalCentreCode,
      stateCodeKey: this.coreStorageDataService.getStateCode(),
      baleDescriptionKey: baleItem.baleDescriptionKey,
      baleNumberKey: baleItem.baleNumberKey,
      bisStatisticType: baleItem.bisStatisticType,
      brokerIdKey: this.balecaptureData.brokerKeyId,
      clipCodeKey: this.balecaptureData.clipCodeKey,
      locationItemSurrogate: this.balecaptureData.locationItemSurrogate.toString(),
      woolNumberKey: this.balecaptureData.woolNumberKey
    };
    this.balecaptureService.saveBale(request).subscribe((response) => {
      if (!response["response"]) {
        this.coreHelperService.openErrorToaster(response["message"]);
        return;
      }
      this.coreHelperService.openSuccessToaster(response["message"]);
      this.temporaryFillBaleCount--;
      this.coreStorageDataService.setCustomHeader(this.brokerName + " - " + this.temporaryFillBaleCount + " OF " + this.totalBaleCount);
      this.baleList.forEach(item => {
        if (item.baleNumberKey === baleItem.baleNumberKey) {
          item.isSelected = item.isPermanentFill = item.isTemporaryFill = false;
          item.bisStatisticType = item.baleDescriptionKey = "";
        }
        if (item.baleNumberKey === this.selectedBale.baleNumberKey &&
          this.selectedBale.baleNumberKey !== baleItem.baleNumberKey) {
          item.isSelected = item.isPermanentFill = false;
          item.isTemporaryFill = !this.coreHelperService.isStringEmptyOrWhitespace(this.selectedBale.baleDescriptionKey);
          item.bisStatisticType = this.selectedBale.bisStatisticType;
          item.baleDescriptionKey = this.selectedBale.baleDescriptionKey;
        }
      });
      this.selectedBale = { baleDescriptionKey: "", baleNumberKey: "", bisStatisticType: "", isPermanentFill: false, isSelected: false, isTemporaryFill: false, isShowTooltip: false, tooltipPosition: "" };
    });
  }

  public showTooltip = (baleItem: BalesListModal, event) => {
    const parentEl = document.getElementsByClassName("left-bale-block")[0];
    this.baleList.forEach(item => {
      item.tooltipPosition = "";
      if (item.baleNumberKey === baleItem.baleNumberKey) {
        if (event.clientX < 100) {
          item.tooltipPosition = "right-pos";
        }
        if (parentEl.clientWidth < (event.clientX + event.currentTarget.clientWidth + 10)) {
          item.tooltipPosition = "left-pos";
        }
        item.isShowTooltip = !item.isShowTooltip;
      } else {
        item.isShowTooltip = false;
      }
    });
  }

  public pauseBale = () => {
    const temporaryFillData = this.baleList.filter(b => b.isTemporaryFill || b.isSelected);
    const lastSelectedRecord = temporaryFillData.find(t => this.coreHelperService.isNullOrUndefined(t.id));
    if (!this.coreHelperService.isNullOrUndefined(lastSelectedRecord)) {
      this.selectedBale = lastSelectedRecord;
      this.balecaptureService.saveBale(this.getBaleRequestModalData()).subscribe((response) => {
        if (!response["response"]) {
          this.coreHelperService.openErrorToaster(response["message"]);
          return;
        }
        this.coreHelperService.openSuccessToaster(response["message"]);
        this.baleList.forEach(item => {
          if (item.baleNumberKey === this.selectedBale.baleNumberKey) {
            item.id = response["data"]["id"];
            item.isTemporaryFill = true;
            item.isSelected = false;
            item.isPermanentFill = false;
            this.selectedBale = { baleDescriptionKey: "", baleNumberKey: "", bisStatisticType: "", isPermanentFill: false, isSelected: false, isTemporaryFill: false, isShowTooltip: false, tooltipPosition: "" };
          }
        });
        this.pauseBaleSelection();
      });
    } else {
      this.pauseBaleSelection();
    }
  }

  private pauseBaleSelection = () => {
    this.balecaptureService.pauseBale(this.balecaptureData.locationItemSurrogate).subscribe((response) => {
      if (!response["response"]) {
        this.coreHelperService.openErrorToaster(response["message"]);
        return;
      }
      this.coreHelperService.openSuccessToaster(response["message"]);
      this.router.navigateByUrl('/balecapture');
      return;
    });
  }

  public cancelTemporaryBale = () => {
    this.balecaptureService.cancelTemporarySaveBales(this.balecaptureData.locationItemSurrogate).subscribe((response) => {
      if (!response["response"]) {
        this.coreHelperService.openErrorToaster(response["message"]);
        return;
      }
      this.coreHelperService.openSuccessToaster(response["message"]);
      this.router.navigateByUrl('/balecapture');
      return;
    });
  }
}