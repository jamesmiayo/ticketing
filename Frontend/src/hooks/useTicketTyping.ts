import { useState, useEffect, useCallback, useRef } from "react";
import echo from "../echo";
import _ from "lodash";

const useTicketTyping = (ticketId: string | null) => {
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedTypingEvent = useCallback(
    _.debounce((status: boolean) => {
      if (ticketId) {
        echo.private(`channel-for-everyone.${ticketId}`).whisper("typing", {
          isTyping: status,
        });
      }
    }, 300),
    [ticketId]
  );

  const sendTypingEvent = useCallback(() => {
    if (ticketId) {
      debouncedTypingEvent(true);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        debouncedTypingEvent(false);
      }, 3000);
    }
  }, [ticketId, debouncedTypingEvent]);

  useEffect(() => {
    if (!ticketId) return;

    const channel = echo.private(`channel-for-everyone.${ticketId}`);

    const handleTypingEvent = (event: { isTyping: boolean }) => {
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
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [ticketId]);

  return { isTyping, sendTypingEvent };
};

export default useTicketTyping;
