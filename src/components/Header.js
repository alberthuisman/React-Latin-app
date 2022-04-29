/* Component to build the header of the app */ 

import React from 'react';
import {Link} from 'react-router-dom';

export default function Header() {

  return (
    <div className="header-container">
      <Link to="/">Home</Link>
    <h1>Latin nouns</h1>
    <Link to="/help">Help</Link>
    </div>
  )
}
