import Pusher from "pusher-js";
import Echo from "laravel-echo";

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: import.meta.env.VITE_REVERB_CONNECTION,
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: import.meta.env.VITE_REVERB_HOST,
  wsPort: import.meta.env.VITE_REVERB_PORT,
  forceTLS: import.meta.env.VITE_REVERB_SCHEME === "true",
  encrypted: import.meta.env.VITE_REVERB_ENCRYPTED === "true",
  enabledTransports: ["ws", "wss"],
  // authEndpoint: import.meta.env.VITE_BASE_URL + "broadcasting/auth", 
  // withCredentials: true, 
  // auth: {
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  //     Accept: "application/json",
  //   },
  // },
});

export default echo;


