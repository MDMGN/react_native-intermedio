import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageAdapter } from "./storage.adapter";

export class AsyncStorageAdapter<T> implements StorageAdapter<T> {
  async get(key: string): Promise<T> {
    const result = await AsyncStorage.getItem(key);
    return result ? JSON.parse(result) : [];
  }
  async set(key: string, json: string): Promise<void> {
    await AsyncStorage.setItem(key, json);
  }
}
