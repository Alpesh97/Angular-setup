import { ViewChild } from '@angular/core';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import {
  LocationItemModal,
  LocationListModal,
  StoweLocationResponseModal,
  SubmitStoweRequestModal,
  TransferBalesDialogRequestModal,
  TransferBalesDialogResponseModal,
  TransferResponseModal,
} from 'src/app/models/transfer.model';
import { CoreHelperService } from 'src/app/providers/core-helper/core-helper.service';
import { CoreStorageDataService } from 'src/app/providers/core-storage/core-storage-data.service';
import { TransferService } from 'src/app/services/transfer.service';

import { SubmitPopupComponent } from './submit-popup/submit-popup.component';
import { TransferBalesComponent } from './transfer-bales/transfer-bales.component';

@Component({
  selector: 'app-transfer-location',
  templateUrl: './transfer-location.component.html',
  styleUrls: ['./transfer-location.component.scss']
})
export class TransferLocationComponent implements OnInit {

  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }

  public showFooter: boolean = true;
  public transferLocationList: Array<StoweLocationResponseModal> = [];
  public balesCount: number;
  private updatedLocation: Array<LocationItemModal> = [];
  public addedBalesCount: number = 0;
  public search: string;
  private receivalCentreCode: string;
  private pageNumber: number = 0;
  public totalLength: number = 0;
  public clipBrand: string;
  public locationList: Array<{ name: string }> = [];
  private selectedLocationData: TransferResponseModal;
  private isSort: boolean = false;
  public isAutoCall: boolean = false;
  private clipBrandLocation: string = "";
  public isShowPagination: boolean = false;
  private isAutoRefresh: boolean = true;

  constructor(public router: Router, public dialog: MatDialog,
    public coreHelperService: CoreHelperService,
    private transferService: TransferService,
    private changeDetector: ChangeDetectorRef,
    private coreStorageDataService: CoreStorageDataService) {
    this.addedBalesCount = 0;
    this.pageNumber = 0;

    if (this.coreHelperService.isNullOrUndefined(this.router.getCurrentNavigation().extras.state)) {
      this.router.navigateByUrl("transfer");
      return;
    }

    this.selectedLocationData = this.router.getCurrentNavigation().extras.state["selectedLocationData"] as TransferResponseModal;
    this.balesCount = this.selectedLocationData.locationItemCount;
    this.receivalCentreCode = this.selectedLocationData.receivalCentreCode;
    this.clipBrand = this.router.getCurrentNavigation().extras.state["clipBrand"] as string;
  }

  private checkBrandDataIsAvailableOrNot = async () => {
    this.isAutoCall = true;
    await this.transferLocationList.forEach((item: StoweLocationResponseModal) => {
      if (this.isAutoCall && !this.coreHelperService.isNullOrUndefined(item.locationItemList.find(l => l.locationSurrogate === this.selectedLocationData.locationSurrogate))) {
        this.clipBrandLocation = item.location;
        this.isAutoCall = false;
        this.isAutoRefresh = false;
      }
    });
    if (this.isAutoCall) {
      this.pageNumber++;
      this.searchLocation();
    } else {
      this.setLocationDefaultData().then(() => {
        this.changeDetector.detectChanges();
        const locationElement = document.getElementById(this.clipBrandLocation);
        window.scrollTo(0, locationElement.offsetTop - 111);
      });
    }
    return;
  }

  private setLocationDefaultData = async () => {
    await this.transferLocationList.forEach((item: StoweLocationResponseModal) => {
      item.temporaryAddedCount = 0;
      if (!this.coreHelperService.isArrayEmpty(this.updatedLocation)) {
        this.updatedLocation.forEach((location: LocationItemModal) => {
          if (item.id.locationSurrogate === location.locationSurrogate) {
            item.temporaryAddedCount = location.locationItemCount;
          }
        });
      } else {
        if (item.locationSurrogate === this.selectedLocationData.locationSurrogate) {
          item.locationItemList.forEach(location => {
            if (location.locationItemSurrogate === this.selectedLocationData.locationItemSurrogate) {
              this.updatedLocation.push({
                locationSurrogate: location.locationSurrogate,
                locationItemCount: location.locationItemCount
              });
              item.temporaryAddedCount += location.locationItemCount;
              item.locationItemCount -= location.locationItemCount;
              this.addedBalesCount += item.temporaryAddedCount;
            }
          });
          item.locationItemList = item.locationItemList.filter(l => l.locationItemSurrogate !== this.selectedLocationData.locationItemSurrogate);
        }
      }

      if (!this.coreHelperService.isArrayEmpty(item.locationItemList)) {
        item.locationItemGroupList = [];
        item.locationItemList.forEach((location: LocationListModal) => {
          let group: { clipBrand: string, locationItemCount: number } = { clipBrand: location.clipBrand, locationItemCount: 0 };
          const countList = item.locationItemList.filter(l => l.clipBrand === group.clipBrand).map(m => m.locationItemCount);
          countList.forEach(count => {
            group.locationItemCount += count;
          });
          if (this.coreHelperService.isNullOrUndefined(item.locationItemGroupList.find(l => l.clipBrand === group.clipBrand)))
            item.locationItemGroupList.push(group);
        });
      }
    })
  }

  searchLocation = (isAutoCall: boolean = true) => {
    this.isAutoCall = isAutoCall;
    if (!this.coreHelperService.isStringEmptyOrWhitespace(this.search)) {
      this.isAutoCall = false;
      this.pageNumber = 0;
    }
    this.transferService.getTransferLocation({ locationCentreCode: this.receivalCentreCode, pageNo: this.pageNumber, search: this.search }).subscribe((response: StoweLocationResponseModal) => {
      if (!response["response"]) {
        this.coreHelperService.openErrorToaster(response["message"]);
        return;
      }
      this.transferLocationList = Object.assign([], response["data"]);
      this.totalLength = response["totalRecords"];
      this.paginator.pageIndex = this.pageNumber;
      if (this.isAutoCall && !this.coreHelperService.isArrayEmpty(this.transferLocationList)) {
        this.checkBrandDataIsAvailableOrNot().then(() => {
          this.setLocationDefaultData().then(() => {
            this.changeDetector.detectChanges();
          });
        });
      } else {
        if (this.isAutoRefresh) {
          this.refresh();
        }
        this.setLocationDefaultData().then(() => {
          this.changeDetector.detectChanges();
        });
      }
    })
  }

  refresh = () => {
    this.search = "";
    this.pageNumber = 0;
    this.addedBalesCount = 0;
    this.updatedLocation = [];
    this.isAutoCall = false;
    this.isAutoRefresh = false;
    this.isSort = false;
    this.balesCount = this.selectedLocationData.locationItemCount;
    this.paginator.pageIndex = this.pageNumber;
    this.searchLocation(false);
  }

  public openSubmitDialog() {
    if (this.addedBalesCount !== this.balesCount) {
      this.coreHelperService.openErrorToaster("Please Add " + this.balesCount + " Bales");
      return;
    }

    this.updatedLocation = this.updatedLocation.filter(u => u.locationItemCount != 0);

    this.transferService.submitStowe(this.getSubmitStoweApiRequestObject()).subscribe((response) => {
      if (!response["response"]) {
        this.coreHelperService.openErrorToaster(response["message"]);
        return;
      }
      const dialogRef = this.dialog.open(SubmitPopupComponent, { panelClass: 'custom-popup' });
    })

  }

  private getSubmitStoweApiRequestObject = (): SubmitStoweRequestModal => {
    let requestModal: SubmitStoweRequestModal = new SubmitStoweRequestModal();
    requestModal.locationItemSurrogate = this.selectedLocationData.locationItemSurrogate.toString();
    requestModal.transferType = this.isSort ? "SORT" : "TRANSFER";
    requestModal.locationCentreCode = this.receivalCentreCode;
    requestModal.locationItems = this.updatedLocation
    return requestModal;
  }

  openStowTransferDialog = (selectedLocation: StoweLocationResponseModal) => {
    let data: TransferBalesDialogRequestModal = {
      selectedLocationSurrogate: selectedLocation.id.locationSurrogate,
      selectedLocationQuantity: selectedLocation.temporaryAddedCount,
      selectedLocation: selectedLocation.location,
      defaultLocationList: this.transferLocationList,
      updatedLocationList: this.updatedLocation,
      toLocationSurrogate: 0,
      toLocation: ""
    }
    const dialogRef = this.dialog.open(TransferBalesComponent, { panelClass: 'custom-popup', data: data,autoFocus:false });
    dialogRef.afterClosed().subscribe((response: TransferBalesDialogResponseModal) => {
      if (!this.coreHelperService.isNullOrUndefined(response)) {
        if (response.selectedLocationData.remainingCount === 0) {
          this.addedBalesCount -= selectedLocation.temporaryAddedCount;
          this.balesCount -= selectedLocation.temporaryAddedCount;
        }
        selectedLocation.temporaryAddedCount = response.selectedLocationData.remainingCount;
        if (!this.coreHelperService.isArrayEmpty(this.updatedLocation)) {
          this.updatedLocation.forEach(item => {
            if (item.locationSurrogate === response.selectedLocationData.selectedLocationSurrogate) {
              item.locationItemCount = response.selectedLocationData.remainingCount;
            }
          });
        }
        if (!this.coreHelperService.isNullOrUndefined(response.toLocationData)) {
          this.transferLocationList.forEach(item => {
            if (item.id.locationSurrogate === response.toLocationData.locationSurrogate) {
              item.temporaryAddedCount = response.toLocationData.count;
            }
          });
          if (!this.coreHelperService.isArrayEmpty(this.updatedLocation)) {
            this.updatedLocation.forEach(item => {
              if (item.locationSurrogate === response.toLocationData.locationSurrogate) {
                item.locationItemCount += response.toLocationData.count;
              }
            });
            const location = this.updatedLocation.find(u => u.locationSurrogate === response.toLocationData.locationSurrogate);
            if (this.coreHelperService.isNullOrUndefined(location)) {
              this.updatedLocation.push({
                locationSurrogate: response.toLocationData.locationSurrogate,
                locationItemCount: response.toLocationData.count
              });
            }
          }
        } else {
          this.isSort = true;
        }
        this.setLocationDefaultData().then(() => {
          this.changeDetector.detectChanges();
        });
      }
    });
  }

  ngOnInit(): void {
    this.coreStorageDataService.setCustomHeader("Stowed Wool");
    this.setScreenWiseData();
    this.searchLocation();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setScreenWiseData();
  }
  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event) {
    this.setScreenWiseData();
  }


  private setScreenWiseData = () => {
    this.showFooter = this.coreHelperService.checkIsDesktopScreen();
  }

  public cancel = () => {
    this.router.navigate(["./transfer"]);
  }

  public onChangePage = (data: PageEvent) => {
    this.pageNumber = data.pageIndex;
    this.searchLocation(false);
  }

  getTooltipData = (location: StoweLocationResponseModal): string => {
    let tooltip: string = "";
    location.locationItemGroupList.forEach((item: LocationListModal) => {
      tooltip += item.clipBrand + "-" + item.locationItemCount + " ";
    });
    return tooltip;
  }
}
