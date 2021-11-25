import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CoreStorageDataService } from '../core-storage/core-storage-data.service';
import { ToasterConfiguration } from './core-helper.classes';

@Injectable({
  providedIn: 'root'
})
export class CoreHelperService {
  public isLoading = new Subject<boolean>();
  private menuSystemUrl: string = environment.menuSystemUrl;

  constructor(private titleService: Title,
    private coreStorageDataService: CoreStorageDataService,
    private snackBar: MatSnackBar) { }

  setBrowserTabTitle = (title: string) => {
    this.titleService.setTitle(title);
  }

  isNullOrUndefined<T>(tObj: T): boolean {
    return tObj === null || tObj === undefined;
  }

  isNullOrUndefinedMultiple(...tObj): boolean {
    return !tObj.every((tEntry) => tEntry !== null && tEntry !== undefined);
  }

  isStringEmptyOrWhitespace(stringToParse: string) {
    return this.isNullOrUndefined(stringToParse) || stringToParse.trim() === '';
  }

  isArrayEmpty<T>(tArr: T[]): boolean {
    return this.isNullOrUndefined(tArr) || tArr.length <= 0;
  }

  removeAllWhiteSpaces = (text: string) => {
    return text.replace(/\s/g, '');
  }

  snakeCaseToLowerCase = (text: string) => {
    return text.replace(/\_/g, '');
  }

  openSuccessToaster = (message: string, config: ToasterConfiguration = { duration: 5000, horizontalPosition: "center", verticalPosition: "top", panelClass: "green-snackbar" }) => {
    this.snackBar.open(message, "", { ...config });
  }

  openErrorToaster = (message: string, config: ToasterConfiguration = { duration: 5000, horizontalPosition: "center", verticalPosition: "top", panelClass: "red-snackbar" }) => {
    if(!message || message == ''){
       message = "An unknown error has ocurred";
    }
    this.snackBar.open(message, "", { ...config });
  }

  showSpinner(isShow: boolean = true) {
    this.isLoading.next(isShow);
  }

  hideSpinner() {
    this.isLoading.next(false);
  }

  checkIsDesktopScreen = (): boolean => {
    return window.innerWidth > 991;
  }

  goToMenuSystem = (path?: string) => {
    if (!this.isStringEmptyOrWhitespace(path)) {
      window.location.replace(this.menuSystemUrl + path);
      return;
    }
    window.location.replace(this.menuSystemUrl);
  }

  logout = () => {
    this.coreStorageDataService.clearAllStorage();
    this.goToMenuSystem();
  }
}

