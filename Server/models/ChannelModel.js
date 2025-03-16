const { Schema, model } = require("mongoose");

const channelSchema = new Schema({
    name: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" , required: true}],
    admin: { type: Schema.Types.ObjectId, ref: "User" , required: true},
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

channelSchema.pre("save", async function (next) {
    this.updatedAt = Date.now();
    next();
});

channelSchema.pre("findOneAndUpdate", async function (next) {
    this.updatedAt = Date.now();
    next();
});

export const Channel = model("Channel", channelSchema);

