import { Inject, Injectable } from '@angular/core';

import { CoreStorageConstants } from './core-storage-constant';
import { GLOBAL_SET_STORAGE, MEMORY_STORAGE, SESSION_STORAGE } from './core-storage.factory';
import { ICoreStorageService } from './core-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CoreStorageDataService {

  constructor(@Inject(GLOBAL_SET_STORAGE) private globalStorage: ICoreStorageService,
    @Inject(SESSION_STORAGE) private sessionStorage: ICoreStorageService,
    @Inject(MEMORY_STORAGE) private memoryStorage: ICoreStorageService) {
  }

  setToken = (token: string) => {
    this.globalStorage.set<string>(CoreStorageConstants.TOKEN, token);
  }
  getToken = () => {
    return this.globalStorage.get<string>(CoreStorageConstants.TOKEN);
  }
  
  setExpiry = (expiry: string) => {
    this.globalStorage.set<string>(CoreStorageConstants.EXPIRY, expiry);
  }

  getExpiry = () => {
    return this.globalStorage.get<string>(CoreStorageConstants.EXPIRY);
  }

  setStateCode = (code: string) => {
    this.globalStorage.set<string>(CoreStorageConstants.STATE_CODE, code);
  }

  getStateCode = (): string => {
    return this.globalStorage.get<string>(CoreStorageConstants.STATE_CODE);
  }

  setCentreCode = (code: string) => {
    this.globalStorage.set<string>(CoreStorageConstants.CENTRE_CODE, code);
  }

  getCentreCode = (): string => {
    return this.globalStorage.get<string>(CoreStorageConstants.CENTRE_CODE);
  }

  setUserName = (userName: string) => {
    this.globalStorage.set<string>(CoreStorageConstants.USERNAME, userName);
  }

  getUserName = () => {
    return this.globalStorage.get<string>(CoreStorageConstants.USERNAME);
  }

  setCard = (card: string) => {
    this.globalStorage.set<string>(CoreStorageConstants.CARD, card);
  }

  getCard = () => {
    return this.globalStorage.get<string>(CoreStorageConstants.CARD);
  }

  setBSC = (bsc: string) => {
    this.globalStorage.set<string>(CoreStorageConstants.BSC, bsc);
  }

  getBSC = () => {
    return this.globalStorage.get<string>(CoreStorageConstants.BSC);
  }

  clearGlobalStorage = () => {
    this.globalStorage.removeAll();
  }

  clearSessionStorage = () => {
    this.sessionStorage.removeAll();
  }

  clearMemoryStorage = () => {
    this.memoryStorage.removeAll();
  }

  clearAllStorage = () => {
    this.clearGlobalStorage();
    this.clearMemoryStorage();
    this.clearSessionStorage();
  }

  setCustomHeader = (str: string) => {
    this.globalStorage.set<string>(CoreStorageConstants.CUSTOM_HEADER, str);
  }

  getCustomHeader = () => {
    return this.globalStorage.get<string>(CoreStorageConstants.CUSTOM_HEADER);
  }
}
