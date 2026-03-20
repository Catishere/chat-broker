export const getRoomId = (serverName: string, roomId: number): string => {
  return serverName + '-' + roomId.toString();
};
