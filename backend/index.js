const userAuth = require('./middleware/auth')
const express = require('express');
const cors = require('cors')
const app = express();
const port = 5000;
const connectDB = require('./utils/dbConnection');
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/userRoutes');
const documentUploadRoutes = require('./routes/documentUploadRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const budgetRoutes = require('./routes/budgetRoutes')
const okrRoutes = require('./routes/okrRoutes');
const bodyParser=require('body-parser');
const notificationRoutes=require('./routes/notificationRoutes');
const reminderRoutes=require('./routes/reminderRoutes')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/documents', documentUploadRoutes)
app.use('/api/v1', subscriptionRoutes)
app.use('/notification', notificationRoutes);
app.use('/reminder',reminderRoutes)
app.use('/okr',okrRoutes);
app.use('/budget',budgetRoutes)
app.use(bodyParser.json())

connectDB();

app.listen(port, () => {
    console.log("Server running on port", port);
});
