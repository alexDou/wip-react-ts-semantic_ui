import { createContext } from 'react';
import { Socket } from 'phoenix';

import API from '../api/endpoints';

// create socket and connect to it
export const socket = new Socket(`ws://${API.url}${API.ws_events}`);
socket.connect();

// Join correct channel and log events
export const channel = socket.channel("events", {});
channel.join();

export default createContext<any>(null);
