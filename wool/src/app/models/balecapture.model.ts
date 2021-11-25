export class Balecapture {
}

export class BalecaptureRequestModal {
    search?: string;
    pageNo: number;
    pageSize: number;
    sortOrder: string;
    receivalCentreCode: string;
}

export class BalecaptureResponseModal {
    id: { locationItemSurrogate: number };
    changed: string;
    idPk: number;
    locationItemCount: string;
    locationItemKey: string;
    locationItemPlacement: string;
    locationItemType: string;
    locationSurrogate: number;
    brokerKeyId: string;
    clipBrand: string;
    locationItemSurrogate: number;
    woolNumberKey: string;
    clipCodeKey: string;
    location: string;
    brokerName: string;
    receivalCentreCode:string;
}

export class BalecaptureDiscrepancyRequestModal {
    brokerIdKey: string;
    pageNo: number;
}

export class BalecaptureDiscrepancyResponseModal {
    id: {
        bisStatisticClass: string;
        bisStatisticType: string;
        brokerIdKey: string;
        centreCodeKey: string;
        stateCodeKey: string;
    };
    changed: string;
    date00001: string;
    idPk: string;
    bisStatisticDescription: string;
    changeDate: string;
    changeUserId: string;
    chargeCodeKey: string;
    genClipActivityCharge: string;
    rateSequenceKey: number;
    bisStatisticType: string;
    bisStatisticClass: string;
    centreCodeKey: string;
    brokerIdKey: string;
    stateCodeKey: string;
    isSelected?: boolean;
}

export class WoolTypeRequestModal {
    brokerIdKey: string;
    stateCodeKey: string;
    receivalCentreCode: string;
    search: string;
    pageNo: number;
    pageSize: number;
}

export class WoolTypeResponseModal {
    id: {
        baleDescriptionKey: string;
        brokerIdKey: string;
        centreCodeKey: string;
        stateCodeKey: string;
    };
    changed: string;
    idPk: string;
    standardBaleDescKey: string;
    woolGroupDescription: string;
    brokerIdKey: string;
    centreCodeKey: string;
    stateCodeKey: string;
    baleDescriptionKey: string;
}

export class WoolBaleNumberRequestModal {
    brokerIdKey: string;
    stateCodeKey: string;
    receivalCentreCode: string;
    woolNumberKey: string;
    clipCodeKey: string;
    locationItemSurrogate: number
}

export class WoolBaleNumberResponseModal {
    id: number;
    baleNumberKey: string;
    baleDescriptionKey: string;
    bisStatisticType?: string;
}

export class SubmitBalecaptureRequestModal {
    brokerIdKey: string;
    stateCodeKey: string;
    receivalCentreCode: string;
    woolNumberKey: string;
    clipCodeKey: string;
    locationItemSurrogate: string;
}

export class BalesModal {
    baleNumberKey: string;
    baleDescriptionKey: string;
    bisStatisticType: string;
}

export class BalesListModal extends BalesModal {
    id?: number;
    isPermanentFill: boolean;
    isTemporaryFill: boolean;
    isSelected: boolean;
    isShowTooltip: boolean;
    tooltipPosition: string;
}

export class SaveBaleRequestModal {
    brokerIdKey: string;
    stateCodeKey: string;
    receivalCentreCode: string;
    woolNumberKey: string;
    clipCodeKey: string;
    locationItemSurrogate: string;
    baleNumberKey: string;
    baleDescriptionKey: string;
    bisStatisticType: string;
    addOrRemove: string;
}