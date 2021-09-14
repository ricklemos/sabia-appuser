import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  Window: any = window;

  constructor() {
  }

  public deviceEnvironment(): string {
    if (
      window &&
      typeof this.Window.NativeInterface !== 'undefined' &&
      this.Window.NativeInterface
    ) {
      return 'ANDROID';
    } else if (
      window &&
      typeof this.Window.webkit !== 'undefined' &&
      this.Window.webkit.messageHandlers &&
      this.Window.webkit.messageHandlers.NativeInterface
    ) {
      return 'IOS';
    } else {
      return 'WEB';
    }
  }

  public setItem(index, value): void {
    const env = this.deviceEnvironment();
    switch (env) {
      case 'ANDROID':
      case 'WEB':
        localStorage.setItem(index, value);
        break;
      case 'IOS':
        prompt(JSON.stringify({ action: 'setItem', key: index, val: value }));
        break;
    }
  }

  public removeItem(index): void {
    const env = this.deviceEnvironment();
    switch (env) {
      case 'ANDROID':
      case 'WEB':
        localStorage.removeItem(index);
        break;
      case 'IOS':
        prompt(JSON.stringify({ action: 'removeItem', key: index }));

        break;
    }
  }

  public getItem(index): any {
    const env = this.deviceEnvironment();
    let getItem;
    switch (env) {
      case 'ANDROID':
      case 'WEB':
        getItem = localStorage.getItem(index);
        break;
      case 'IOS':
        getItem = prompt(JSON.stringify({ action: 'getItem', key: index }));
        break;
    }

    return getItem;
  }

  public clearAll(): void {
    const env = this.deviceEnvironment();
    switch (env) {
      case 'ANDROID':
      case 'WEB':
        localStorage.clear();
        break;
      case 'IOS':
        localStorage.clear();
        break;
    }
  }


}
