import { useEffect } from "react";
import echo from "../echo";

const useEchoPrivate = (channelName, eventName, callback) => {
  useEffect(() => {
    if (!echo) {
      console.error("Echo is not initialized.");
      return;
    }

    const privateChannel = echo.private(channelName); 
    privateChannel.listen(eventName, callback);

    return () => {
      privateChannel.stopListening(eventName);
      echo.leave(channelName);
    };
  }, [channelName, eventName, callback]);
};

export default useEchoPrivate;
