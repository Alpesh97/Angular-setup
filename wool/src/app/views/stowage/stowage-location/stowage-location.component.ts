import { ViewChild } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import {
  LocationItemModal,
  LocationListModal,
  StowageResponseIdData,
  StoweLocationResponseModal,
  SubmitStoweRequestModal,
} from 'src/app/models/stowage.model';
import { CoreHelperService } from 'src/app/providers/core-helper/core-helper.service';
import { CoreStorageDataService } from 'src/app/providers/core-storage/core-storage-data.service';
import { StowageService } from 'src/app/services/stowage.service';

import { StowageCountComponent } from './stowage-count/stowage-count.component';
import { SubmitPopupComponent } from './submit-popup/submit-popup.component';

@Component({
  selector: 'app-stowage-location',
  templateUrl: './stowage-location.component.html',
  styleUrls: ['./stowage-location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StowageLocationComponent implements OnInit {
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }

  public showFooter: boolean = true;
  public stowageLocationList: Array<StoweLocationResponseModal> = [];
  public balesCount: number;
  private updatedLocation: Array<LocationItemModal> = [];
  public addedBalesCount: number = 0;
  public search: string;
  private receivalCentreCode: string;
  private stowageResponseIdData: number;
  private pageNumber: number = 0;
  public totalLength: number = 0;
  public clipBrand: string;
  public isAutoCall: boolean = false;
  private clipBrandLocation: string = "";
  public isShowPagination: boolean = false;
  public isAutoRefresh: boolean = true;

  constructor(public router: Router, public dialog: MatDialog,
    public coreHelperService: CoreHelperService,
    private stowageService: StowageService,
    private changeDetector: ChangeDetectorRef,
    private coreStorageDataService: CoreStorageDataService,) {
    this.addedBalesCount = 0;
    this.pageNumber = 0;

    if (this.coreHelperService.isNullOrUndefined(this.router.getCurrentNavigation().extras.state)) {
      this.router.navigateByUrl("stowage");
      return;
    }
    this.balesCount = this.router.getCurrentNavigation().extras.state["balesCount"] as number;
    this.receivalCentreCode = this.router.getCurrentNavigation().extras.state["receivalCentreCode"] as string;
    this.stowageResponseIdData = this.router.getCurrentNavigation().extras.state["stowageResponseIdData"] as number;
    this.clipBrand = this.router.getCurrentNavigation().extras.state["clipBrand"] as string;
  }

  private checkBrandDataIsAvailableOrNot = async () => {
    await this.stowageLocationList.forEach((item: StoweLocationResponseModal) => {
      if (this.isAutoCall && !this.coreHelperService.isNullOrUndefined(item.locationItemList.find(l => l.clipBrand === this.clipBrand))) {
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
    await this.stowageLocationList.forEach((item: StoweLocationResponseModal) => {
      item.temporaryAddedCount = 0;
      if (!this.coreHelperService.isArrayEmpty(this.updatedLocation)) {
        this.updatedLocation.forEach((location: LocationItemModal) => {
          if (item.id.locationSurrogate === location.locationSurrogate) {
            item.temporaryAddedCount = location.locationItemCount;
          }
        });
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
    this.stowageService.getStowageLocation({ locationCentreCode: this.receivalCentreCode, pageNo: this.pageNumber, search: this.search }).subscribe((response: StoweLocationResponseModal) => {
      if (!response["response"]) {
        this.coreHelperService.openErrorToaster(response["message"]);
        return;
      }
      this.stowageLocationList = Object.assign([], response["data"]);
      this.totalLength = response["totalRecords"];
      this.paginator.pageIndex = this.pageNumber;
      if (this.isAutoCall && !this.coreHelperService.isArrayEmpty(this.stowageLocationList)) {
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
    this.paginator.pageIndex = this.pageNumber;
    this.searchLocation(false);
  }

  public openSubmitDialog() {
    if (this.addedBalesCount !== this.balesCount) {
      this.coreHelperService.openErrorToaster("Please add " + this.balesCount + " bales");
      return;
    }

    this.stowageService.submitStowe(this.getSubmitStoweApiRequestObject()).subscribe((response) => {
      if (!response["response"]) {
        this.coreHelperService.openErrorToaster(response["message"]);
        return;
      }
      const dialogRef = this.dialog.open(SubmitPopupComponent, { panelClass: 'custom-popup' });
    })

  }

  private getSubmitStoweApiRequestObject = (): SubmitStoweRequestModal => {
    let requestModal: SubmitStoweRequestModal = new SubmitStoweRequestModal();
    requestModal.idPk = this.stowageResponseIdData;
    requestModal.locationCentreCode = this.receivalCentreCode;
    requestModal.locationItems = this.updatedLocation
    return requestModal;
  }

  openStowCountDialog(location: StoweLocationResponseModal) {
    if (this.addedBalesCount === this.balesCount) {
      this.coreHelperService.openErrorToaster("Already added " + this.addedBalesCount + " bales");
      return;
    }

    const dialogRef = this.dialog.open(StowageCountComponent, { panelClass: 'custom-popup', data: { maximumAllowedCount: this.balesCount - this.addedBalesCount, availableCount: location.maximumItemCount - location.locationItemCount + location.temporaryAddedCount }, autoFocus: false });
    dialogRef.afterClosed().subscribe((response: number) => {

      if (!this.coreHelperService.isNullOrUndefined(response)) {
        this.addedBalesCount += response;
        location.temporaryAddedCount += response;
        this.updatedLocation.push({ locationSurrogate: location.id.locationSurrogate, locationItemCount: response });
        this.changeDetector.detectChanges();
      }
    });

  }

  ngOnInit(): void {
    this.coreStorageDataService.setCustomHeader("Wool to Stow");
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
    this.router.navigate(["./stowage"]);
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
