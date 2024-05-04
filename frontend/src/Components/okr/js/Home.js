// Author -
// Ramandeep Kaur
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/Home.css'; // Import CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faPlus, faMinus, faSearch } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [objectives, setObjectives] = useState([]);
  const [expandedObjectives, setExpandedObjectives] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchObjectives();
  }, []); // Fetch objectives on component mount

  const fetchObjectives = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/okr/objectives`);
      setObjectives(response.data);
      console.log(response.data); // Log the fetched data
    } catch (error) {
      console.error('Error fetching objectives', error);
    }
  };

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

  console.log('Objectives:', objectives); // Log the objectives state just before rendering

  // Filter objectives based on the search query
  const filteredObjectives = objectives.filter((objective) =>
    objective.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Main content */}
      <div className="home-container">
        <h2>Objectives and Key Results</h2>
        <div className="search-bar">
          <div className="button-container">
            <Link to="/add-okr">Add New Objective</Link>
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
            <div key={objective._id} className="objective-card">
              <div className="objective-header" onClick={() => toggleObjective(objective._id)}>
                <div className="title-section">
                  <div className="progress-circle-container">
                    <Link to={`/objective-view/${objective._id}`} className="objective-link">
                      <h3 className="objective-title" title={objective.title}>
                        <FontAwesomeIcon icon={faBullseye} className="goal-icon" />
                        {objective.title}
                      </h3>
                      <span className="progress-label">{objective.progress}%</span>
                    </Link>
                  </div>
                  {objective.timeframe && (
                    <p className="deadline">
                      Deadline: <span className="text-muted">{new Date(objective.timeframe).toLocaleDateString()}</span>
                    </p>
                  )}
                </div>
                <div className="expandable-icon">
                  {expandedObjectives.includes(objective._id) ? (
                    <FontAwesomeIcon icon={faMinus} />
                  ) : (
                    <FontAwesomeIcon icon={faPlus} />
                  )}
                </div>
              </div>
              {expandedObjectives.includes(objective._id) && objective.keyResults && objective.keyResults.length > 0 && (
                <div className="key-results">
                  <h3>Key Results</h3>
                  {objective.keyResults.map((keyResult) => (
                    <div key={keyResult._id} className="key-result">
                      <div className="key-result-title">
                        <FontAwesomeIcon icon={faBullseye} className="goal-icon" />
                        <span>{keyResult.title}</span>
                      </div>
                      <div className="progress-row">
                        <div className="progress-bar-container">
                          <div className="progress-bar" style={{ width: `${keyResult.progress}%` }}>
                            {keyResult.progress}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
