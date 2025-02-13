export interface StorageAdapter<T> {
  get: (key: string) => Promise<T[]>;
  set: (key: string, obj: string) => Promise<void>;
}
