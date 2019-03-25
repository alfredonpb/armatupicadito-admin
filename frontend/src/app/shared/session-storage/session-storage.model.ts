import { Profile } from '../../models/index';

export interface SessionStorageModel {
   name: string;
   lastname: string;
   email: string;
   phone: string;
   profile_id: number;
   profile: Profile;
   token: string;
}