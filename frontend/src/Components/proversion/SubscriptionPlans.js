// Author - 
// Shreya Kapoor

import React, {useEffect, useState} from 'react';
import './SubscriptionPlans.css';

const data = [
  {
    id: 1,
    title: "Monthly",
    price: "9.99",
  },
  {
    id: 2,
    title: "Yearly",
    price: "99.99",
  },
];

const SubscriptionPlans = () => {
  const [token, setToken] = useState("");


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    console.log("StoredToken --------> ", storedToken)
  }, []);

  const checkout = (plan) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/create-subscription-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ plan: plan }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        console.error("Error creating checkout session:", res.statusText);
      })
      .then(({ session }) => {
        console.log("Session --------------> ",session)
        localStorage.setItem("sessionId",session.id)
        window.location = session.url;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="subscription-plans">
      <h1>Choose a Collaborative Plan</h1>
      <div className="plans-container">
      {data.map((item, idx) => (
        
        <div key={idx} className="plan-card">
          <h2>{item.title}</h2>
          <p>${item.price}</p>
          <button 
          onClick={() => checkout(Number(item.price))}
          className="pay-now-button">
            Pay Now
          </button>
        </div>
      

      ))}
      </div>
      
    </div>
  );
};

export default SubscriptionPlans;
