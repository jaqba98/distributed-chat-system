// done
import { TokenDtoModel } from './token-dto.model';

export interface AccountDtoModel extends TokenDtoModel {
  id: number;
  email: string;
}
