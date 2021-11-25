export class Receival {
}


export class BrandDetails {
    id: {
        brokerIdKey: string;
        clipCodeKey: string;
        woolNumberKey: String;
    };
    changed: string;
    idPk: number;
    clipBrand: string;
    receivalActivity: string;
    clipCodeKey: string;
    woolNumberKey: string;
    brokerIdKey: string;

    public constructor(init?: Partial<BrandDetails>) {
        Object.assign(this, init);
    }
}
export class ClientAccountDetails {
    id: {
        brokerIdKey: string;
        clientAccountIdKey: string;
    };
    changed: string;
    idPk: number;
    last00001: string;
    accountAddressLine1: string;
    accountAddressLine2: string;
    accountAddressLine3: string;
    accountAddressPostcode: string;
    accountAddressState: string;
    accountAlphaSearchCode: String;
    accountFound: string;
    accountName: string;
    accountSortInitial: string;
    accountSortSurname: string;
    accountStatusCode: string;
    accountTitle: string;
    acctControlCostCentre: string;
    agentInfluenceNumber: string;
    clientAddressLine1: string;
    clientAddressLine2: string;
    clientAddressLine3: string;
    clientAddressPostcode: string;
    clientAddressState: string;
    clientName: string;
    clientSortInitial: string;
    clientSortSurname: string;
    clientStatusCode: string;
    clientTitle: string;
    clientTypeCode: string;
    cltControlCostCentre: string;
    dateLastUpdated: string;
    districtWoolManager: string;
    newAccount: string;
    physicalCostCentreId: string;
    politicalStateClient: string;
    propControlCostCentre: string;
    propertyAddressLine1: string;
    propertyAddressLine2: string;
    propertyAddressLine3: string;
    propertyAddressPostcode: string;
    propertyAddressState: string;
    propertyAreaQuantity: string;
    propertyAreaUnitType: string;
    propertyId: string;
    propertyName: string;
    propertySortName: string;
    propertyTerritoryId: string;
    ratePerBale: string;
    salespersonName: string;
    salespersonUserId: string;
    territoryId: string;
    vfgaLevyCharged: string;
    woolNumberKey: string;
    accountSaleClipFormat: string;
    buyerCentreCode: string;
    buyerCode: string;
    changeDate: string;
    changeUserId: string;
    earlyWoolPayment: string;
    electronicTransferAddr: string;
    extraAddress: string;
    faxNumber: string;
    offerringLetterRequired: string;
    phoneNumber: string;
    publicityAreaCodeKey: string;
    receivalBaleWeightsRqd: string;
    shearingMonth: string;
    suppresAwexId: string;
    woolNumberType: string;
    woolStatisticalAreaCde: string;
    clientAccountIdKey: string;
    brokerIdKey: string;

    public constructor(init?: Partial<ClientAccountDetails>) {
        Object.assign(this, init);
    }
}

export class Carrier {
    id: {
        receivalCarrierSgt: number;
    };
    changed: string;
    idPk: number;
    last00001: string;
    carrierName: string;
    dateOfLastReceival: string;
    receivalCentre: String;
    receivalCarrierSgt: number;
}

export class BrokerRequestModal {
    search?: string;
    receivalCentreCode: string;
    pageNo?: number;

    public constructor(init?: Partial<BrokerRequestModal>) {
        Object.assign(this, init);
    }
}

export class BrokerResponseModal {
    id: number;
    receivalCentreCode: string;
    brokerIdKey: string;
    stateCodeKey: string;
    centreCodeKey: string;
    entityDescription: string;
    public constructor(init?: Partial<BrokerResponseModal>) {
        Object.assign(this, init);
    }
}

export class BrandRequestModal {
    clipBrand?: string;
    brokerIdKey: string;
    pageNo?: number;
    centreCodeKey: string;
    stateCodeKey: string;
    public constructor(init?: Partial<BrandRequestModal>) {
        Object.assign(this, init);
    }
}

export class BrandResponseModal {
    brand: BrandDetails;
    clientAccountDetails: ClientAccountDetails;
    clipBrand: string;
    isBold: boolean;
    public constructor(init?: Partial<BrandResponseModal>) {
        Object.assign(this, init);
    }
}

export class CarrierRequestModal {
    carrierName?: string;
    centreCodeKey: string;
    pageNo?: number;

    public constructor(init?: Partial<CarrierRequestModal>) {
        Object.assign(this, init);
    }
}

export class CarrierResponseModal {
    id: { receivalCarrierSgt: number };
    changed: string;
    idPk: number;
    last00001: string;
    carrierName: string;
    dateOfLastReceival: string;
    receivalCentre: string;
    receivalCarrierSgt: number;

    public constructor(init?: Partial<CarrierResponseModal>) {
        Object.assign(this, init);
    }
}

export class QualitySchemeResponseModal {
    id: { clipPreparationWiCode: string };
    changed: string;
    idPk: number;
    printRegistration: string;
    qualitySchemeDesc: string;
    qualitySchemeShortName: string;
    registrationRequired: string;
    clipPreparationWiCode: string;

    public constructor(init?: Partial<QualitySchemeResponseModal>) {
        Object.assign(this, init);
    }
}

export class CommentResponseModal {
    id: number;
    comment: string;

    public constructor(init?: Partial<CommentResponseModal>) {
        Object.assign(this, init);
    }
}

export class ReceivalRequestModal {
    actualCount: number;
    numberOfBags: number;
    brokerIdKey: string;
    stateCodeKey: string;
    centreCodeKey: string;
    clipBrand: string;
    clipCodeKey?: string;
    woolNumberKey: string;
    carrierName: string;
    receivalCarrierSgt?: string;
    receivedByUser: string;
    classerRegistrationNbr: string;
    classerSpecReceived?: boolean;
    qualityScheme: string;
    comment?: string;
    receivalCentreCode: string;

    public constructor(init?: Partial<ReceivalRequestModal>) {
        Object.assign(this, init);
    }
}

export class ReceivalResponseModal {
    id: number;
    inputReceivalAdvice: ReceivalResponseIdModal;
    pdfLink: string;
    mobileNumber: number;
    email: string;
    public constructor(init?: Partial<ReceivalResponseModal>) {
        Object.assign(this, init);
    }
}

export class ReceivalResponseIdModal {
    inputPcNumberKey: string;
    inputUserKey: string;
    transmissionDateKey: string;
    transmissionNumberKey: number;
    transmissionTimeKey: string;
    public constructor(init?: Partial<ReceivalResponseIdModal>) {
        Object.assign(this, init);
    }
}

export class ReceivalAdviceModal {
    email: string;
    phoneNumber: string;

    public constructor(init?: Partial<ReceivalAdviceModal>) {
        Object.assign(this, init);
    }

}

export interface ReceivalAdviceRequestModal extends ReceivalAdviceModal, ReceivalResponseIdModal {
    receivalAdvicePdfLink: string;
    printReceivalAdvice: string;
    id: number;
}
