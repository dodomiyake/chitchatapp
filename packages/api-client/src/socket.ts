import { io, type Socket } from 'socket.io-client';

export type CreateSocketClientOptions = {
  url: string;
};

/**
 * Transport-only socket factory for later milestones.
 * M1 does not join rooms or send messages.
 */
export function createSocketClient(options: CreateSocketClientOptions): Socket {
  return io(options.url, {
    autoConnect: false,
    withCredentials: true,
    transports: ['websocket', 'polling'],
  });
}
