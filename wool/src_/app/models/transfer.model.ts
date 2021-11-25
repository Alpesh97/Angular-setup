export class Transfer {
}

export class TransferRequestModal {
    search?: string;
    pageNo: number;
    pageSize: number;
    sort: Array<{ column: string; sortOrder: string }>;
    receivalCentreCode: string;
}

export class TransferResponseModal {
    id: {
        locationItemSurrogate: number;
    };
    changed: string;
    idPk: number;
    locationItemCount: number;
    locationItemKey: string;
    locationItemPlacement: string;
    locationItemType: string;
    locationSurrogate: number;
    brokerKeyId: string;
    clipBrand: string;
    stateCodeKey: string;
    centreCodeKey: string;
    woolNumberKey: string;
    clipCodeKey: string;
    location: string;
    brokerName: string;
    locationItemSurrogate: number;
    receivalCentreCode: string;
}

export class StoweLocationRequestModal {
    search?: string;
    locationCentreCode: string;
    pageNo?: number;
    pageSize?: number;
}

export class StoweLocationResponseModal {
    id: { locationSurrogate: number };
    changed: string;
    idPk: number;
    containerSurrogate: number;
    location: string;
    locationBarcode: string;
    locationCentreCode: string;
    locationItemCount: number;
    locationItemType: string;
    locationLength: number;
    maximumItemCount: number;
    locationPickingSequence: number;
    locationType: string;
    locationWidth: number;
    managerLocationSgt: number;
    locationItemList: Array<LocationListModal>;
    locationSurrogate: number;
    ycoOrdinate: number;
    zcoOrdinate: number;
    xcoOrdinate: number;
    temporaryAddedCount?: number = 0;
    locationItemGroupList?: Array<{ clipBrand: string, locationItemCount: number }>;
}

export class LocationListModal {
    id: { locationItemSurrogate: number };
    changed: string;
    idPk: number;
    locationItemCount: number;
    locationItemKey: string;
    locationItemPlacement: string;
    locationItemType: string;
    locationSurrogate: number;
    brokerKeyId: string;
    clipBrand: string;
    locationItemSurrogate: number;
}

export class SubmitStoweRequestModal {
    locationCentreCode: string;
    locationItemSurrogate: string;
    transferType: string;
    locationItems: Array<LocationItemModal>;
}

export class LocationItemModal {
    locationSurrogate: number;
    locationItemCount: number;
}


export class TransferBalesDialogRequestModal {
    selectedLocationSurrogate: number;
    selectedLocationQuantity: number;
    selectedLocation: string;
    toLocation?: string;
    toLocationSurrogate?: number;
    defaultLocationList: Array<StoweLocationResponseModal>;
    updatedLocationList: Array<LocationItemModal>;
    public constructor(init?: Partial<TransferBalesDialogRequestModal>) {
        Object.assign(this, init);
    }
}
export class TransferBalesDialogResponseModal {
    selectedLocationData: {
        selectedLocationSurrogate: number;
        remainingCount: number,
        location: string
    };
    toLocationData: {
        count: number,
        location: string;
        locationSurrogate: number;
    };
    public constructor(init?: Partial<TransferBalesDialogResponseModal>) {
        Object.assign(this, init);
    }
}