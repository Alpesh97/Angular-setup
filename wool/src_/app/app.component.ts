import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CoreHelperService } from './providers/core-helper/core-helper.service';
import { CorePwaService } from './providers/core-pwa/pwa.service';
import { CoreStorageDataService } from './providers/core-storage/core-storage-data.service';

import * as moment from "moment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'woolapp-fe';

  constructor(private router: Router, public corePwaService: CorePwaService,
    private coreStorageDataService: CoreStorageDataService,
    private coreHelperService: CoreHelperService) {

    const urlParams = new URLSearchParams(window.location.search);
    let token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBUExUVEVTVCIsImF1dGhvcml0aWVzIjpbXSwibmV4dXNUb2tlbiI6IjAwMjBkNDM4MzI5ODZlZjA0ZGM1YWIyN2RkNWEzZjBlOGI4YzRiMTgxYTI1NDEzNTA2NTMxMDA5ZjE1MDA3NmIiLCJpYXQiOjE2MDg3Mjg2OTIsImV4cCI6MTYwODgxNTA5Mn0.0IAcK4GaT1aG0E9x0eoSXy5BvWiaGqCrjtkWcluSJ_aPC2wTN8YVQ6NO8emzOvw1kzmQYlu_A6J5j0RST0R0Rg";
    let expiration = "3217543784072";
    
    let card = urlParams.get('card');
    let BSC = "E6F";
    let userName = "APLTTEST";


//    if (!urlParams.has("token")) {
//      token = this.coreStorageDataService.getToken();
//    }
//    if (!urlParams.has("expires_at")) {
//      expiration = this.coreStorageDataService.getExpiry();
//    }
//    
//    if (!urlParams.has("card")) {
//      card = this.coreStorageDataService.getCard();
//    }
//    if (!urlParams.has("BSC")) {
//      BSC = this.coreStorageDataService.getBSC();
//    }
//    if (!urlParams.has("username")) {
//      userName = this.coreStorageDataService.getUserName();
//    }
    
    this.setStateCodeAndCenterCode(BSC);
    this.coreStorageDataService.setToken(token);
    this.coreStorageDataService.setExpiry(expiration);
    this.coreStorageDataService.setUserName(userName);
    this.coreStorageDataService.setCard(card);
    
    window.history.pushState({}, document.title, "/woolapp");
    
    window.addEventListener('beforeinstallprompt', event => {
      this.corePwaService.promptEvent = event;
    });
  }

  installPwa(): void {
    this.corePwaService.promptEvent.prompt();
  }

  private setStateCodeAndCenterCode = (bsc: string) => {
    this.coreStorageDataService.setBSC(bsc);
    this.coreStorageDataService.setStateCode(bsc[1]);
    this.coreStorageDataService.setCentreCode(bsc[2]);
    
  }
}
