import { Location } from '@angular/common';
import { AfterContentChecked, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CoreHelperService } from 'src/app/providers/core-helper/core-helper.service';
import { CoreStorageDataService } from 'src/app/providers/core-storage/core-storage-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterContentChecked {


  @ViewChild('header', { static: true }) header: ElementRef;
  constructor(public coreStorageDataService: CoreStorageDataService,
    public coreHelperService: CoreHelperService,
    private location: Location,
    public elementRef: ElementRef,
    private router: Router
  ) {
  }
  headerTop() {
    const headerHeight = this.header.nativeElement.offsetHeight;
    const pageWrapper = document.getElementsByClassName('page-wrapper');
    let i: number;
    for (i = 0; i < pageWrapper.length; i++) {
      pageWrapper[i]['style'].paddingTop = headerHeight + 'px';
    }

  }
  ngOnInit(): void {
  }
  goBack() {
    switch (window.location.hash) {
      case "#/dashboard":
      case "#/receival":
      case "#/stowage":
      case "#/balecapture":
      case "#/marker":
      case "#/transfer":
      case "#/sortation":
        this.router.navigateByUrl("/dashboard");
        break;
      default:
        this.location.back();
        break;
    }
  }

  logout = () => {
    this.coreHelperService.logout();
  }

  ngAfterContentChecked(): void {
    setTimeout(() => {
      this.headerTop();
    }, 100);

  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.headerTop();
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange() {
    this.headerTop();
  }

}
