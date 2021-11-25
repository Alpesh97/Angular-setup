import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthService} from './services/auth.service';
import { CoreStorageDataService } from './providers/core-storage/core-storage-data.service';
import { CoreHelperService } from 'src/app/providers/core-helper/core-helper.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from 'src/app/views/message.component';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private coreStorageDataService: CoreStorageDataService, private authService: AuthService, private coreHelperService: CoreHelperService, public matDialog: MatDialog) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.coreStorageDataService.getToken();
    let changedRequest = request;
    // HttpHeader object immutable - copy values
    const headerSettings: { [name: string]: string | string[]; } = {};

    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key);
    }
    
    if (token && this.authService.isLoggedIn()) {
      headerSettings['Authorization'] = 'Bearer ' + token;
    
    headerSettings['Content-Type'] = 'application/json';
    const newHeader = new HttpHeaders(headerSettings);

    changedRequest = request.clone({
      headers: newHeader
    });
    
    return next.handle(changedRequest);
    
    
  }else{
  
  const dialogRef = this.matDialog.open(MessageComponent, { panelClass: 'custom-popup', disableClose: true});
      dialogRef.afterClosed().subscribe(() => {

        this.coreHelperService.logout();
      });
    
  }

}
}
