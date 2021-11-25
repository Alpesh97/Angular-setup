import { Injectable } from '@angular/core';
import { CoreHttpService } from '../providers/core-http/core-http.service';
import { environment } from 'src/environments/environment';
import { StowageRequestModal, StoweLocationRequestModal, SubmitStoweRequestModal } from '../models/stowage.model';

@Injectable({
  providedIn: 'root'
})
export class StowageService {

  private stowageListUrl = environment.baseUrl + "awh/stowage/list";
  private stoweLocationUrl = environment.baseUrl + "awh/stowage/location";
  private stoweSubmitUrl = environment.baseUrl + "awh/stowage/submit";

  constructor(private coreHttpService: CoreHttpService) {

  }

  getStowageList = (data: StowageRequestModal) => {
    return this.coreHttpService.postRequest(this.stowageListUrl, data).pipe(response => {
      return response;
    });
  }

  getStowageLocation = (data: StoweLocationRequestModal) => {
    return this.coreHttpService.postRequest(this.stoweLocationUrl, data).pipe(response => {
      return response;
    });
  }

  submitStowe = (data: SubmitStoweRequestModal) => {
    return this.coreHttpService.postRequest(this.stoweSubmitUrl, data).pipe(response => {
      return response;
    });
  }
}
