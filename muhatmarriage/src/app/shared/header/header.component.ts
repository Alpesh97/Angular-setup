import {Component, OnInit, HostListener, ElementRef, ViewChild, Inject, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import {GeneralService} from "../../services/general.service";
import {DOCUMENT} from "@angular/common";
import {ComponentLabelConst, DirectionConst, LanguageConst} from "../../constants";
import { MatTabGroup } from '@angular/material/tabs';

interface Language {
  value: string;
  viewValue: string;
  direction: string;
  code: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  // language select options
  selected = 'english';


  public direction = 'rtl';
  public langCode: string;
  public labels: any;
  public subscriptions: Subscription[] = [];

  languages: Language[] = [
    {value: 'english', viewValue: 'English', direction: 'ltr', code: 'en'},
    {value: 'arabic', viewValue: 'عربي', direction: 'rtl', code: 'ar'}
  ];

  languagesObj: any = {
    en : {value: 'english', viewValue: 'English', direction: 'ltr', code: 'en'},
    ar : {value: 'arabic', viewValue: 'عربي', direction: 'rtl', code: 'ar'}
  };

  // Header scroll event
  @ViewChild('header', { static: true }) header: ElementRef;
  @ViewChild('targetMenuTabGroup') targetMenuTabGroup: MatTabGroup;
  headerAdj() {
    let header_height = (this.header.nativeElement.scrollHeight - 1) / 2;
    let scroll_top = window.pageYOffset;
    if(scroll_top >= header_height){
      document.body.classList.add('sticky-header');
    }
    else{
      document.body.classList.remove('sticky-header');
    }
  }
  OnTargetMenuOpened() {
    this.targetMenuTabGroup.realignInkBar();
}

  // main padding top
  main_padding_top() {
    let header_height = this.header.nativeElement.scrollHeight;
    let pageWrapper = document.getElementsByClassName('main-content');
    let i: number;
    for (i = 0; i < pageWrapper.length; i++) {
      if(this.router.url !== '/home' && this.router.url !== '/'){
        pageWrapper[i]['style'].paddingTop = header_height + 'px';
      }
    }
    if (screen.width <= 767){
      let mobileMenu = document.getElementsByClassName('main-nav');
      let i: number;
      for (i = 0; i < pageWrapper.length; i++) {
        if(this.has_login){
          mobileMenu[i]['style'].top = header_height + 'px';
        }
      }
    }
  }

  //mobile_menu
  mobile_menu(){
    if (screen.width <= 767){
      document.body.classList.toggle('menu-open');
    }
    else{
      document.body.classList.remove('menu-open');
    }
  }

  ngAfterViewInit(): void {
    this.headerAdj();
    this.main_padding_top();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
     this.headerAdj();
     this.main_padding_top();
     if (screen.width <= 991){}
      else{
      document.body.classList.remove('menu-open');
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
     this.headerAdj();
     this.main_padding_top();
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange() {
     this.headerAdj();
     this.main_padding_top();

     if (screen.width <= 991){}
      else{
      document.body.classList.remove('menu-open');
    }
  }

  constructor(public router:Router,
              public authService: AuthService,
              private generalService: GeneralService,
              @Inject(DOCUMENT) private document: Document) {
                document.querySelector('body').addEventListener("click", this.dropdownHide);
               }


  public has_login: boolean = false;
  page_link: boolean = false;
  has_register: boolean = false;
  ngOnInit() {

    //  For inner page
    if(this.router.url === '/home' || this.router.url === '/'){
      this.page_link = !this.page_link;
    }

    if(this.router.url === '/auth/register'){
      this.has_register = !this.has_register;
    }

    if(this.router.url === '/search-result' || this.router.url === '/profile' || this.router.url === '/user/extra-search'){
      this.has_login = !this.has_login;
    }

    let langSub = this.authService.lang.subscribe(res => {
      this.langCode = res.code;
      this.direction = res.direction;
      this.init();
      if(res?.direction === DirectionConst.RTL){
        this.document.body.classList.add('rtl-direction');
        this.document.body.setAttribute('dir', DirectionConst.RTL);
      } else {
        this.document.body.classList.remove('rtl-direction');
        this.document.body.setAttribute('dir', DirectionConst.LTR);
      }

    });
    this.subscriptions.push(langSub);
  }

  init(){
    this.generalService.getLabel(ComponentLabelConst.HEADER).subscribe(res => {
      if (res.code === 200 && res.success === true) {
        this.labels = res.data;
      }
    });
  }

  // changesDirection(dir: any){
  //   this.authService.setDirection(dir)
  // }

  changesLanguage(lang: any){
    this.authService.setLang(lang);
  }

  toggleLanguage(){
    if(LanguageConst.EN == this.langCode){
      this.authService.setLang(this.languagesObj.ar);
    } else {
      this.authService.setLang(this.languagesObj.en);
    }
  }

  logout(){
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

  dropdownPropogation(event) {
    event.stopImmediatePropagation()
  }

  dropdownHide() {
    var dropdownList = document.querySelectorAll('.dropdown-menu-wrapper');
    for (let i = 0; i < dropdownList.length; i++) {
      dropdownList[i].classList.remove('open-dropdown');
    }
  }
  dropdowntoggle(event) {
    var _this = event.target as HTMLElement;
    var dropdownList = document.querySelectorAll('.dropdown-menu-wrapper');
    event.stopPropagation();
    for (let i = 0; i < dropdownList.length; i++) {
      if(dropdownList[i] == _this.closest('.dropdown-menu-wrapper')) {
        dropdownList[i].classList.toggle('open-dropdown');
      }
      else {
        dropdownList[i].classList.remove('open-dropdown');
      }
    }
   }

}
