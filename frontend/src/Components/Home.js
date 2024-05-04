// Home.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faPlus, faMinus, faSearch } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  // Hardcoded objectives and key results
  const objectives = [
    {
      id: 1,
      title: 'Increase Sales',
      progress: 0.7, // Progress value from 0 to 1
      keyResults: [
        { id: '1-1', title: 'Key Result 1', progress: 0.8 },
        { id: '1-2', title: 'Key Result 2', progress: 0.6 },
        { id: '1-3', title: 'Key Result 3', progress: 0.5 }
      ]
    },
    {
      id: 2,
      title: 'Improve Customer Satisfaction',
      progress: 0.5, // Progress value from 0 to 1
      keyResults: [
        { id: '2-1', title: 'Key Result 1', progress: 0.4 },
        { id: '2-2', title: 'Key Result 2', progress: 0.7 },
        { id: '2-3', title: 'Key Result 3', progress: 0.6 }
      ]
    },
  
  ];

  const [expandedObjectives, setExpandedObjectives] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleObjective = (id) => {
    setExpandedObjectives((prevExpanded) =>
      prevExpanded.includes(id)
        ? prevExpanded.filter((item) => item !== id)
        : [...prevExpanded, id]
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredObjectives = objectives.filter((objective) =>
    objective.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">FINtiastic</div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/add-objective" className="navbar-link">Add Objective</Link>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <div className="home-container">
        <h2>Objectives and Key Results</h2>
        <div className="search-bar">
        <div className="button-container">
          <Link to="/add-objective">Add New Objective</Link>
        </div>
          <input
            type="text"
            placeholder="Search objectives..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
        
        <div className="objectives-list">
          {filteredObjectives.map((objective) => (
            <div key={objective.id} className="objective-card">
              <div className="objective-header" onClick={() => toggleObjective(objective.id)}>
                <FontAwesomeIcon icon={faBullseye} className="goal-icon" />
                <h3 className="objective-title">{objective.title}</h3>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${objective.progress * 100}%` }}></div>
                </div>
                <div className="expandable-icon">
                  {expandedObjectives.includes(objective.id) ? (
                    <FontAwesomeIcon icon={faMinus} />
                  ) : (
                    <FontAwesomeIcon icon={faPlus} />
                  )}
                </div>
              </div>
              <ul className={`key-results-list ${expandedObjectives.includes(objective.id) ? 'expanded' : ''}`}>
                {objective.keyResults.map((keyResult) => (
                  <li key={keyResult.id} className="key-result-item">
                    <FontAwesomeIcon icon={faBullseye} className="goal-icon" />
                    <span className="key-result-title">{keyResult.title}</span>
                    <div className="progress-bar-container">
                      <div className="progress-bar" style={{ width: `${keyResult.progress * 100}%` }}></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
