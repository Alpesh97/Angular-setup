import { Injectable } from '@angular/core';
import { CoreHttpService } from '../providers/core-http/core-http.service';
import { environment } from 'src/environments/environment';
import { BalecaptureRequestModal, BalecaptureDiscrepancyRequestModal, WoolTypeRequestModal, WoolBaleNumberRequestModal, SubmitBalecaptureRequestModal, SaveBaleRequestModal } from '../models/baleCapture.model';

@Injectable({
  providedIn: 'root'
})
export class BalecaptureService {

  private balecaptureListApiUrl = environment.baseUrl + "awh/balecapture/list";
  private decrepancyListApiUrl = environment.baseUrl + "awh/balecapture/discrepancy/list";
  private woolTypeListApiUrl = environment.baseUrl + "awh/balecapture/woolType/list";
  private woolBaleNumberListApiUrl = environment.baseUrl + "awh/balecapture/balenumber/list";
  private submitBaleCaptureUrl = environment.baseUrl + "awh/balecapture/submit";
  private checkBaleRecordApiUrl = environment.baseUrl + "awh/balecapture/select";
  private saveBaleRecordApiUrl = environment.baseUrl + "awh/balecapture/bale/save";
  private pauseBaleRecordApiUrl = environment.baseUrl + "awh/balecapture/pause";
  private cancelBaleRecordApiUrl = environment.baseUrl + "awh/balecapture/cancle";

  constructor(private coreHttpService: CoreHttpService) { }

  getBalecaptureList = (request: BalecaptureRequestModal) => {
    return this.coreHttpService.postRequest(this.balecaptureListApiUrl, request).pipe(response => {
      return response;
    });
  }

  getDiscrepancyList = (request: BalecaptureDiscrepancyRequestModal) => {
    return this.coreHttpService.postRequest(this.decrepancyListApiUrl, request).pipe(response => {
      return response;
    });
  }

  getWoolTypeList = (request: WoolTypeRequestModal) => {
    return this.coreHttpService.postRequest(this.woolTypeListApiUrl, request, false).pipe(response => {
      return response;
    });
  }

  getWoolBaleNumberList = (request: WoolBaleNumberRequestModal) => {
    return this.coreHttpService.postRequest(this.woolBaleNumberListApiUrl, request).pipe(response => {
      return response;
    });
  }

  submitBaleCapture = (baleCaptureModal: SubmitBalecaptureRequestModal) => {
    return this.coreHttpService.postRequest(this.submitBaleCaptureUrl, baleCaptureModal).pipe(response => {
      return response;
    })
  }

  checkBaleRecordAvailableOrNOt = (locationItemSurrogate: number) => {
    return this.coreHttpService.postRequest(this.checkBaleRecordApiUrl, { locationItemSurrogate: locationItemSurrogate }).pipe(response => {
      return response;
    })
  }

  saveBale = (request: SaveBaleRequestModal) => {
    return this.coreHttpService.postRequest(this.saveBaleRecordApiUrl, request).pipe(response => {
      return response;
    })
  }

  pauseBale = (locationItemSurrogate: number) => {
    return this.coreHttpService.postRequest(this.pauseBaleRecordApiUrl, { locationItemSurrogate: locationItemSurrogate }).pipe(response => {
      return response;
    })
  }

  cancelTemporarySaveBales = (locationItemSurrogate: number) => {
    return this.coreHttpService.postRequest(this.cancelBaleRecordApiUrl, { locationItemSurrogate: locationItemSurrogate }).pipe(response => {
      return response;
    })
  }

}
