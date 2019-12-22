import { UserData } from '../../entities/user';

export type UserModel = {
  findByEmail: (email: string) => Promise<Required<UserData> | null>;
  findById: (userId: string) => Promise<Required<UserData> | null>;
  save: (userData: Required<UserData>) => Promise<Required<UserData>>;
  isAuthorizedToModifyColumn: (userId: string, columnId: string) => Promise<boolean>;
};
