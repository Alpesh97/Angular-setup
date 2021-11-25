import { Injectable } from '@angular/core';

import * as moment from "moment";
import { CoreStorageDataService } from '../providers/core-storage/core-storage-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(private coreStorageDataService: CoreStorageDataService) {}


    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = this.coreStorageDataService.getExpiry();
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }    
}