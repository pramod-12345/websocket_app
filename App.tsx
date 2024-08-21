import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const WebsocketChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);

  // Function to establish WebSocket connection
  const connectWebSocket = useCallback(() => {
    const url = 'wss://example.com/ws/chat';
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log('WebSocket connection established');
      Alert.alert('Connected', 'Chat connection is now live');
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const incomingMessage = {
          _id: Math.random().toString(36).substring(7),
          text: data.message,
          createdAt: new Date(),
          user: { _id: 2, name: 'Server' },
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, [incomingMessage]));
      } catch (error) {
        console.error('Error parsing incoming message:', error);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      Alert.alert('Connection Error', 'Failed to connect to chat server');
    };

    socket.onclose = (event) => {
      console.log('WebSocket closed:', event.code, event.reason);
      Alert.alert('Disconnected', `Chat disconnected: ${event.reason || 'Unknown reason'}`);
      // Attempt to reconnect after a delay
      setTimeout(connectWebSocket, 5000);
    };

    setWs(socket);
  }, []);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (ws) {
        console.log('Closing WebSocket connection');
        ws.close();
      }
    };
  }, [connectWebSocket]);

  const onSend = useCallback((newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    if (ws && ws.readyState === WebSocket.OPEN) {
      try {
        ws.send(JSON.stringify({ message: newMessages[0].text }));
      } catch (error) {
        console.error('Error sending message:', error);
        Alert.alert('Send Error', 'Failed to send message');
      }
    } else {
      console.warn('WebSocket is not open. Message not sent.');
      Alert.alert('Not Connected', 'Unable to send message. Please try again.');
    }
  }, [ws]);

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{ _id: 1 }}
      />
    </View>
  );
};

export default WebsocketChatScreen;