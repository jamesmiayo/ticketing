import Pusher from "pusher-js";
import Echo from "laravel-echo";

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: import.meta.env.VITE_REVERB_CONNECTION,
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: import.meta.env.VITE_REVERB_HOST,
  wsPort: import.meta.env.VITE_REVERB_PORT,
  forceTLS: import.meta.env.VITE_REVERB_SCHEME == true ? true : false,
  encrypted: import.meta.env.VITE_REVERB_ENCRYPTED == true ? true : false,
  enabledTransports:['ws', 'wss'],
});