import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class CorePwaService {

  public promptEvent: any;
  constructor(private swUpdate: SwUpdate) {
    this.swUpdate.available.subscribe(event => {
      if (this.askUserToUpdate()) {
        window.location.reload();
      }
    });
  }

  private askUserToUpdate(): boolean {
    return true;
  }
}
