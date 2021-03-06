import React, {useContext} from 'react';
import {ScoreContext} from '../context/ScoreContext';

/*Component with a cheatsheet of all the possible endings. */
export default function Help() {
  const {correctNR} = useContext(ScoreContext);
  const {total} = useContext(ScoreContext);

  return (
    <div className="helpPage">
        <h1 className="helpTitle">Declension of Latin nouns</h1>
        <h4 className="invisible">score: <span id="correctNR">{correctNR}</span> / <span id="total">{total}</span></h4>
        <img src="/Rijtjes zelfstandig naamwoord.jpg" alt=""/>
    </div>
  )
}
