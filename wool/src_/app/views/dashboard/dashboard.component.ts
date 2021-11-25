import { Component, HostListener, OnInit } from '@angular/core';
import { CoreHelperService } from 'src/app/providers/core-helper/core-helper.service';
import { CoreStorageDataService } from 'src/app/providers/core-storage/core-storage-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public showFooter: boolean = true;
  public dashboardList = [
    {
      className: 'green',
      linkName: 'Receivals',
      imgName: 'receivel-ic.svg',
      routeLink: '../receival'
    },
    {
      className: 'orange',
      linkName: 'Stowage',
      imgName: 'stowage-ic.svg',
      routeLink: '../stowage'
    },
    {
      className: 'pink',
      linkName: 'Bale Capture',
      imgName: 'bale-ic.svg',
      routeLink: '../balecapture'
    },
    {
      className: 'blue',
      linkName: 'Mark-up',
      imgName: 'markup-ic.svg',
      routeLink: '../marker'
    },
    {
      className: 'purple',
      linkName: 'Sortation',
      imgName: 'sortation-ic.svg'
    }
    ,
    {
      className: 'green-dark',
      linkName: 'Transfer',
      imgName: 'transfer-ic.svg',
      routeLink: '../transfer'
    }
  ]

  constructor(private coreHelperService: CoreHelperService,
    public coreStorageDataService: CoreStorageDataService,) {
    this.setScreenWiseData();
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

  ngOnInit(): void {
    this.coreStorageDataService.setCustomHeader("");
  }
}
