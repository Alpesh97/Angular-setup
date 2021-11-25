import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import {GeneralService} from "../../services/general.service";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import {ComponentLabelConst} from "../../constants";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public direction = 'rtl';
  public lang: string;
  public labels: any;
  public subscriptions: Subscription[] = [];

  constructor(private generalService: GeneralService,
              private authService: AuthService) { }

  ngOnInit(): void {
    let langSub = this.authService.lang.subscribe(res => {
      this.lang = res.code;
      this.direction = res.direction;
      this.init();
    });
    this.subscriptions.push(langSub);
  }

  init(){
    this.generalService.getLabel(ComponentLabelConst.FOOTER).subscribe(res => {
      if (res.code === 200 && res.success === true) {
        this.labels = res.data;
      }
    });
  }
  ngAfterViewInit(): void {
    this.footerAdj();
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.footerAdj();
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange() {
    this.footerAdj();
  }
  @ViewChild('footer', { static: true }) footer: ElementRef;

  footerAdj() {
    const footerHeight = this.footer.nativeElement.clientHeight;
    this.footer.nativeElement.style.marginTop = -footerHeight + 'px';
    const pageWrapper = document.getElementsByClassName('wrapper-inner');
    let i: number;
    for (i = 0; i < pageWrapper.length; i++) {
      pageWrapper[i]['style'].paddingBottom = footerHeight + 'px';
    }
  }

}
