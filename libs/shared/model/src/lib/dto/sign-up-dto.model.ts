// done
import { AccountBaseModel } from '../base/account-base.model';

export interface SignUpDtoModel extends Omit<AccountBaseModel, 'id'> {
  password: string;
  rePassword: string;
}
