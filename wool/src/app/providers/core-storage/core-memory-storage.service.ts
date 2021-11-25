import { ICoreStorageService } from './core-storage.service';

export class CoreMemoryStorageService implements ICoreStorageService {

  private storage: Map<string, any> = new Map<string, any>();

  get<T>(key: string): T {
    if (!this.storage.has(key)) {
      return null;
    }
    return this.storage.get(key);
  }

  getString(key: string): string {
    return this.storage.get(key);
  }

  set<T>(key: string, value: T): void {
    this.storage.set(key, value);
  }

  remove(key: string): void {
    this.storage.delete(key);
  }

  removeAll(): void {
    this.storage.clear();
  }
}
