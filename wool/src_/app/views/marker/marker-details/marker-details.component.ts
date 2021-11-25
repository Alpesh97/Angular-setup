import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CoreHelperService } from 'src/app/providers/core-helper/core-helper.service';
import { Router } from '@angular/router';
import { CoreStorageDataService } from 'src/app/providers/core-storage/core-storage-data.service';
import { MarkerBaleListResponseModal, MarkerListResponseModal } from 'src/app/models/marker.model';
import { MarkerService } from 'src/app/services/marker.service';
export interface PeriodicElement {
  broker: string,
  brand: string,
  locationnumber: number,
  balecount: number,
  totalbalecount: number,
}
const ELEMENT_DATA: PeriodicElement[] = [
  { broker: 'Virgil C. Belue', brand: 'Lana Grossa', locationnumber: 5, balecount: 25, totalbalecount: 44 },
];
@Component({
  selector: 'app-marker-details',
  templateUrl: './marker-details.component.html',
  styleUrls: ['./marker-details.component.scss']
})

export class MarkerDetailsComponent implements OnInit {

  public displayedColumns: string[] = ['broker', 'brand', 'totalbalecount', 'locationnumber', 'balecount'];
  public dataSource = new MatTableDataSource<MarkerListResponseModal>([]);
  public showFooter = true;
  public markerBaleDetails: Array<MarkerBaleListResponseModal> = [];
  public markerData: MarkerListResponseModal;
  public index: number = 0;

  constructor(public coreHelperService: CoreHelperService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private coreStorageDataService: CoreStorageDataService,
    private markerService: MarkerService) {
    if (this.coreHelperService.isNullOrUndefined(this.router.getCurrentNavigation().extras.state)) {
      this.router.navigateByUrl("marker");
      return;
    }
    this.markerBaleDetails = this.router.getCurrentNavigation().extras.state["markerBaleDetails"] as Array<MarkerBaleListResponseModal>;
    if (!this.coreHelperService.isArrayEmpty(this.markerBaleDetails)) {
      this.markerBaleDetails.forEach((item) => {
        if (!this.coreHelperService.isStringEmptyOrWhitespace(item.isMarked) && item.isMarked === "Y") {
          this.index++;
        }
      })
    }
    this.markerData = this.router.getCurrentNavigation().extras.state["markerData"] as MarkerListResponseModal;
    this.markerData.remainingBaleCount = this.markerData.baleCount - this.index;
    this.dataSource = new MatTableDataSource<MarkerListResponseModal>([this.markerData]);
  }

  ngOnInit(): void {
    this.setScreenWiseData();
    this.coreStorageDataService.setCustomHeader(this.markerData.brokerName + " " + (this.index + 1) + " - " + (this.markerBaleDetails.length));
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

  public goToNext = () => {
    this.markerService.markBale(this.markerBaleDetails[this.index].id, this.markerBaleDetails.length - 1 === this.index ? "Y" : "N").subscribe(response => {
      if (!response["response"]) {
        this.coreHelperService.openErrorToaster(response["message"]);
        return;
      }
      this.coreHelperService.openSuccessToaster(response["message"]);
      if (this.markerBaleDetails.length - 1 === this.index) {
        this.router.navigateByUrl('/marker');
        return;
      }
      this.index++;
      this.dataSource.data[0].remainingBaleCount = this.dataSource.data[0].baleCount - this.index;
      this.coreStorageDataService.setCustomHeader(this.markerData.brokerName + " " + (this.index + 1) + " - " + (this.markerBaleDetails.length));
    });
  }

  public clickToSuspend = () => {
    this.router.navigateByUrl('/marker');
  }

}
