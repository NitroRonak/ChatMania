import { Server as SocketIOServer } from "socket.io";
import { Message } from "./models/MessagesModel.js";
import { Channel } from "./models/ChannelModel.js";
const setupSocket = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  const userSocketMap = new Map();
  const disconnect = (socket) => {
    console.log(`Client disconnected: ${socket.id}`);
    for (const [userId, socketId] of userSocketMap) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  const sendMessage = async (message) => {
    const senderSocketId = userSocketMap.get(message.sender);
    const recepientSocketId = userSocketMap.get(message.recepient);

    const createMessage = await Message.create(message);

    const messageData = await Message.findById(createMessage._id)
      .populate("sender", "_id email firstName lastName image color")
      .populate("recepient", "_id email firstName lastName image color");

    if (recepientSocketId) {
      io.to(recepientSocketId).emit("receiveMessage", messageData);
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("receiveMessage", messageData);
    }
  };

  const sendChannelMessage = async (message) => {
    const { sender, content, messageType, fileUrl, channelId } = message;
    const createMessage = await Message.create({
      sender,
      recepient: null,
      content,
      messageType,
      fileUrl,
      timestamp: new Date(),
    });
    const messageData = await Message.findById(createMessage._id)
      .populate("sender", "_id email firstName lastName image color")
      .exec();

    await Channel.findByIdAndUpdate(channelId, {
      $push: {
        messages: createMessage._id,
      },
    });
    const channelData = await Channel.findById(channelId).populate("members");

    const finalData = {
      ...messageData._doc,
      channelId: channelData._id,
    };

    if (channelData && channelData.members) {
      channelData.members.forEach((member) => {
        const memberSocketId = userSocketMap.get(member._id.toString());
        if (memberSocketId) {
          io.to(memberSocketId).emit("receive-channel-message", finalData);
        }
      });
      const adminSocketId = userSocketMap.get(channelData.admin._id.toString());
      if (adminSocketId) {
        io.to(adminSocketId).emit("receive-channel-message", finalData);
      }
    }
  };
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User connected: ${userId} with socket id: ${socket.id}`);
    } else {
      console.log("User Id not provided during connection");
    }
    socket.on("sendMessage", sendMessage);
    socket.on("send-channel-message", sendChannelMessage);
    socket.on("disconnect", () => disconnect(socket));
  });
};
export default setupSocket;
