// done
import { AccountBaseModel } from '@distributed-chat-system/shared-model';

export interface AccountDbModel extends AccountBaseModel {
  password: string;
}
