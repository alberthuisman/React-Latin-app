import {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import data from './Data';
import Header from './components/Header';
import Maincomponent from './components/Maincomponent';
import Help from './components/Help';


function App() {
  const nouns = data; //the list of words to be analyzed
  const cases = ["nomSg", "genSg", "datSg", "accSg", "ablSg", "nomPl", "genPl", "datPl", "accPl", "ablPl"];
  const [word, setWord] = useState(""); //state to keep track of the chosen word out of the list of words
  const [naamval, setNaamval] = useState(""); //state to keep track of the specific selected form of the word
  const [correct, setCorrect] = useState([]); //state to keep track of the correctly analyzed forms
  const [correctNR, setCorrectNR] = useState(0); //state to keep track of the number of correctly analyzed forms 
  const [total, setTotal] = useState(0); //state to keep track of number of attempts
  let counter = 0; //variable used to prevent getNoun from an endless search when most forms have been analyzed
  
  /*function to get a new word to analyze: it first clears all previous entries and sets the 'check answer' to enabled
  It randomly selects a word from the list of words and then a random form of that word. If the specific form has
  already been succesfully analyzed, the form is skipped and getNoun is called again to continue the search*/
  const getNoun=()=>{
    clearFields();
    toggleDisabled();
    let nounIndex = Math.ceil(Math.random()*nouns.length-1);
    let noun = nouns[nounIndex];
    let caseIndex = Math.ceil(Math.random()*9);
    let naamval = cases[caseIndex];
    let questionField = document.querySelector(".toBeAnalyzed");
    //console.log(noun[`${naamval}`]);
    //console.log(naamval);
    //console.log(noun['ablPl']);
    if (!correct.includes(noun[`${naamval}`])) {
      questionField.innerHTML = noun[`${naamval}`];
      setWord(noun);
      setNaamval(naamval);
    } else {
      if (counter < 30) {
        counter++;
        getNoun();
      } else {
        //console.log("Out of exercises!")
        document.getElementById("result").innerHTML = "Bravo: I'm out of new forms to analyze!";
      }
    }
  }

  //Function to clear all input- en display-fields with every new word to analyze
  const clearFields = () => {
    document.querySelector(".toBeAnalyzed").innerHTML = "";
    document.getElementById("nomSG").value = "";
    document.getElementById("declination").value = "0";
    document.getElementById("declination").classList.remove("correctInput");
    setCheckedState(checkedState.fill(false));
    document.getElementById("result").innerHTML = "";
  }

  /* Function to disable the 'Check Answer'-button after giving a correct answer and 
  enabling the button again with every new word to analyze */
  const [disable, setDisable] = useState(true);
  const toggleDisabled = () => {
    disable === false ? setDisable(true) : setDisable(false);
  }

  //Compares the nominative singular entered by the user with the correct basis form of the given word
  const checkNominative = () => {
    let nomInput = document.getElementById("nomSG").value;
    if (nomInput === word["nomSg"]) {
      //console.log("correct");
      document.getElementById("nomSG").classList.remove("wrongInput");
      document.getElementById("nomSG").classList.add("correctInput");
      return true;
    } else {
      //console.log("wrong!")
      document.getElementById("nomSG").classList.remove("correctInput");
      document.getElementById("nomSG").classList.add("wrongInput");
      return false;
    }
}
//check?
//Compares the declination type selected by the user with the correct declination type of the given word
const checkDeclination = () => {
  let declination = document.getElementById("declination").value;
  //console.log(declination);
  //console.log(word["declination"]);
  if (parseInt(declination) === word["declination"]) {
    //console.log("correct declination");
    document.getElementById("declination").classList.remove("wrongInput");
    document.getElementById("declination").classList.add("correctInput");
    return true;
  } else {
    //console.log("wrong declination");
    document.getElementById("declination").classList.remove("correctInput");
    document.getElementById("declination").classList.add("wrongInput");
    return false;
  }
}

//State to keep track of selected checkboxes. It starts with all checkboxes unselected
const [checkedState, setCheckedState] = useState(
  new Array(cases.length).fill(false)
);

//updates the array of selected checkboxes with every selection by the user
const handleOnChange = (position) => {
  let updatedCheckedState = checkedState.map((item, index) => index === position ? !item : item);
  setCheckedState(updatedCheckedState);
  //console.log(updatedCheckedState);
};

//state to keep track of the number of selected checkboxes
//not really in use, because of problems with synchronization
const [checkedCount, setCheckedCount] = useState(0);
const checkCount = () => {
  //console.log("Current selected cases: " + checkedState)
  let count = 0;
  for (let i = 0; i < checkedState.length; i++) {
    if (checkedState[i] === true) {
      count++
    }  
  }
  setCheckedCount(count);
  console.log("checked Count = " + checkedCount);
  //console.log("calculated count = " + count);
  return count;
}

//Checks for words of the first declination whether number AND label of selected cases are correct
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

//Checks for Masculine words of the second declination whether number AND label of selected cases are correct
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

//Checks for Neuter words of the second declination whether number AND label of selected cases are correct
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

//Checks for Neuter words of the third declination whether number AND label of selected cases are correct
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

//Checks for Masc/Fem words of the third declination whether number AND label of selected cases are correct
const checkCaseThirdDeclMF = (naamval, count) => {
  if (word["nomSg"] === word["genSg"] && (naamval === "nomSg" || naamval === "genSg")) {
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

//Checks for Neuter words of the fourth declination whether number AND label of selected cases are correct
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

//Checks for Masc/Fem words of the fourth declination whether number AND label of selected cases are correct
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

//Checks for words of the fifth declination whether number AND label of selected cases are correct
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

//Selects the right function to check case and number depending on declination type and gender
const checkCase = () => {
  let countedCases = checkCount();
  console.log("declination = " + word["declination"]);
  console.log(naamval);
  if (parseInt(word["declination"]) === 1) {
    return checkCaseFirstDecl(naamval, countedCases);
  } else if (parseInt(word["declination"]) === 2 && word["gender"] === "M") {
    return checkCaseSecondDeclM(naamval, countedCases);
  } else if (parseInt(word["declination"]) === 2 && word["gender"] === "N") {
    return checkCaseSecondDeclN(naamval, countedCases); 
  } else if (parseInt(word["declination"]) === 3 && word["gender"] === "N") {
    return checkCaseThirdDeclN(naamval, countedCases);
  } else if (parseInt(word["declination"]) === 3) {
    return checkCaseThirdDeclMF(naamval, countedCases);
  } else if (parseInt(word["declination"]) === 4 && word["gender"] === "N") {
    return checkCaseFourthDeclN(naamval, countedCases);
  } else if (parseInt(word["declination"]) === 4) {
    return checkCaseFourthDeclMF(naamval, countedCases);
  } else if (parseInt(word["declination"]) === 5) {
    return checkCaseFifthDecl(naamval, countedCases);
  }
    else return false;
}

/*Hook to force synchronization of the states to keep track of the number of 
correctly analyzed forms and number of attempts */
useEffect(() => {
  document.getElementById("correctNR").innerHTML = correctNR;
  document.getElementById("total").innerHTML = total;
}, [correct, correctNR, total]);

/* Uses the various functions above for the final check of the inputs, gives feedback 
and updates the scoreboard; with a correct answer the correctly analyzed form is added 
to the array of already analyzed forms and the 'Check Answer' button is disabled */
const checkAnswer = () => {
  if (checkNominative() && checkDeclination() && checkCase()) {
    //console.log("Congratulations!!!");
    setCorrect([...correct, word[naamval]]);
    //console.log(correct);
    setCorrectNR(correctNR + 1)
    setTotal(total + 1);
    document.getElementById("result").innerHTML = "Well done!";
    document.getElementById("result").classList.remove("wrongInput");
    document.getElementById("result").classList.add("correctInput");
    toggleDisabled();
  } else {
    //console.log("Not quite...");
    setTotal(total + 1);
    document.getElementById("result").innerHTML = "Not quite...";
    document.getElementById("result").classList.remove("correctInput");
    document.getElementById("result").classList.add("wrongInput");
  }
}

//Opens a cheatsheet on top of the page with the declension of Latin words per declination type
const openCheatSheet = () => {
  document.querySelector(".cheatSheetContainer").style.display = "block";
}

//closes the cheatsheet
const closeCheatSheet = () => {
  document.querySelector(".cheatSheetContainer").style.display = "none";

}

  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element ={
      <Maincomponent nouns={nouns} 
                     getNoun={getNoun} 
                     checkNominative={checkNominative} 
                     checkDeclination={checkDeclination}
                     checkedState={checkedState}
                     handleOnChange={handleOnChange}
                     checkCount = {checkCount} 
                     checkCase={checkCase}
                     checkAnswer={checkAnswer}
                     disable={disable} 
                     openCheatSheet={openCheatSheet}
                     closeCheatSheet={closeCheatSheet}/>
        }/>
        <Route path="/help" element={<Help/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
