import { useState, useEffect, useRef, useCallback } from "react";
import echo from "../echo";

interface UserTypingEvent {
  user: string;
  isTyping: boolean;
}

const usePresence = (channelName: string) => {
  const [usersOnline, setUsersOnline] = useState<string[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const typingTimeoutRef = useRef<Record<string, NodeJS.Timeout>>({});

  useEffect(() => {
    if (!echo) {
      console.error("Echo is not initialized.");
      return;
    }

    const presenceChannel = echo.join(channelName);

    // Handle presence updates
    presenceChannel.here((users: any[]) => {
      setUsersOnline(users.map((user) => user.name));
    });

    presenceChannel.joining((user: any) => {
      setUsersOnline((prevUsers) => [...prevUsers, user.name]);
    });

    presenceChannel.leaving((user: any) => {
      setUsersOnline((prevUsers) => prevUsers.filter((u) => u !== user.name));
    });

    // Handle typing events
    presenceChannel.listenForWhisper("typing", (event: UserTypingEvent) => {
      setTypingUsers((prev) =>
        event.isTyping ? [...new Set([...prev, event.user])] : prev.filter((u) => u !== event.user)
      );

      if (typingTimeoutRef.current[event.user]) {
        clearTimeout(typingTimeoutRef.current[event.user]);
      }

      if (event.isTyping) {
        typingTimeoutRef.current[event.user] = setTimeout(() => {
          setTypingUsers((prev) => prev.filter((u) => u !== event.user));
        }, 3000);
      }
    });

    return () => {
      presenceChannel.stopListening("typing");
      echo.leave(channelName);
      Object.values(typingTimeoutRef.current).forEach(clearTimeout);
    };
  }, [channelName]);

  // Function to send a typing event
  const sendTypingEvent = useCallback(
    (userName: string) => {
      echo.private(channelName).whisper("typing", { user: userName, isTyping: true });

      setTimeout(() => {
        echo.private(channelName).whisper("typing", { user: userName, isTyping: false });
      }, 3000);
    },
    [channelName]
  );

  return { usersOnline, typingUsers, sendTypingEvent };
};

export default usePresence;
