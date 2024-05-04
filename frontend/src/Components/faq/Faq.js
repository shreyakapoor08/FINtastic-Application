// Author -
// Shreya Kapoor
import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Faq.css';

const faqItems = [
    {
        question: 'What is a credit score?',
        answer: 'A credit score is a numerical representation of an individual\'s financial health, determined through an evaluation of their expenses and income against predefined thresholds for each spending category. This assessment involves a mathematical equation that incorporates factors such as the proportion of income allocated to various expenses and the frequency of breaches of expense thresholds. The credit score provides insight into an individual\'s ability to manage their finances responsibly, with higher scores indicating greater financial stability and lower credit risk, while lower scores may suggest higher risk and potential challenges in meeting financial obligations.'
    },
    {
        question: 'How do I contact customer support?',
        answer: 'If you need assistance or have any questions, you can contact our customer support team through the help desk portal. Simply navigate to the "Help" or "Support" section of the application and access the help desk. From there, you can browse through frequently asked questions (FAQs), search for relevant articles in the knowledge base, initiate a live chat with a support representative, or submit a support ticket detailing your inquiry. Our dedicated support team will promptly assist you with any issues or concerns you may have.'
    },
    {
        question: 'What features are included in the Pro Subscription?',
        answer: 'The Pro Subscription offers access to premium features designed to enhance your financial management experience. Some of the exclusive features included in the Pro Subscription are advanced data visualization tools, enhanced budget planning capabilities, personalized notifications, priority customer support, and detailed credit score insights. Additionally, Pro Subscription members may receive exclusive offers, discounts, and access to upcoming features and updates. Upgrade to the Pro Subscription to unlock the full potential of our financial management platform and take control of your finances with confidence.'
    },
    {
        question: 'What types of financial goals can I set and track using FinTastic?',
        answer: 'With FinTastic\'s Objective Key Results (OKR) tracker, you can set and track a wide range of financial goals, including saving for emergencies, paying off debt, investing for retirement, and achieving specific savings targets. Our goal tracker helps you stay focused and motivated on your financial journey, providing actionable insights and progress updates along the way.'
    },
    {
        question: 'How can I stay informed about important financial events and reminders with FinTastic?',
        answer: 'FinTastic offers customizable notifications that keep you informed about upcoming bill payments, account transactions, budget updates, and other financial activities. You can choose to receive notifications via email, SMS, or in-app alerts, ensuring that you never miss an important deadline or opportunity to manage your finances effectively.'
    },
    {
        question: 'Can I create custom budget categories in FinTastic?',
        answer: 'Yes, FinTastic allows you to create personalized budget categories to align with your specific financial goals and priorities. Whether you want to budget for groceries, entertainment, or savings goals, you can customize your budget categories to reflect your unique financial needs and preferences.'
    }
];

const FAQ = () => {
    return (
        <div>
            <section id="show-faq">
            <div className="text">
              <h2>Frequently Asked Questions</h2>
            </div>
          </section> 
          <div className="faq-container">
            {faqItems.map((item, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                    >
                        <Typography variant="body1" fontWeight="bold">
                            {item.question}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{item.answer}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
            </div>
        </div>
    );
}

export default FAQ;

