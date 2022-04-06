export default class SocketJoinRoomError extends Error {
  constructor(channelId: number) {
    super(`Error to connect channel with ${channelId}`);
    this.name = this.constructor.name;
  }
}
