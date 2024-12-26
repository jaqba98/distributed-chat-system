// done
import { createAction, props } from '@ngrx/store';

import { AccountModel } from '../model/account-store.model';

export const setAccount = createAction(
  '[Account] Set',
  props<{ data: AccountModel }>()
);

export const clearAccount = createAction('[Account] Clear');
