// var ReconnectingWebSocket = require('reconnecting-websocket');
// var sharedb = require('sharedb/lib/client');

// // expose singleton Websocket connection to ShareDB; what does singleton mean
// // var socket = new ReconnectingWebSocket('ws://' + window.location.host);
// var socket = new ReconnectingWebSocket('ws://localhost:8000/socket');
// var connection = new sharedb.Connection(socket);

// module.exports = connection;

// // export default connection;

// var ReconnectingWebSocket = require('reconnecting-websocket');
import ReconnectingWebSocket from 'reconnecting-websocket';
const sharedb = require('sharedb/lib/client');

const ws_address = 'ws://localhost:9001/socket'

// Expose a singleton WebSocket connection to ShareDB server
const socket = new ReconnectingWebSocket(ws_address);
const connection = new sharedb.Connection(socket);

export default connection;