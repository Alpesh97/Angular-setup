export interface ICoreStorageService {
  /**
   * Used to get value from storage using a key
   * @template T Type of value to be fetched from storage
   * @param {string} key Used as a handler to fetch value from storage
   * @returns {T} Value fetched from storage with the provided key
   * @memberof ICoreStorageService
   */
  get<T>(key: string): T;
  /**
   * Used to get string value from storage using a key
   * @param {string} key Used as a handler to fetch string value from storage
   * @returns {string} String value fetched from storage with the provided key
   * @memberof ICoreStorageService
   */
  getString(key: string): string;
  /**
   * Used to add value into the storage with a key
   * @template T Type of value to be stored into the storage
   * @param {string} key Used as a handler to store value into the storage
   * @param {T} value Value to be stored into the storage
   * @param {number} [expiryTime] The time in seconds in which the cookie will expire (Only used when storage is a cookie)
   * @param {string} [path] Set the path of the cookie (Only used when storage is a cookie)
   * @param {string} [domain] Set the domain of the cookie (Only used when storage is a cookie)
   * @memberof ICoreStorageService
   */
  set<T>(key: string, value: T, expiryTime?: number, path?: string, domain?: string): void;
  /**
   * Used to remove a value from storage
   * @param {string} key The key whose value has to be removed from storage
   * @param {string} path The path whose value has to be removed from storage (Only used when storage is a cookie)
   * @param {string} domain The path whose value has to be removed from storage (Only used when storage is a cookie)
   * @memberof ICoreStorageService
   */
  remove(key: string, path?: string, domain?: string): void;
  /**
   * Remove all the values from the storage
   * @memberof ICoreStorageService
   * @param {string} [path] Provide the path of the cookies to delete (Only used when storage is a cookie)
   * @param {string} [domain] Provide the domain of the cookies to delete (Only used when storage is a cookie)
   */
  removeAll(path?: string, domain?: string): void;
}
