import React from 'react'

export default function Maincomponent(props) {


  return (
    <div className="maincomponent">
        <div className="formGenerator">
            <button onClick={props.getNoun} className="getNounButton">New Noun</button>
            <p className="toBeAnalyzed"></p>
        </div>
    </div>
  )
}
