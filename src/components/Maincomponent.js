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
          <p>Select case and grammatical number (all possibilities!):</p>
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
                  onChange={() => {props.handleOnChange(index); props.checkCase()}}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{item}</label>
                  </div>
              )

            })}
          </div>
          {/* <label for="case1">
            <input type="checkbox" name="case" value="nomSG" id="case1"/>Nominative singular
          </label>
          <label for="case2">
            <input type="checkbox" name="case" value="genSG" id="case2"/>Genitive singular
          </label>
          <label for="case3">
            <input type="checkbox" name="case" value="datSG" id="case3"/>Dative singular
          </label>
          <label for="case4">
            <input type="checkbox" name="case" value="accSG" id="case4"/>Accusative singular
          </label>
          <label for="case5">
            <input type="checkbox" name="case" value="ablSG" id="case5"/>Ablative singular
          </label>
          <label for="case6">
            <input type="checkbox" name="case" value="nomPL" id="case6"/>Nominative plural
          </label>
          <label for="case7">
            <input type="checkbox" name="case" value="genPL" id="case7"/>Genitive plural
          </label>
          <label for="case8">
            <input type="checkbox" name="case" value="datPL" id="case8"/>Dative plural
          </label>
          <label for="case9">
            <input type="checkbox" name="case" value="accPL" id="case9">Accusative plural</input>
          </label>
          <label for="case10">
            <input type="checkbox" name="case" value="ablPL" id="case10">Ablative plural</input>
  </label>  */}
          </div>

        </form>
    </div>
  )
}
