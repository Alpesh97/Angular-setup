export class ConstantKey {
    public static readonly SESSION_STORAGE = 'SESSION_STORAGE';
    public static readonly LOCAL_STORAGE = 'LOCAL_STORAGE';
    public static readonly MEMORY_STORAGE = 'MEMORY_STORAGE';
}

export enum StorageType {
    Local,
    Session,
    Memory
}
