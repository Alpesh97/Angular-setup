export class Stowage {
}

export class StowageRequestModal {
    search?: string;
    pageNo: number;
    pageSize: number;
    sort: Array<{ column: string, sortOrder: string }>;
    locationCentreCode: string;
}

export class StowageResponseModal {
    idPk: number;
    inputPcNumberKey: string;
    inputUserKey: string;
    transmissionDateKey: string;
    transmissionNumberKey: number;
    transmissionTimeKey: string;
    altMarketingBroker: string;
    altMarketingCentre: string;
    altMarketingState: string;
    bagsEstimated: number;
    bagsReceived: number;
    balesCreatedDate: string;
    balesEstimated: number;
    balesReceived: number;
    bisExtractFlag: string;
    brokerIdKey: string;
    centreCodeKey: string;
    changeDate: string;
    changeProgram: string;
    changeUserId: string;
    classerRegistrationNbr: string;
    clipBrand: string;
    clipCodeKey: string;
    dateEntered: string;
    headerCreatedDate: string;
    headerCreatedTime: string;
    inputSequenceNumber: number;
    inputStatus: string;
    receivalAdvicePrinted: string;
    receivalBrokerId: string;
    receivalCarrierSgt: number;
    receivalCentreCode: string;
    receivalMethod: string;
    receivalStateCode: string;
    receivedByUser: string;
    sortationMode: string;
    stateCodeKey: string;
    storeAnalysisUpdateDte: string;
    woolNumberKey: string;
    isStowed: string;
    qualitySchema: {
        id: {
            clipPreparationWiCode: string;
        },
        changed: string;
        idPk: number,
        printRegistration: string;
        qualitySchemeDesc: string;
        qualitySchemeShortName: string;
        registrationRequired: string;
        clipPreparationWiCode: string;
    };
    receivalComment: string;
    locationItemSize: number;
    carrierName: string;
    brokerName: string;
    locationItem: []
}

export class StowageResponseIdData {
    inputPcNumberKey: string;
    inputUserKey: string;
    transmissionDateKey: string;
    transmissionNumberKey: string;
    transmissionTimeKey: string;
}

export class StoweLocationRequestModal {
    search?: string;
    locationCentreCode: string;
    pageNo?: number;
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
    idPk?: number;
    locationCentreCode: string;
    locationItems: Array<LocationItemModal>;
}

export class LocationItemModal {
    locationSurrogate: number;
    locationItemCount: number;
}
