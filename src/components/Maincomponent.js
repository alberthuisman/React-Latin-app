/* Component in which the actual functionality of the app 
is presented, such as the word to be analyzed, the inputfields
for the answer of the user and the buttons to get a new word 
or to check the answer*/

import React from 'react'

export default function Maincomponent(props) {
  /* This variable is used to fill the checkboxes with the right 
  label for every grammatical case */
  const casesFull=[
              "nominative singular",
              "genitive singular",
              "dative singular",
              "accusative singular",
              "ablative singular",
              "nominative plural",
              "genitive plural",
              "dative plural",
              "accusative plural",
              "ablative plural"];

  return (
    <div className="maincomponent">
        
        {/*This part contains a button to get a new noun to be analyzed,
        the noun to be analyzed and a scoreboard that displays the total number
        of attempts and the number of correctly analyzed words*/}
        <div className="wordGenerator">
          <div className="scorePlusNewBtn">
            <button onClick={props.getNoun} className="getNounButton">New Noun</button>
            <h4>score: <span id="correctNR">0</span> / <span id="total">0</span></h4>
            </div>
            <p className="toBeAnalyzed"></p>
        </div>
        
        <form>
        
        {/*Here the user must enter the nominative singular of the word to be analyzed;
        The input gets green if the word is correctly entered*/}
        <div className="nomSG response">
          <label for="nomSG">Nominative singular of this word:</label>
          <input id="nomSG" type="text" placeholder="e.g. servus" onChange={props.checkNominative} />
        </div>
        
        {/*This part is for analyzing the declination type;
        the selection turns green if the right declination type is chosen*/}
        <div className="declination response">
          <label for="declination">Declination:</label>
          <select id="declination" name="declination" onChange={props.checkDeclination}>
            <option value="0">--</option>
            <option value="1">Declination I (femina)</option>
            <option value="2">Declination II (servus/ bellum)</option>
            <option value="3">Declination III (rex/ flumen)</option>
            <option value="4">Declination IV (manus/ cornu)</option>
            <option value="5">Declination V (res)</option>
          </select>
        </div>
        
        {/*With this code a series of checkboxes plus label is generated for all the 10 cases in Latin;
        In this part of the form the user has to select all possible cases applicable to the word to
        be analyzed.*/}
        <div className="case">
          <p>Select case and grammatical number:</p> 
          <p><em>(select all possible options!)</em></p>
          
          <div className="casesList">
            {casesFull.map((item, index) => {
              return(
                <div className="naamvallen">
                  <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  name={item}
                  value={item}
                  checked={props.checkedState[index]}
                  onChange={() => {props.handleOnChange(index)}}
                  />
                  <label id="caseLabel" htmlFor={`custom-checkbox-${index}`}>{item}</label>
                  </div>
              )
            })}
          </div>

        </div>

        </form>
        
        {/*Displays a feedback comment ("not quite" or "Well done!") when checking the answer */}
        <h4 id="result"> </h4>      
        
        <div className="buttonContainer">
       
          {/*With this button the user can have the answers checked 
          with a feedback comment and changes in the scoreboard as a result*/}   
          <button disabled={props.disable} onClick={props.checkAnswer} className="checkAnswerButton">Check answer</button>

          {/*Opens a cheatsheet on top of the page with all the possible endings per declination type */}       
          <button onClick={props.openCheatSheet} className="helpButton">Help</button>
        </div>
        
        {/*A cheatsheet with the declension of Latin words per declination type */}
        <div className="cheatSheetContainer">
          <div className="cheatSheet">
          <img src="/Rijtjes zelfstandig naamwoord.jpg" alt=""/>
          <button onClick={props.closeCheatSheet} className="closeButton">Close</button>
          </div>
        </div>
    
    </div>
  )
}
