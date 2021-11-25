import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TransferResponseModal } from 'src/app/models/transfer.model';
import { CoreHelperService } from 'src/app/providers/core-helper/core-helper.service';
import { CoreStorageDataService } from 'src/app/providers/core-storage/core-storage-data.service';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  public displayedColumns: string[] = [];
  public desktopColumns: string[] = ['broker', 'brand', 'balecount', 'lane', 'action'];
  public mobileColumns: string[] = ['broker', 'brand', 'balecount', 'lane', 'action'];
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
  public sortColumns: Array<{ column: string, sortOrder: string }> = [{ column: "lane", sortOrder: "ASC" }];

  constructor(public coreHelperService: CoreHelperService,
    private transferService: TransferService,
    private router: Router,
    private coreStorageDataService: CoreStorageDataService,) {
    this.setScreenWiseData();
    this.getTransferListData();
  }

  ngOnInit(): void {
    this.coreStorageDataService.setCustomHeader("Stowed Wool");
    this.dataSource = new MatTableDataSource<TransferResponseModal>([]);
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
    this.getTransferListData();
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

  private getTransferListData = () => {
    this.transferService.getTransferList(
      {
        pageNo: this.pageNumber,
        search: this.search,
        pageSize: this.pageSize,
        sort: this.sortColumns,
        receivalCentreCode: this.coreStorageDataService.getCentreCode()
      }).subscribe(response => {
        if (!response["response"]) {
          this.coreHelperService.openErrorToaster(response["message"]);
          return;
        }
        this.dataSource = new MatTableDataSource<TransferResponseModal>(response["data"].map(d => d.locationItem));;
        this.dataSource.sort = this.sort;
        this.totalLength = response["totalRecords"];
        this.isFirstTimeLoadData = false;
      });
  }

  public onChangePage = (data: PageEvent) => {
    this.pageSize = data.pageSize;
    this.pageNumber = data.pageIndex;
    this.getTransferListData();
  }

  public transferLocation = (data: TransferResponseModal) => {
    this.router.navigate(["transfer/location"], {
      state: {
        selectedLocationData: data,
        clipBrand: data.clipBrand
      }
    });
  }

  public searchTransfer = () => {
    this.pageNumber = 0;
    this.getTransferListData();
  }

  public refresh = () => {
    this.search = "";
    this.pageNumber = 0;
    this.getTransferListData();
  }

}
