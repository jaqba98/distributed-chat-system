import { AccountBaseModel } from '../base/account-base.model';

// done
export interface SignInDtoModel extends Pick<AccountBaseModel, 'email'> {
  password: string;
}
