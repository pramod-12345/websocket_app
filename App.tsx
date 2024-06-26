import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const WebsocketChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);

  // Establish WebSocket connection on component mount and clean up on unmount
  useEffect(() => {
    connectWebSocket();
    return () => {
      // Close WebSocket connection when component unmounts
      if (ws) {
        ws.close();
      }
    };
  }, []);

  // Function to establish WebSocket connection
  const connectWebSocket = () => {
    const url = 'wss://example.com/ws/chat';
    const socket = new WebSocket(url);

    // Handle WebSocket open event
    socket.onopen = () => {
      console.log('WebSocket is open now.');
    };

    // Handle incoming WebSocket messages
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const incomingMessage = {
        _id: Math.random().toString(36).substring(7),
        text: data.message,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Server',
        },
      };
      // Append new message from WebSocket to the chat
      setMessages(previousMessages => GiftedChat.append(previousMessages, [incomingMessage]));
    };

    // Handle WebSocket error event
    socket.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    // Handle WebSocket close event
    socket.onclose = (event) => {
      console.log('WebSocket is closed now:', event.reason);
    };

    // Update WebSocket state
    setWs(socket);
  };

  // Function to handle sending messages
  const onSend = (newMessages = []) => {
    // Append new message to the chat
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    // Send message through WebSocket if it's open
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ message: newMessages[0].text }));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};

export default WebsocketChatScreen;