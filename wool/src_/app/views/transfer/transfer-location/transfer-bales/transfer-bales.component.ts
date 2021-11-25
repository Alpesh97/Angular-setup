import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  LocationItemModal,
  StoweLocationResponseModal,
  TransferBalesDialogRequestModal,
  TransferBalesDialogResponseModal,
} from 'src/app/models/transfer.model';
import { CoreHelperService } from 'src/app/providers/core-helper/core-helper.service';
import { CoreStorageDataService } from 'src/app/providers/core-storage/core-storage-data.service';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-transfer-bales',
  templateUrl: './transfer-bales.component.html',
  styleUrls: ['./transfer-bales.component.scss']
})
export class TransferBalesComponent implements OnInit {
  @ViewChild('transferAutocomplete') transferAutocomplete;
  @ViewChild('selectedLocationQuantity') private selectedLocationQuantityEle: ElementRef;
  public locationList: Array<StoweLocationResponseModal> = [];
  public maximumAvailableCount: number = 0;
  public isLocationLoader: boolean = false;
  private availableCount: number = 0;
  private updatedLocation: Array<LocationItemModal> = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: TransferBalesDialogRequestModal,
    public dialogRef: MatDialogRef<TransferBalesComponent>,
    public coreHelperService: CoreHelperService,
    private transferService: TransferService,
    private coreStorageDataService: CoreStorageDataService) {
    const maxCount = this.data.selectedLocationQuantity;
    this.maximumAvailableCount = maxCount;
    this.locationList = this.data.defaultLocationList;
    this.updatedLocation = this.data.updatedLocationList;
    this.availableCount = this.maximumAvailableCount;
  }

  ngOnInit(): void {
  }

  onSubmit = () => {
    if (this.coreHelperService.isStringEmptyOrWhitespace(this.data.toLocation)) {
      return;
    }
    if (this.data.selectedLocationQuantity <= 0) {
      this.coreHelperService.openErrorToaster("Please Add Valid Counts");
      return;
    }
    if (this.maximumAvailableCount < this.data.selectedLocationQuantity) {
      this.coreHelperService.openErrorToaster("Please Add Maximum " + this.maximumAvailableCount + " Counts");
      return;
    }
    if (this.availableCount < this.data.selectedLocationQuantity) {
      this.coreHelperService.openErrorToaster("Please Add Maximum " + this.availableCount + " Counts");
      return;
    }

    let data: TransferBalesDialogResponseModal = new TransferBalesDialogResponseModal({
      selectedLocationData: {
        selectedLocationSurrogate: this.data.selectedLocationSurrogate,
        location: this.data.selectedLocation,
        remainingCount: this.maximumAvailableCount - this.data.selectedLocationQuantity
      },
      toLocationData: {
        locationSurrogate: this.data.toLocationSurrogate,
        location: this.data.toLocation,
        count: this.data.selectedLocationQuantity
      }
    });
    this.dialogRef.close(data);
  }

  onSort = () => {
    let data: TransferBalesDialogResponseModal = new TransferBalesDialogResponseModal({
      selectedLocationData: {
        selectedLocationSurrogate: this.data.selectedLocationSurrogate,
        location: this.data.selectedLocation,
        remainingCount: 0
      },
      toLocationData: null
    });
    this.dialogRef.close(data);
  }

  onCancel = () => {
    this.dialogRef.close(null);
  }

  onChangeLocationSearch = (data: string) => {
    this.isLocationLoader = true;
    this.data.toLocation = "";
    this.transferService.getTransferLocation({ pageNo: 0, search: data, locationCentreCode: this.coreStorageDataService.getCentreCode(), pageSize: 1000 }, false).subscribe((response) => {
      if (!response["response"]) {
        this.coreHelperService.openErrorToaster(response["message"]);
        return;
      }
      this.locationList = response["data"];
      this.isLocationLoader = false;
    });
  }

  selectEvent = (data: StoweLocationResponseModal) => {
    this.data.toLocation = data.location;
    this.data.toLocationSurrogate = data.locationSurrogate;
    this.availableCount = data.maximumItemCount - data.locationItemCount;
    if (!this.coreHelperService.isArrayEmpty(this.updatedLocation)) {
      this.updatedLocation.forEach(item => {
        if (item.locationSurrogate === data.locationSurrogate) {
          this.availableCount = data.maximumItemCount - (data.locationItemCount + item.locationItemCount);
        }
      })
    }
  }

  openPanel = () => {
    this.transferAutocomplete.open();
  }

  ngAfterViewInit(): void {
    this.selectedLocationQuantityEle.nativeElement.select();
  }
}
