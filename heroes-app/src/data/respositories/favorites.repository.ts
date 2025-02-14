import { Favorite } from "../../domain/models/favorite";
import { StorageAdapter } from "../../infrastructure/storage/storage.adapter";

export class FavoritesRepository {
  constructor(private storageAdapter: StorageAdapter<Favorite[]>) {}
  async get(key: string) {
    const result = await this.storageAdapter.get(key);
    return result;
  }
  async set(key: string, json: string) {
    this.storageAdapter.set(key, json);
  }
}
