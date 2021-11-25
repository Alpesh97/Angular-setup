import { ICoreStorageService } from './core-storage.service';

export class CoreLocalStorageService implements ICoreStorageService {

  constructor(private storage: Storage) { }
  public get<T>(key: string): T {
    try {
      return this.deserializeObject<T>(this.storage.getItem(key));
    } catch {
      return null;
    }
  }

  public getString(key: string): string {
    return this.storage.getItem(key);
  }

  public set<T>(key: string, value: T): void {
    this.storage.setItem(key, this.serializeObject(value));
  }

  public remove(key: string): void {
    this.storage.removeItem(key);
  }

  public removeAll(): void {
    this.storage.clear();
  }

  private serializeObject<T>(object: T) {
    return JSON.stringify(object);
  }

  private deserializeObject<T>(jsonString: string) {
    return JSON.parse(jsonString) as T;
  }
}
