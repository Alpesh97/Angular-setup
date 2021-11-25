import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MarkerListResponseModal, MarkerBaleListResponseModal } from 'src/app/models/marker.model';
import { CoreHelperService } from 'src/app/providers/core-helper/core-helper.service';
import { CoreStorageDataService } from 'src/app/providers/core-storage/core-storage-data.service';
import { MarkerService } from 'src/app/services/marker.service';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.scss']
})
export class MarkerComponent implements OnInit {
  public displayedColumns: string[] = [];
  public desktopColumns: string[] = ['broker', 'brand', 'balecount', 'lanenumber', 'action'];
  public mobileColumns: string[] = ['broker', 'brand', 'balecount', 'lanenumber', 'action'];
  dataSource = new MatTableDataSource<MarkerListResponseModal>([]);
  public showFooter = true;
  public totalLength: number = 0;
  public search: string = "";
  private pageNumber: number = 0;
  private pageSize: number = 20;
  private sortDirection: string = 'ASC';
  public isFirstTimeLoadData: boolean = true;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public coreHelperService: CoreHelperService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private coreStorageDataService: CoreStorageDataService,
    private markerService: MarkerService) {
    this.setScreenWiseData();
    this.getMarkerList();
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Per page';
    this.dataSource.paginator = this.paginator;
    this.coreStorageDataService.setCustomHeader("Captured Wool");
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setScreenWiseData();
    this.changeDetector.detectChanges();
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event) {
    this.setScreenWiseData();
    this.changeDetector.detectChanges();
  }
  private setScreenWiseData = () => {
    if (this.coreHelperService.checkIsDesktopScreen()) {
      this.displayedColumns = this.desktopColumns;
      this.showFooter = true;
      return;
    }
    this.displayedColumns = this.mobileColumns;
    this.showFooter = false;
  }
  public sorting = () => {
    this.sortDirection = this.sortDirection === 'ASC' ? "DESC" : "ASC";
    this.pageNumber = 0;
    this.getMarkerList();
  }

  public searchMarker = () => {
    this.pageNumber = 0;
    this.getMarkerList();
  }

  private getMarkerList = () => {
    this.markerService.getMarkerList({ pageNo: this.pageNumber, search: this.search, sortOrder: this.sortDirection, pageSize: this.pageSize, receivalCentreCode: this.coreStorageDataService.getCentreCode() }).subscribe((response) => {
      if (!response["response"]) {
        this.coreHelperService.openErrorToaster(response["message"]);
        return;
      }
      this.dataSource = new MatTableDataSource<MarkerListResponseModal>(response["data"] as Array<MarkerListResponseModal>);
      this.dataSource.sort = this.sort;
      this.totalLength = response["totalRecords"];
      this.isFirstTimeLoadData = false;
    });
  }

  public onChangePage = (data: PageEvent) => {
    this.pageSize = data.pageSize;
    this.pageNumber = data.pageIndex;
    this.getMarkerList();
  }

  public refresh = () => {
    this.search = "";
    this.pageNumber = 0;
    this.getMarkerList();
  }

  public goToDetailScreen = (rowData: MarkerListResponseModal) => {
    this.markerService.getMarkerBaleList(rowData.locationItemSurrogate).subscribe(response => {
      if (!response["response"]) {
        this.coreHelperService.openErrorToaster(response["message"]);
        return;
      }
      this.router.navigate(["marker/details"], {
        state: {
          markerBaleDetails: response["data"] as Array<MarkerBaleListResponseModal>,
          markerData: rowData
        }
      })
    });
  }
}
