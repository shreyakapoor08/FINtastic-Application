import React, { useState } from 'react';
import './home.css';
import Chat from './chat/chat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// Home component
function Home() {
  // State to manage the visibility of the chat popup
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Function to open the chat popup
  const openChatPopup = () => {
    setIsChatOpen(true);
  };

  // Function to close the chat popup
  const closeChatPopup = () => {
    setIsChatOpen(false);
  };

  return (
    <div>
      {/* Navbar component */}
      <Navbar openChatPopup={openChatPopup} />

      {/* Render the chat popup if isChatOpen is true */}
      {isChatOpen && (
        <div className="chat-modal">
          <div className="chat-modal-content">
            <Chat />
            {/* Close button for the chat popup */}
            <button className="close-button" onClick={closeChatPopup}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Navbar component
function Navbar({ openChatPopup }) {
  return (
    <div className="navbar">
      <div className="brand">FINtastic</div>
      <button className="helpdesk-button" onClick={openChatPopup}>Help Desk</button>
    </div>
  );
}

export default Home;
