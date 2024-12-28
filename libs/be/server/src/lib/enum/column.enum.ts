// done
export enum ColumnAccountsEnum {
  id = 'id',
  nick = 'nick',
  email = 'email',
  password = 'password',
}

export enum ColumnBlockedTokensEnum {
  id = 'id',
  token = 'token',
}

export enum ColumnRoomsEnum {
  id = 'id',
  name = 'name',
  password = 'password',
  ownerId = 'ownerId',
  ownerNick = 'ownerNick',
}

export enum ColumnSocketsEnum {
  id = 'id',
  socketId = 'socketId',
  roomName = 'roomName',
  accountId = 'accountId',
}
