import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import {
  BrandRequestModal,
  BrokerRequestModal,
  CarrierRequestModal,
  ReceivalAdviceRequestModal,
  ReceivalRequestModal,
} from '../models/receival.model';
import { CoreHttpService } from '../providers/core-http/core-http.service';

@Injectable({
  providedIn: 'root'
})
export class ReceivalService {

  private url = environment.baseUrl + 'awh/receival/defaultReceival'; // URL to web api
  private searchBrandUrl = environment.baseUrl + "awh/brand/get";
  private searchBrokerUrl = environment.baseUrl + "awh/broker/get";
  private searchCarrierUrl = environment.baseUrl + "awh/carrier/get";
  private getQualitySchemeUrl = environment.baseUrl + "awh/qualityscheme/get";
  private getCommentsUrl = environment.baseUrl + "awh/comments/get";
  private addReceivalUrl = environment.baseUrl + "awh/receival/addReceival";
  private addReceivalAdviceUrl = environment.baseUrl + "awh/receival/advice";
  private addReceivalAdviceCancelUrl = environment.baseUrl + "awh/receival/sendBrokerReceivalEmail";

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };

  constructor(private http: HttpClient, private coreHttpService: CoreHttpService) { }

  getBranchByBrokerId = (data: BrandRequestModal) => {
    return this.coreHttpService.postRequest(this.searchBrandUrl, data, false).pipe(response => {
      return response;
    });
  }

  getBrokerBySearch = (data: BrokerRequestModal) => {
    return this.coreHttpService.postRequest(this.searchBrokerUrl, data).pipe(response => {
      return response;
    });
  }

  getCarrierByName = (data: CarrierRequestModal) => {
    return this.coreHttpService.postRequest(this.searchCarrierUrl, data, false).pipe(response => {
      return response;
    });
  }

  getQualitySchemes = (brokerIdKey: string) => {
    return this.coreHttpService.postRequest(this.getQualitySchemeUrl, { brokerIdKey: brokerIdKey }).pipe(response => {
      return response;
    })
  }

  getComments = () => {
    return this.coreHttpService.getRequest(this.getCommentsUrl).pipe(response => {
      return response;
    })
  }

  addReceival = (data: ReceivalRequestModal) => {
    return this.coreHttpService.postRequest(this.addReceivalUrl, data).pipe(response => {
      return response;
    });
  }

  getReceivalAdvise = (data: ReceivalAdviceRequestModal) => {
    return this.coreHttpService.postRequest(this.addReceivalAdviceUrl, data).pipe(response => {
      return response;
    });
  }
   
  getReceivalAdviceCancel  = (data: ReceivalAdviceRequestModal) => {
    return this.coreHttpService.postRequest(this.addReceivalAdviceCancelUrl, data).pipe(response => {
      return response;
    });
  }
}
