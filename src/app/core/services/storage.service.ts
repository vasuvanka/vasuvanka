import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage = localStorage

  async getItem(key: string): Promise<string> {
    return this.storage.getItem(key)
  }
  async setItem(key: string, value: string): Promise<void> {
    return this.storage.setItem(key, value)
  }
  async removeItem(key: string): Promise<void> {
    this.storage.removeItem(key)
  }
  async clear(): Promise<void> {
    this.storage.clear()
  }
}
