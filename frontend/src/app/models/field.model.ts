import { TypeField, User } from './index';

export interface Field {
   id: number;
   name: string;
   qt_players: number;
   enabled: boolean;
   type_field_id: number;
   types_field: TypeField;
   created_by: number;
   creator: User;
}