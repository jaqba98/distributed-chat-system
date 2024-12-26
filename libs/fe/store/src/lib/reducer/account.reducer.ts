// done
import { createReducer, on } from '@ngrx/store';

import { AccountStoreModel } from '../model/account-store.model';
import { clearAccount, setAccount } from '../action/account.action';

export const initialState: AccountStoreModel = {
  account: undefined,
};

export const accountReducer = createReducer(
  initialState,
  on(setAccount, (state, { data }) => ({
    account: {
      ...state.account,
      ...data,
    },
  })),
  on(clearAccount, () => ({ account: undefined }))
);
