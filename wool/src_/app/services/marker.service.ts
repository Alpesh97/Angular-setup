import { Injectable } from '@angular/core';
import { CoreHttpService } from '../providers/core-http/core-http.service';
import { environment } from 'src/environments/environment';
import { MarkerListRequestModal } from '../models/marker.model';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  private markerListApiUrl = environment.baseUrl + "awh/marker/list";
  private markerBaleListApiUrl = environment.baseUrl + "awh/marker/bale/list";
  private markBaleApiUrl = environment.baseUrl + "awh/marker/bale";
  constructor(private coreHttpService: CoreHttpService) { }

  getMarkerList = (request: MarkerListRequestModal) => {
    return this.coreHttpService.postRequest(this.markerListApiUrl, request).pipe((response => {
      return response;
    }));
  }

  getMarkerBaleList = (locationItemSurrogate: number) => {
    return this.coreHttpService.postRequest(this.markerBaleListApiUrl, { locationItemSurrogate: locationItemSurrogate }).pipe((response => {
      return response;
    }));
  }

  markBale = (unlottedBaleId: number, isSubmit: string = "N") => {
    return this.coreHttpService.postRequest(this.markBaleApiUrl, { unlottedBaleId: unlottedBaleId, isSubmit: isSubmit }).pipe((response => {
      return response;
    }));
  }
}
