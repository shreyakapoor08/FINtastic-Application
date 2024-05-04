// Author -
// Vishnu Vasita
import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="wrapper">
      <div className="section1">
        <div className="overview">
          <h2>Plan your finance with ease</h2>
          <p>
            Welcome to Your Financial Command Center! Our platform is your
            ultimate ally in navigating the complexities of personal finance
            with confidence and ease. Designed with your financial empowerment
            in mind, we provide a comprehensive suite of tools that cater to
            every aspect of financial planning, tracking, and management.
            Whether you're taking the first steps towards financial independence
            or looking to optimize your financial strategy, our user-friendly
            interface ensures that managing your finances is both accessible and
            effective.
          </p>
        </div>
        <div className="img_section">
          <img className="land_img" src="/img1.jpg" alt="image_1" />
        </div>
      </div>
      <div className="section2">
        <div>
          <h2>key feautres</h2>
        </div>
        <div>
          <ul className="feature_list">
            <li>
              <h4>Dashboard</h4>
              <small>
                Elevate your financial insight with FinTastic's dashboard:
                advanced, dynamic data visualization through charts and graphs
                that transform your financial data into actionable intelligence,
                setting us apart with superior clarity and decision-making
                power.
              </small>
            </li>
            <li>
              <h4>Budget Planner</h4>
              <small>
                Master your finances with our Budget Planner tool. Effortlessly
                set categories, allocate funds, and track spending. Stay
                informed with alerts as you approach or exceed your budget
                limits, ensuring you're always in control.
              </small>
            </li>
            <li>
              <h4>Objective Tracker</h4>
              <small>
                Achieve your financial dreams with our OKR Tracker. Set SMART
                goals, monitor progress, and get feedback to stay on track.
                Empowering you with clarity and guidance towards your
                objectives.
              </small>
            </li>
            <li>
              <h4>Expense Management</h4>
              <small>
                Streamline your spending with our Expense Management feature.
                Easily add, edit, categorize, and delete transactions, offering
                a clear view of your financial history and summaries for smarter
                financial decisions.
              </small>
            </li>
          </ul>
        </div>
      </div>
      <div className="section3">
        <div className="pro_img_section">
          <img className="pro_img" src="/img2.jpg" alt="image_2" />
        </div>
        <div className="pro_feature">
          <h2>Pro features</h2>
          <p>
            Unlock financial mastery with Pro: seamlessly track goals,
            effortlessly execute payments, and deeply understand your credit,
            all woven into an experience that redefines financial empowerment.
          </p>
        </div>
      </div>
      <div className="footer">
        <div className="link_section">
          <div className="footer_logo">
            <h1>FINtastic</h1>
          </div>
          <div className="link_comp">
            <ul className="links">
              <Link to="/home" className="list-items">
                <li>Home</li>
              </Link>
              <Link to="/home" className="list-items">
                <li>About us</li>
              </Link>
              <Link to="/contactus" className="list-items">
                <li>Contact us</li>
              </Link>
              <Link to="/faq" className="list-items">
                <li>FAQs</li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <h5>FINtastic</h5>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
