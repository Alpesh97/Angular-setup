export class ConstantKey {
    public static readonly STRINGLIMITSHORT = 25;
    public static readonly STRINGLIMITLONG = 30;
}

export class ToasterConfiguration {
    duration: number;
    horizontalPosition: 'start' | 'center' | 'end' | 'left' | 'right';
    verticalPosition: 'top' | 'bottom';
    panelClass?: string | string[];
}

