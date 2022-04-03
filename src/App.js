import './App.css';
import data from './Data';
import Header from './components/Header';
import Maincomponent from './components/Maincomponent';

function App() {
  const nouns = data;
  const cases = ["nom-sg", "gen-sg", "dat-sg", "acc-sg", "abl-sg", "nom-pl", "gen-pl", "dat-pl", "acc-pl", "abl-pl"];

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
  }

  return (
    <div className="App">
      <Header />
      <Maincomponent nouns={nouns} getNoun={getNoun}/>
    </div>
  );
}

export default App;
