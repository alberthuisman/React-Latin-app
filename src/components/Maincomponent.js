import React from 'react'

export default function Maincomponent(props) {
  

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
          <div className="number response">
          <label for="number">Grammatical number:</label>
          <select id="number" name="number">
            <option value="sg">singular</option>
            <option value="pl">plural</option>
          </select>
          </div>
          <div className="case response">
          <label for="case">Case:</label>
          <select id="case" name="case">
            <option value="nom">nominative</option>
            <option value="gen">genitive</option>
            <option value="dat">dative</option>
            <option value="acc">accusative</option>
            <option value="abl">ablative</option>
          </select>
          </div>

        </form>
    </div>
  )
}
