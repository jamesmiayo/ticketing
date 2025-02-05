import { useState, useEffect, useCallback, useRef } from "react";
import echo from "../echo"; // Ensure echo is initialized globally

const useTicketTyping = (ticketId: string | null) => {
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sendTypingEvent = useCallback(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (ticketId) {
      echo.private(`channel-for-everyone.${ticketId}`).whisper("typing", {
        isTyping: true,
      });

      typingTimeoutRef.current = setTimeout(() => {
        echo.private(`channel-for-everyone.${ticketId}`).whisper("typing", {
          isTyping: false,
        });
      }, 3000);
    }
  }, [ticketId]);

  // Listen for typing events
  useEffect(() => {
    if (!ticketId) return;

    const channel = echo.private(`channel-for-everyone.${ticketId}`);

    const handleTypingEvent = (event: { isTyping: boolean }) => {
      console.log("Received whisper event:", event);
      setIsTyping(event.isTyping);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      if (event.isTyping) {
        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, 3000);
      }
    };

    channel.listenForWhisper("typing", handleTypingEvent);

    return () => {
      channel.stopListening("typing");
      echo.leaveChannel(`channel-for-everyone.${ticketId}`);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [ticketId]);

  return { isTyping, sendTypingEvent };
};

export default useTicketTyping;
