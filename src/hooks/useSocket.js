import { useEffect, useRef } from 'react';

/**
 * A custom hook to manage a WebSocket connection.
 * @param {string} url The WebSocket server URL.
 * @param {Function} onMessage A callback function to handle incoming messages.
 * @returns {object} A function to send messages.
 */
export const useSocket = (url, onMessage) => {
  const socketRef = useRef(null);
  const onMessageRef = useRef(onMessage);

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    // Check if the socket is already connected to avoid duplicates
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      return;
    }

    const socket = new WebSocket(url);
    socketRef.current = socket;

    // Handle incoming messages
    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        onMessageRef.current(message);
      } catch (e) {
        console.error('Failed to parse message:', e);
      }
    };

    // Handle socket connection open
    socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    // Handle socket errors
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Handle socket connection close
    socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event.code, event.reason);
    };

    // Clean up the socket connection on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [url]);

  /**
   * Sends a message over the WebSocket connection.
   * @param {object} message The message object to send.
   */
  const sendMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected.');
    }
  };

  return { sendMessage };
};