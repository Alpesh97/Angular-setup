import { Injectable } from '@angular/core';
import { CoreHttpService } from '../providers/core-http/core-http.service';
import { environment } from 'src/environments/environment';
import { TransferRequestModal, StoweLocationRequestModal, SubmitStoweRequestModal } from '../models/transfer.model';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  private transferListUrl = environment.baseUrl + "awh/transfer/list";
  private stoweLocationUrl = environment.baseUrl + "awh/stowage/location";
  private stoweSubmitUrl = environment.baseUrl + "awh/transfer/submit";

  constructor(private coreHttpService: CoreHttpService) {

  }

  getTransferList = (data: TransferRequestModal) => {
    return this.coreHttpService.postRequest(this.transferListUrl, data).pipe(response => {
      return response;
    });
  }

  getTransferLocation = (data: StoweLocationRequestModal, showSpinner: boolean = true) => {
    return this.coreHttpService.postRequest(this.stoweLocationUrl, data, showSpinner).pipe(response => {
      return response;
    });
  }

  submitStowe = (data: SubmitStoweRequestModal) => {
    return this.coreHttpService.postRequest(this.stoweSubmitUrl, data).pipe(response => {
      return response;
    });
  }
}
