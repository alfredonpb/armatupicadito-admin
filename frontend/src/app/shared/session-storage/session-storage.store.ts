import { SessionStorageModel } from './index';

export class SessionStorageClass {

   /** set storage */
   public static setItem(key: string, value: any): void {
      sessionStorage.setItem(key, JSON.stringify(value)); 
   }

   /** get storage */
   public static getItem(key: string) {
      let storageData: SessionStorageModel;
      storageData = JSON.parse(sessionStorage.getItem(key));

      return  storageData;
   }

   /** remove item */
   public static remoteItem(key: string): void {
      sessionStorage.removeItem(key);
   }

}
