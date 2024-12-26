// done
import { createAction, props } from '@ngrx/store';

import { AccountBaseModel } from '@distributed-chat-system/shared-model';

export const setAccount = createAction(
  '[Account] Set',
  props<{ data: AccountBaseModel }>()
);

export const clearAccount = createAction('[Account] Clear');
