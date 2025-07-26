const mongoose = require("mongoose");

const ConnectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Types.ObjectId,
    },
    toUserId: {
      type: mongoose.Types.ObjectId,
    },
    status: {
      type: String,
      enum: {
        values: ["interested", "Ignored", "Accepted", "Rejected"],
        message: "{VALUE} does not exist",
      },
    },
  },
  { timestamps: true }
);

ConnectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

ConnectionRequestSchema.pre("save", function next() {
  const connectionReq = this;
  if (connectionReq.fromUserId.equals(connectionReq.toUserId)) {
    throw new Error("Cannot send connection request to yourself!");
  }
  next();
});

const connectionRequestModel = mongoose.model(
  "ConnectionRequest",
  ConnectionRequestSchema
);

module.exports = connectionRequestModel;
