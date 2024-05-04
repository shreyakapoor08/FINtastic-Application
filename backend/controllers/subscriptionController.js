// Author -
// Shreya Kapoor
const Subscription = require('../models/subscriptionModel');
const User = require('../models/userModel');
const moment = require('moment');

const [monthly, yearly] = ['price_1Oz5kc01hABKBF0gHa1cK5Es', 'price_1Oz5ot01hABKBF0gnY7Qd0pX'];

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

// Function to create a new Stripe checkout session for subscription
const stripeSession = async(plan) => {
    try {
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: plan,
                    quantity: 1
                },
            ],
            success_url: `${process.env.REACT_APP_FRONTEND_URL}/success`,
            cancel_url: `${process.env.REACT_APP_FRONTEND_URL}/cancel`
        });
        return session;
    }catch (e){
        return e;
    }
};

// Controller function to handle the creation of a new subscription
const createSubscription = async (req, res) => {
    const {plan} = req.body;
    let planId = null;
    if(plan == 9.99) planId = monthly;
    else if(plan == 99.99) planId = yearly;

    try{

        const session = await stripeSession(planId);
        const user = req.user;
        console.log("user", user);
        const userId = req.user.userId;
        console.log("userId", userId)
        return res.json({session})

    }catch(error){
        res.send(error)
    }
};

// Controller function to handle successful payment callback from Stripe
const handlePaymentSuccess = async (req, res) => {
    const { sessionId } = req.body;
  
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
  
      if (session.payment_status === 'paid') {
          const subscriptionId = session.subscription;
          try {
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            console.log("subscription.current_period_start", moment.unix(subscription.current_period_start).format('YYYY-MM-DD'))
            console.log("subscription.current_period_end", moment.unix(subscription.current_period_end).format('YYYY-MM-DD'))
            const currentUser = req.user;
            const planId = subscription.plan.id;
            const planType = subscription.plan.interval === "month" ? "monthly" : "yearly";
            console.log("planType::", planType)
            const startDate = moment.unix(subscription.current_period_start).format('YYYY-MM-DD');
            const endDate = moment.unix(subscription.current_period_end).format('YYYY-MM-DD');
            const durationInSeconds = subscription.current_period_end - subscription.current_period_start;
            const durationInDays = moment.duration(durationInSeconds, 'seconds').asDays();

            console.log("currentuser", currentUser)
            console.log("Subscription", subscription)
           
            const subscriptionModel = new Subscription({
                planId: planId,
                planType: planType,
                planStartDate: startDate,
                planEndDate: endDate,
                planDuration: durationInDays,
                userId: currentUser.userId 
            });
            
            try {
                const savedSubscription = await subscriptionModel.save();
                console.log("Subscription saved:", savedSubscription);
                const subscriptionEndDate = moment(savedSubscription.planEndDate);
                console.log("subscriptionEndDate", subscriptionEndDate)
                const currentDate = moment();
                console.log("currentDate", currentDate)
                const isSubscribed = subscriptionEndDate.isAfter(currentDate);
                console.log("subscriptionEndDate.isAfter(currentDate)", subscriptionEndDate.isAfter(currentDate))
                console.log("isSUbscribed: ", isSubscribed);
                const user = await User.findById(currentUser.userId);

                user.isSubscribed = isSubscribed;

                await user.save();
                console.log("User updated:", user);
            } catch (error) {
                console.error("Error saving subscription:", error);
            }

              
            } catch (error) {
              console.error('Error retrieving subscription:', error);
            }
          return res.json({ message: "Payment successful" });
        } else {
          return res.json({ message: "Payment failed" });
        }
      } catch (error) {
        res.send(error);
      }
};

module.exports = {
    createSubscription,
    handlePaymentSuccess
};
