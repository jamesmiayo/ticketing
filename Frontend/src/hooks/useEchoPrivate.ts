import { useEffect } from "react";
import echo from "../echo";

const useEchoPrivate = (channelName, eventName, callback) => {
  useEffect(() => {
    // Ensure all required parameters are defined before proceeding
    if (!echo || !channelName || !eventName || typeof callback !== "function") {
      console.warn("Echo is not initialized or parameters are invalid.");
      return;
    }

    const privateChannel = echo.private(channelName);

    // Listen for the event
    privateChannel.listen(eventName, callback);

    // Cleanup the channel when dependencies change or component unmounts
    return () => {
      privateChannel.stopListening(eventName);
      echo.leaveChannel(channelName); // Properly clean up the channel
    };
  }, [channelName, eventName, callback]);
};

export default useEchoPrivate;
