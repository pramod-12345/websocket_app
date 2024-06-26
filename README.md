# React Native Websocket Chat Application
![1_qtw4j4qVuTmKO6Ff2jiWYw](https://github.com/pramod-12345/websocket_app/assets/102239873/52f9b6ab-6155-4ab9-9b7b-e589a586c6b2)

This React Native application demonstrates the integration of WebSockets with the GiftedChat component to provide real-time chat functionality.

## Features
- **WebSocket Communication**: Handles WebSocket connections to send and receive messages with `WebSocket`.
- **Real-Time Chat**: Users can send and receive messages in real-time using WebSocket.
- **GiftedChat Integration**: Utilizes the popular `react-native-gifted-chat` library for rendering chat UI.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js installed on your system.
- React Native environment set up, including React Native CLI.
- An active WebSocket server endpoint for testing.

## Installation

To install the necessary packages, run the following command in your project directory: `npm install`

## Usage

To start the application, navigate to your project directory and run:

For android: `npx react-native run-android`
or
For iOS: `npx react-native run-ios`

Ensure your WebSocket server is running and accessible as the application will attempt to connect to the WebSocket URL specified in the code.

## Configuration

To connect to your WebSocket server, modify the `url` in the `connectWebSocket` function inside `app.js`:

javascript
const url = 'wss://example.com/ws/chat'; // Change this to your WebSocket server URL

