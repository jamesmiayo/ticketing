import { useEffect } from "react";

const useEchoPrivate = (channelName:any, eventName:any, callback:any) => {
  useEffect(() => {
    if (!window.Echo) {
      console.error("Echo is not initialized.");
      return;
    }

    const privateChannel = window.Echo.channel(channelName);

    privateChannel.listen(eventName, callback);

    return () => {
      privateChannel.stopListening(eventName, callback);
      window.Echo.leave(channelName);
    };
  }, [channelName, eventName, callback]);
};

export default useEchoPrivate;