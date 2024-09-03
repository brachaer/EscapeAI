import { useEffect, useState, useCallback } from "react";
import io from "socket.io-client";

const useSocket = (url) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(url);
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [url]);

  const emit = useCallback(
    (eventName, data) => {
      if (socket) socket.emit(eventName, data);
    },
    [socket]
  );

  const on = useCallback(
    (eventName, cb) => {
      if (socket) socket.on(eventName, cb);
    },
    [socket]
  );

  const off = useCallback(
    (eventName, cb) => {
      if (socket) socket.off(eventName, cb);
    },
    [socket]
  );

  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
    }
  }, [socket]);

  return { socket, emit, on, off, disconnect };
};

export default useSocket;
