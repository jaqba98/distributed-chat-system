// done
export interface SocketDtoModel {
  counter: number;
  accountIds: number[];
}

export interface SocketsDtoModel {
  sockets: Record<string, SocketDtoModel>;
}
