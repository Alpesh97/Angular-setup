export class Marker {
}

export class MarkerListRequestModal {
    search: string;
    pageNo: number;
    pageSize: number;
    sortOrder: string;
    receivalCentreCode: string;
}

export class MarkerListResponseModal {
    brokerKeyId: string;
    clipBrand: string;
    baleCount: number;
    location: string;
    locationItemSurrogate: number;
    brokerName: string;
    remainingBaleCount?: number;
}

export class MarkerBaleListResponseModal {
    id: number;
    baleNumberKey: string;
    classerSpecSurrogate: number;
    lineSequenceNumber: number;
    isBlocked: string;
    isSuspended: string;
    userName: string;
    suspendedTime: string;
    baleType: string;
    folioNumberKey: string;
    saleNumberIdKey: string;
    bales: number;
    isMarked: string;
}