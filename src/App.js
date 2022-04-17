import {useState} from 'react';
import './App.css';
import data from './Data';
import Header from './components/Header';
import Maincomponent from './components/Maincomponent';


function App() {
  const nouns = data;
  const cases = ["nomSg", "genSg", "datSg", "accSg", "ablSg", "nomPl", "genPl", "datPl", "accPl", "ablPl"];
  const [word, setWord] = useState("");
  const [naamval, setNaamval] = useState("");
  
  const getNoun=()=>{
    let nounIndex = Math.ceil(Math.random()*nouns.length-1);
    let noun = nouns[nounIndex];
    let caseIndex = Math.ceil(Math.random()*9);
    let naamval = cases[caseIndex];
    let questionField = document.querySelector(".toBeAnalyzed");
    console.log(noun[`${naamval}`]);
    console.log(naamval);
    console.log(noun['ablPl']);
    questionField.innerHTML = noun[`${naamval}`];
    setWord(noun);
    setNaamval(naamval);
  }

  const checkNominative = () => {
    let nomInput = document.getElementById("nomSG").value;
    if (nomInput === word["nomSg"]) {
      console.log("correct");
      document.getElementById("nomSG").classList.add("correctInput");
      //return true;
    } else {
      console.log("wrong!")
      document.getElementById("nomSG").classList.remove("correctInput");
      //return false;
    }
}

const checkDeclination = () => {
  /* Do I have to cast it as an integer? Because in the if-statement comparing values with ===
  doesn't give the correct result; probably because the types don't match */
  let declination = document.getElementById("declination").value;
  console.log(declination);
  console.log(word["declination"]);
  if (declination == word["declination"]) {
    console.log("correct declination");
    document.getElementById("declination").classList.add("correctInput");
    return true;
  } else {
    console.log("wrong declination");
    document.getElementById("declination").classList.remove("correctInput");
    return false;
  }
}

const [checkedState, setCheckedState] = useState(
  new Array(cases.length).fill(false)
);

const [checkedCount, setCheckedCount] = useState(0);

const handleOnChange = (position) => {
  let updatedCheckedState = checkedState.map((item, index) => index === position ? !item : item);
  setCheckedState(updatedCheckedState);
  console.log(updatedCheckedState);
};

const checkCount = () => {
  console.log("Current selected cases: " + checkedState)
  let count = 0;
  for (let i = 0; i < checkedState.length; i++) {
    if (checkedState[i] === true) {
      count++
    }  
  }
  setCheckedCount(count);
  console.log("checked Count = " + checkedCount);
  console.log("calculated count = " + count);
  return count;
}

const checkCase = () => {
  let countedCases = checkCount();
  console.log("declination = " + word["declination"]);
  console.log(naamval);
  if (word["declination"] == 1) {
    if (naamval === "nomSg" || naamval === "ablSg") {
      if (countedCases === 2 && checkedState[0] === true && checkedState[4] === true) {
        console.log("cases correctly analyzed");
      } else {
        console.log("answer is incorrect or incomplete!")
      }
    }
    else if (naamval === "datPl" || naamval === "ablPl") {
      if (countedCases === 2 && checkedState[7] === true && checkedState[9] === true) {
        console.log("cases correctly analyzed");
      } else {
        console.log("answer is incorrect or incomplete!");
      }
    }

  }
}

/*const checkNumber = () => {
  let numberInput = document.getElementById("number").value;
  console.log(numberInput);
  console.log(Object.values(word));
  let number;
  let index;
  for(let i=3; i < word.length; i++) {
    if (Object.values(word)[i] === question) {
      index = i;
      console.log("index = " + index);
    }
  }
  if (index >= 3 && index <= 7) {
    number = "sg";
  } else {
    number = "pl";
  }
  if (numberInput === number) {
    console.log("correct")
    document.getElementById("number").classList.add("correctInput");
  } else {
    console.log("wrong!");
    document.getElementById("number").classList.remove("correctInput");
  }
}*/

  return (
    <div className="App">
      <Header />
      <Maincomponent nouns={nouns} 
                     getNoun={getNoun} 
                     checkNominative={checkNominative} 
                     checkDeclination={checkDeclination}
                     checkedState={checkedState}
                     handleOnChange={handleOnChange}
                     checkCount = {checkCount} 
                     checkCase={checkCase}/>
    </div>
  );
}

export default App;
