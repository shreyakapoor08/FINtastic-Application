// Author -
// Dhrumil Gosaliya
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const { ObjectId } = require("bson");

let notificationSchema = new Schema({
    userId: {
        type: ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    notificationType: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        required: true,
        default: false
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

let notificationModel = mongoose.model("Notification", notificationSchema);
module.exports = notificationModel;
