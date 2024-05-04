// Author -
// Dhrumil Gosaliya
const NotificationModel = require("../models/notificationModel");

const createSingleNotification = async (req, res) => {
    try {
        const { message, notificationType } = req.body;
        const userId = req.user.userId;
        let newNotification = new NotificationModel({
            userId,
            message,
            notificationType,
            isRead: false, 
            isDeleted: false 
        });

        const savedNotification = await newNotification.save();
        return res.status(200).send({
            savedNotification
        });
    } catch (err) {
        throw new Error(err.message);
    }
};

const getAllNotifications = async (req, res) => {
    try {
        const userId = req.user.userId; 
        const notifications = await NotificationModel.find({ userId, isDeleted: false }).sort({ createdAt: -1 });
        return res.status(200).send({
            notifications
        });
    } catch (err) {
        throw new Error(err.message);
    }
};


module.exports = {
    createSingleNotification,
    getAllNotifications
};
