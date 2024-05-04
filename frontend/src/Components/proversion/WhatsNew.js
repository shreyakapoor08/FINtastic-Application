// Author - 
// Shreya Kapoor

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WhatsNew.css';

const WhatsNew = () => {
  const navigate = useNavigate();

  const handleSubscribe = () => {
    navigate('/subscription-plans');
  };
  return (
    <div className="whats-new-section">
      <h1>What's New in the Pro Version?</h1>
      <br/>
      <hr />
      <div className="features">
        <div className="feature">
          <strong>Credit Score</strong>
          <p>Keep a track of your credit score with us</p>
        </div>
        <div className="feature">
          <strong>Goal Setter</strong>
          <p>Set your future financial goals and find out how to accomplish them</p>
        </div>
      </div>
      <div className="subscribe-section">
        <button className="subscribe-button" onClick={handleSubscribe}>
          Subscribe Now
        </button>
      </div>
    </div>
  );
};

export default WhatsNew;
