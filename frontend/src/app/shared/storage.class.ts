interface StorageInterface {
   name: string;
   lastname: string;
   email: string;
   phone: string;
   profile_id: number;
   token: string;
}

export class Storage {

   /** set storage */
   public static setItem(key: string, value: any): void {
      sessionStorage.setItem(key, JSON.stringify(value)); 
   }

   /** get storage */
   public static getItem(key: string) {
      let storageData: StorageInterface;
      storageData = JSON.parse(sessionStorage.getItem(key));

      return  storageData;
   }

   /** remove item */
   public static remoteItem(key: string): void {
      sessionStorage.removeItem(key);
   }

}
