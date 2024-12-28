// done
export interface SocketDtoModel {
  counter: number;
}

export interface SocketsDtoModel {
  sockets: Record<string, SocketDtoModel>;
}
