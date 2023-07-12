import { useState } from "react";
import "./App.css";
import FaInputForm from "./components/FaInputForm";
import Header from "./components/Header";
import TransitionTable from "./components/TransitionTable";
// import DisplayState from "./components/DisplayState";
import FaTypeChecker from "./components/FaTypeChecker";
import Title from "./components/title";
export default function App() {
  const [state, setState] = useState({
    startState: "",
    endStates: "",
    states: "",
    alphabets: "",
  });

  const [transitions, setTransitions] = useState([]);
  console.log(transitions);
  // feature to check wheater FA is the DFA or NFA
 
  function checkFAType() {
    let isDFA = true;
    const states = state.states.split(",");
    const alphabets = state.alphabets.split(",");
    const startState = state.startState.split(",");

    // check if there is any empty field
    if (state.states === "" || state.alphabets === "") {
      alert("Please fill all the fields");
      return;
    }

    // check if start state is empty
    if (state.startState === "") {
      alert("Please fill the start state");
      return;
    }

    // check if end states is empty
    if (state.endStates === "") {
      alert("Please fill the end states.");
      return;
    }

    // check if start is more than one
    if (startState.length > 1) {
      isDFA = false;
      alert("This is Fa is a NFA. because it has more than one start state");
      return;
    }

    // check if there is any empty transition
    if (transitions.length < states.length * alphabets.length) {
      alert("This is Fa is a NFA. because it includes empty transition");
      return;
    }

    // check if the transitions include epsolon or not
    transitions.forEach((transition) => {
      if (transition.transition.includes("ε")) {
        isDFA = false;
        alert("This is Fa is a NFA. because it includes ε");
        return;
      }
    });

    if (isDFA) {
      alert("This is Fa is a DFA");
    }
  }

  return (
    <div>
      <Header />
      <div className="p-6 md:p-12 pb-0 pt-3">
      <Title title="Create Finite Automata"/>
        <FaInputForm state={state} setState={setState} />

        {state.states !== "" && state.alphabets !== "" && (
          <div>
            <TransitionTable
              state={state}
              transitions={transitions}
              setTransitions={setTransitions}
            />
            {/* <DisplayState state={state} transitions={transitions} /> */}
          </div>
        )}
      </div>

      {/* features */}
      <div className="p-6 md:p-12 pt-0">
        <Title title="Features"/>
        <FaTypeChecker checkFAType={checkFAType}/>
      </div>
    </div>
  );
}
