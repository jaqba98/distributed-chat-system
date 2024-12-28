// done
import { createReducer, on } from '@ngrx/store';

import { RoomAccessStoreModel } from '../model/room-access-store.model';
import { clearRoomAccess, setRoomAccess } from '../action/room-access.action';

const initialState: RoomAccessStoreModel = {
  roomAccess: undefined,
};

export const roomAccessReducer = createReducer(
  initialState,
  on(setRoomAccess, (state, { data }) => ({
    roomAccess: {
      ...state.roomAccess,
      ...data,
    },
  })),
  on(clearRoomAccess, () => ({ roomAccess: undefined }))
);
