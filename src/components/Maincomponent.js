import React from 'react'

export default function Maincomponent(props) {
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
        <div className="formGenerator">
            <button onClick={props.getNoun} className="getNounButton">New Noun</button>
            <p className="toBeAnalyzed"></p>
        </div>
        <form>
        <div className="nomSG response">
          <label for="nomSG">Nominative singular of this word:</label>
          <input id="nomSG" type="text" placeholder="e.g. servus" onChange={props.checkNominative} />
        </div>
        <div className="declination response">
          <label for="declination">Declination:</label>
          <select id="declination" name="declination" onChange={props.checkDeclination}>
            <option value="1">Declination I (femina)</option>
            <option value="2">Declination II (servus/ bellum)</option>
            <option value="3">Declination III (rex/ flumen)</option>
            <option value="4">Declination IV (manus/ cornu)</option>
            <option value="5">Declination V (res)</option>
          </select>
          </div>
          <div className="case response">
          <p>Select case and grammatical number:</p> 
          <p><em>(select all possible options!)</em></p>
          <div className="casesList">
            {casesFull.map((item, index) => {
              return(
                <div className="case#">
                  <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  name={item}
                  value={item}
                  checked={props.checkedState[index]}
                  onChange={() => {props.handleOnChange(index)}}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{item}</label>
                  </div>
              )

            })}
          </div>
          
          </div>

        </form>
        <button onClick={props.checkCase} className="checkAnswerButton">Check answer</button>
    </div>
  )
}
