import { singleton } from 'tsyringe';

@singleton()
export class UserRoomsStore {
  data = new Map();
}
