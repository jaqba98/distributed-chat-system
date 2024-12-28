// done
import { createAction, props } from '@ngrx/store';

import { RoomAccessBaseModel } from '@distributed-chat-system/shared-model';

export const setRoomAccess = createAction(
  '[Room access] Set',
  props<{ data: RoomAccessBaseModel }>()
);

export const clearRoomAccess = createAction('[Room access] Clear');
