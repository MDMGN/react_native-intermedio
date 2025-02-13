import AsyncStorage from "@react-native-async-storage/async-storage";
import { Hero } from "../../domain/models/heroe";
import { StorageAdapter } from "./storage.adapter";

export class AsyncStorageAdapter implements StorageAdapter<Hero> {
  async get(key: string): Promise<Hero[]> {
    const result = await AsyncStorage.getItem(key);
    return result ? JSON.parse(result) : [];
  }
  async set(key: string, json: string): Promise<void> {
    await AsyncStorage.setItem(key, json);
  }
}
