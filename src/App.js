import {useState, useEffect} from 'react';
import './App.css';
import data from './Data';
import Header from './components/Header';
import Maincomponent from './components/Maincomponent';


function App() {
  const nouns = data;
  const cases = ["nomSg", "genSg", "datSg", "accSg", "ablSg", "nomPl", "genPl", "datPl", "accPl", "ablPl"];
  const [word, setWord] = useState("");
  const [naamval, setNaamval] = useState("");
  const [correct, setCorrect] = useState([]);
  const [correctNR, setCorrectNR] = useState(0);
  const [total, setTotal] = useState(0);
  let counter = 0;
  
  const getNoun=()=>{
    clearFields();
    let nounIndex = Math.ceil(Math.random()*nouns.length-1);
    let noun = nouns[nounIndex];
    let caseIndex = Math.ceil(Math.random()*9);
    let naamval = cases[caseIndex];
    let questionField = document.querySelector(".toBeAnalyzed");
    console.log(noun[`${naamval}`]);
    console.log(naamval);
    console.log(noun['ablPl']);
    if (!correct.includes(noun[`${naamval}`])) {
      questionField.innerHTML = noun[`${naamval}`];
      setWord(noun);
      setNaamval(naamval);
    } else {
      if (counter < 30) {
        counter++;
        getNoun();
      } else {
        console.log("Out of exercises!")
      }
    }
  }

  const clearFields = () => {
    document.querySelector(".toBeAnalyzed").innerHTML = "";
    document.getElementById("nomSG").value = "";
    document.getElementById("declination").value = "0";
    document.getElementById("declination").classList.remove("correctInput");
    setCheckedState(checkedState.fill(false));
    document.getElementById("result").innerHTML = "";
  }

  const checkNominative = () => {
    let nomInput = document.getElementById("nomSG").value;
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
const checkCaseFirstDecl = (naamval, count) => {
  if (naamval === "nomSg" || naamval === "ablSg") {
    if (count === 2 && checkedState[0] === true && checkedState[4] === true) {
      console.log("cases correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect or incomplete!")
    }
  } else if (naamval === "genSg" || naamval === "datSg" || naamval === "nomPl") {
    if (count === 3 && checkedState[1] === true && checkedState[2] === true && checkedState[5] === true) {
      console.log("cases correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect or incomplete!");
    }
  } else if (naamval === "datPl" || naamval === "ablPl") {
    if (count === 2 && checkedState[7] === true && checkedState[9] === true) {
      console.log("cases correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect or incomplete!");
    }
  } else {
    if (count === 1 && checkedState.indexOf(true) === cases.indexOf(naamval)) {
      console.log("case correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect!");
    }
  }
  return false
}

const checkCaseSecondDeclM = (naamval, count) => {
  if (naamval === "nomSg") {
    if (count === 1 && checkedState[0] === true) {
      console.log("case correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect");
    }
  } else if (naamval === "genSg" || naamval === "nomPl") {
    if (count === 2 && checkedState[1] === true && checkedState[5] === true) {
      console.log("cases correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect or incomplete!");
    }
  } else if (naamval === "datSg" || naamval === "ablSg") {
    if (count === 2 && checkedState[2] === true && checkedState[4] === true) {
      console.log("cases correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect or incomplete!");
    }
  } else if (naamval === "datPl" || naamval === "ablPl") {
    if (count === 2 && checkedState[7] === true && checkedState[9] === true) {
      console.log("cases correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect or incomplete!");
    }
  } else {
    if (count === 1 && checkedState.indexOf(true) === cases.indexOf(naamval)) {
      console.log("case correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect!");
    }
  }
  return false
}

const checkCaseSecondDeclN = (naamval, count) => {
  if (naamval === "nomSg" || naamval === "accSg") {
    if (count === 2 && checkedState[0] === true && checkedState[3] === true) {
      console.log("case correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect");
    }
  } else if (naamval === "datSg" || naamval === "ablSg") {
    if (count === 2 && checkedState[2] === true && checkedState[4] === true) {
      console.log("cases correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect or incomplete!");
    }
  } else if (naamval === "nomPl" || naamval === "accPl") {
    if (count === 2 && checkedState[5] === true && checkedState[8] === true) {
      console.log("cases correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect or incomplete!");
    }
  } else if (naamval === "datPl" || naamval === "ablPl") {
    if (count === 2 && checkedState[7] === true && checkedState[9] === true) {
      console.log("cases correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect or incomplete!");
    }
  } else {
    if (count === 1 && checkedState.indexOf(true) === cases.indexOf(naamval)) {
      console.log("case correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect!");
    }
  }
  return false
}

const checkCaseThirdDeclN = (naamval, count) => {
  if (naamval === "nomSg" || naamval === "accSg") {
    if (count === 2 && checkedState[0] === true && checkedState[3] === true) {
      console.log("case correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect");
    }
  } else if (naamval === "nomPl" || naamval === "accPl") {
    if (count === 2 && checkedState[5] === true && checkedState[8] === true) {
      console.log("cases correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect or incomplete!");
    }
  } else if (naamval === "datPl" || naamval === "ablPl") {
    if (count === 2 && checkedState[7] === true && checkedState[9] === true) {
      console.log("cases correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect or incomplete!");
    }
  } else {
    if (count === 1 && checkedState.indexOf(true) === cases.indexOf(naamval)) {
      console.log("case correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect!");
    }
  }
  return false
}

const checkCaseThirdDeclMF = (naamval, count) => {
  if (naamval === "nomSg" && word["nomSg"] === word["genSg"]) {
    if (count === 2 && checkedState[0] === true && checkedState[1] === true) {
      console.log("cases correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect or incomplete");
    }
  } else if (naamval === "nomPl" || naamval === "accPl") {
    if (count === 2 && checkedState[5] === true && checkedState[8] === true) {
      console.log("cases correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect or incomplete!");
    }
  } else if (naamval === "datPl" || naamval === "ablPl") {
    if (count === 2 && checkedState[7] === true && checkedState[9] === true) {
      console.log("cases correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect or incomplete!");
    }
  } else {
    if (count === 1 && checkedState.indexOf(true) === cases.indexOf(naamval)) {
      console.log("case correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect!");
    }
  }
  return false
}

const checkCaseFourthDeclN = (naamval, count) => {
  if (naamval === "nomSg" || naamval === "accSg" || naamval === "ablSg") {
    if (count === 3 && checkedState[0] === true && checkedState[3] === true && checkedState[4] === true) {
      console.log("cases correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect or incomplete!");
    }
  } else if (naamval === "nomPl" || naamval === "accPl") {
    if (count === 2 && checkedState[5] === true && checkedState[8] === true) {
      console.log("cases correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect or incomplete!");
    }
  } else if (naamval === "datPl" || naamval === "ablPl") {
    if (count === 2 && checkedState[7] === true && checkedState[9] === true) {
      console.log("cases correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect or incomplete!");
    }
  } else {
    if (count === 1 && checkedState.indexOf(true) === cases.indexOf(naamval)) {
      console.log("case correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect!");
    }
  }
  return false
}

const checkCaseFourthDeclMF = (naamval, count) => {
  if (naamval === "nomSg" || naamval === "genSg" || naamval === "nomPl" || naamval === "accPl") {
    if (count === 4 && checkedState[0] === true && checkedState[1] === true && checkedState[5] === true && checkedState[8] === true) {
      console.log("cases correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect or incomplete!");
    }
  } else if (naamval === "datPl" || naamval === "ablPl") {
    if (count === 2 && checkedState[7] === true && checkedState[9] === true) {
      console.log("cases correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect or incomplete!");
    }
  } else {
    if (count === 1 && checkedState.indexOf(true) === cases.indexOf(naamval)) {
      console.log("case correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect!");
    }
  }
  return false
}

const checkCaseFifthDecl = (naamval, count) => {
  if (naamval === "nomSg" || naamval === "nomPl" || naamval === "accPl") {
    if (count === 3 && checkedState[0] === true && checkedState[5] === true && checkedState[8] === true) {
      console.log("cases correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect or incomplete!");
    }
  } else if (naamval === "genSg" || naamval === "datSg") {
    if (count === 2 && checkedState[1] === true & checkedState[2] === true) {
      console.log("cases correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect or incomplete!");
    }
  } else if (naamval === "datPl" || naamval === "ablPl") {
    if (count === 2 && checkedState[7] === true && checkedState[9] === true) {
      console.log("cases correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect or incomplete!");
    }
  } else {
    if (count === 1 && checkedState.indexOf(true) === cases.indexOf(naamval)) {
      console.log("case correctly analyzed");
      return true;
    } else {
      console.log("answer is incorrect!");
    }
  }
  return false
}

const checkCase = () => {
  let countedCases = checkCount();
  console.log("declination = " + word["declination"]);
  console.log(naamval);
  if (word["declination"] == 1) {
    return checkCaseFirstDecl(naamval, countedCases);
  } else if (word["declination"] == 2 && word["gender"] === "M") {
    return checkCaseSecondDeclM(naamval, countedCases);
  } else if (word["declination"] == 2 && word["gender"] === "N") {
    return checkCaseSecondDeclN(naamval, countedCases); 
  } else if (word["declination"] == 3 && word["gender"] === "N") {
    return checkCaseThirdDeclN(naamval, countedCases);
  } else if (word["declination"] == 3) {
    return checkCaseThirdDeclMF(naamval, countedCases);
  } else if (word["declination"] == 4 && word["gender"] === "N") {
    return checkCaseFourthDeclN(naamval, countedCases);
  } else if (word["declination"] == 4) {
    return checkCaseFourthDeclMF(naamval, countedCases);
  } else if (word["declination"] == 5) {
    return checkCaseFifthDecl(naamval, countedCases);
  }
    else return false;
}

useEffect(() => {
  document.getElementById("correctNR").innerHTML = correctNR;
  document.getElementById("total").innerHTML = total;
  console.log(correct);
}, [correct, correctNR, total]);

const checkAnswer = () => {
  if (checkNominative() && checkDeclination() && checkCase()) {
    console.log("Congratulations!!!");
    setCorrect([...correct, word[naamval]]);
    console.log(correct);
    setCorrectNR(correctNR + 1)
    setTotal(total + 1);
    document.getElementById("result").innerHTML = "Well done!"
  } else {
    console.log("Not quite...");
    setTotal(total + 1);
    document.getElementById("result").innerHTML = "Not quite..."
  }
}

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
                     checkCase={checkCase}
                     checkAnswer={checkAnswer} />
    </div>
  );
}

export default App;
