import {useState} from 'react';
import './App.css';
import data from './Data';
import Header from './components/Header';
import Maincomponent from './components/Maincomponent';


function App() {
  const nouns = data;
  const cases = ["nomSg", "genSg", "datSg", "accSg", "ablSg", "nomPl", "genPl", "datPl", "accPl", "ablPl"];
  const [word, setWord] = useState("");
  
  const getNoun=()=>{
    let nounIndex = Math.ceil(Math.random()*nouns.length-1);
    let noun = nouns[nounIndex];
    let caseIndex = Math.ceil(Math.random()*9);
    let naamval = cases[caseIndex];
    let questionField = document.querySelector(".toBeAnalyzed");
    console.log(noun[`${naamval}`]);
    console.log(naamval);
    console.log(noun['abl-pl']);
    questionField.innerHTML = noun[`${naamval}`];
    setWord(noun);
  }

  const checkNominative = () => {
    let nomInput = document.getElementById("nomSG").value;
    let correct = document.querySelector(".toBeAnalyzed").innerHTML;
    console.log(nomInput);
    console.log(correct);
    console.log(word["nomSg"]);
    if (nomInput === word["nomSg"]) {
      console.log("correct");
      document.getElementById("nomSG").classList.add("correctInput");
      return true;
    } else {
      console.log("wrong!")
      document.getElementById("nomSG").classList.remove("correctInput");
      return false;
    }
}

  return (
    <div className="App">
      <Header />
      <Maincomponent nouns={nouns} getNoun={getNoun} checkNominative={checkNominative}/>
    </div>
  );
}

export default App;
