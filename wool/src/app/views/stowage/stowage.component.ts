import { state } from '@angular/animations';
import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StowageResponseModal } from 'src/app/models/stowage.model';
import { CoreHelperService } from 'src/app/providers/core-helper/core-helper.service';
import { StowageService } from 'src/app/services/stowage.service';
import { CoreStorageDataService } from 'src/app/providers/core-storage/core-storage-data.service';

export interface PeriodicElement {
  broker: string,
  brand: string,
  carrier: string,
  classernum: string,
  balecount: number,
}

@Component({
  selector: 'app-stowage',
  templateUrl: './stowage.component.html',
  styleUrls: ['./stowage.component.scss']
})
export class StowageComponent implements OnInit {
  public displayedColumns: string[] = [];
  public desktopColumns: string[] = ['broker', 'brand', 'carrier', 'date_entered', 'balecount', 'status', 'action'];
  public mobileColumns: string[] = ['broker', 'brand', 'date_entered', 'balecount', 'status', 'action'];
  public dataSource = new MatTableDataSource();
  public showFooter: boolean = true;
  public totalLength: number = 0;
  public search: string = "";
  private pageNumber: number = 0;
  private pageSize: number = 20;
  private sortDirection: string = 'ASC';
  public isFirstTimeLoadData: boolean = true;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public sortColumns: Array<{ column: string, sortOrder: string }> = [{ column: "date_entered", sortOrder: "ASC" }];

  // decimalPipe = new DecimalPipe(navigator.language);

  constructor(public coreHelperService: CoreHelperService,
    private stowageService: StowageService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private coreStorageDataService: CoreStorageDataService,) {
    this.setScreenWiseData();
    this.getStowageListData();
  }

  ngOnInit(): void {
    this.coreStorageDataService.setCustomHeader("Received Wool");
    this.dataSource = new MatTableDataSource<StowageResponseModal>([]);
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'per page';
    this.dataSource.paginator = this.paginator;
  }

  sorting = (ev) => {
    let columnSort = this.sortColumns.find(s => s.column === ev.active);
    if (!this.coreHelperService.isNullOrUndefined(columnSort)) {
      columnSort.sortOrder = columnSort.sortOrder === "ASC" ? "DESC" : "";
    } else {
      this.sortColumns.push({ column: ev.active, sortOrder: "ASC" });
    }
    this.sortColumns = this.sortColumns.filter(s => !this.coreHelperService.isStringEmptyOrWhitespace(s.sortOrder));
    console.log(this.sortColumns);
    this.pageNumber = 0;
    this.getStowageListData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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
    if (this.coreHelperService.checkIsDesktopScreen()) {
      this.displayedColumns = this.desktopColumns;
      this.showFooter = true;
      return;
    }
    this.displayedColumns = this.mobileColumns;
    this.showFooter = false;
  }

  private getStowageListData = () => {
    this.stowageService.getStowageList(
      {
        pageNo: this.pageNumber,
        search: this.search,
        pageSize: this.pageSize,
        sort: this.sortColumns,
        locationCentreCode: this.coreStorageDataService.getCentreCode()
      }).subscribe(response => {
        if (!response["response"]) {
          this.coreHelperService.openErrorToaster(response["message"]);
          return;
        }
        let data: Array<StowageResponseModal> = [];
        response["data"].forEach(element => {
          data.push({ brokerName: element.woolReceival.brokerName, carrierName: element.woolReceival.carrierName, ...element.woolReceival });
        });
        this.dataSource = new MatTableDataSource<StowageResponseModal>(data);
        this.dataSource.sort = this.sort;
        this.totalLength = response["totalRecords"];
        this.isFirstTimeLoadData = false;
      });
  }

  public onChangePage = (data: PageEvent) => {
    this.pageSize = data.pageSize;
    this.pageNumber = data.pageIndex;
    this.getStowageListData();
  }

  public setLocation = (data: StowageResponseModal) => {
    this.router.navigate(["stowage/location"], {
      state: {
        balesCount: data.balesEstimated,
        receivalCentreCode: data.receivalCentreCode,
        stowageResponseIdData: data.idPk,
        clipBrand: data.clipBrand
      }
    });
  }

  public searchStowage = () => {
    this.pageNumber = 0;
    this.getStowageListData();
  }

  public refresh = () => {
    this.search = "";
    this.pageNumber = 0;
    this.getStowageListData();
  }

}