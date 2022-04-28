import React from 'react'
import {Link} from 'react-router-dom';

/*Component with a cheatsheet of all the possible endingds. 
It is meant to be presented on another page, but then the score is lost
when re-rendering the page... Still looking for a neat solution;
For now I have fixed it by making a popup-cheatsheet on the homepage. */
export default function Help() {
  return (
    <div className="helpPage">
        <h1>Declension of Latin nouns</h1>
        <h4 className="invisibles">score: <span id="correctNR">0</span> / <span id="total">0</span></h4>
        <img src="/Rijtjes zelfstandig naamwoord.jpg" alt=""/>
        <Link to="/">Help</Link>
    </div>
  )
}
