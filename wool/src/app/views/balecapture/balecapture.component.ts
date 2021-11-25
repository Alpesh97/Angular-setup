import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BalecaptureResponseModal } from 'src/app/models/baleCapture.model';
import { CoreHelperService } from 'src/app/providers/core-helper/core-helper.service';
import { CoreStorageDataService } from 'src/app/providers/core-storage/core-storage-data.service';
import { BalecaptureService } from 'src/app/services/balecapture.service';

@Component({
  selector: 'app-balecapture',
  templateUrl: './balecapture.component.html',
  styleUrls: ['./balecapture.component.scss']
})
export class BalecaptureComponent implements OnInit {
  public displayedColumns: string[] = [];
  public desktopColumns: string[] = ['broker', 'brand', 'balecount', 'lanenumber', 'action'];
  public mobileColumns: string[] = ['broker', 'brand', 'balecount', 'lanenumber', 'action'];

  dataSource = new MatTableDataSource([]);
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
    private balecaptureService: BalecaptureService,
    private coreStorageDataService: CoreStorageDataService) {
    this.setScreenWiseData();
    this.getBalecaptureList();
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Per page';
    this.dataSource.paginator = this.paginator;
    this.coreStorageDataService.setCustomHeader("Stowed Wool");
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

  sorting = () => {
    this.sortDirection = this.sortDirection === 'ASC' ? "DESC" : "ASC";
    this.pageNumber = 0;
    this.getBalecaptureList();
  }

  public searchBalecapture = () => {
    this.pageNumber = 0;
    this.getBalecaptureList();
  }

  private getBalecaptureList = () => {
    this.balecaptureService.getBalecaptureList(
      {
        pageNo: this.pageNumber,
        search: this.search,
        sortOrder: this.sortDirection,
        pageSize: this.pageSize,
        receivalCentreCode: this.coreStorageDataService.getCentreCode()
      }).subscribe((response) => {
        if (!response["response"]) {
          this.coreHelperService.openErrorToaster(response["message"]);
          return;
        }
        let data: Array<BalecaptureResponseModal> = [];
        response["data"].forEach(element => {
          data.push(element.locationItem);
        });
        this.dataSource = new MatTableDataSource<BalecaptureResponseModal>(data);
        this.dataSource.sort = this.sort;
        this.totalLength = response["totalRecords"];
        this.isFirstTimeLoadData = false;
      });
  }

  public onChangePage = (data: PageEvent) => {
    this.pageSize = data.pageSize;
    this.pageNumber = data.pageIndex;
    this.getBalecaptureList();
  }

  public refresh = () => {
    this.search = "";
    this.pageNumber = 0;
    this.getBalecaptureList();
  }

  public setBalesNumber = (data: BalecaptureResponseModal) => {
    this.balecaptureService.checkBaleRecordAvailableOrNOt(data.locationItemSurrogate).subscribe((response) => {
      if (!response["response"]) {
        this.coreHelperService.openErrorToaster(response["message"]);
        return;
      }
      this.router.navigate(["balecapture/balecapture-street"], {
        state: {
          rowData: data
        }
      })
    });
  }
}
