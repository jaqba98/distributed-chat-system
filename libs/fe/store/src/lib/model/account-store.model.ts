// done
export interface AccountModel {
  id: number;
  nick: string;
  email: string;
}

export interface AccountStoreModel {
  account?: AccountModel;
}
