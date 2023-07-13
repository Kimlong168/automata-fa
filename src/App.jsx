import { useState } from "react";
import "./App.css";
import FaInputForm from "./components/FaInputForm";
import Header from "./components/Header";
import TransitionTable from "./components/TransitionTable";
// import DisplayState from "./components/DisplayState";
import FaTypeChecker from "./components/FaTypeChecker";
import StringAceptedChecker from "./components/StringAceptedChecker";
import Title from "./components/title";
export default function App() {
  const [state, setState] = useState({
    startState: "",
    endStates: "",
    states: "",
    alphabets: "",
  });
  const [isDFA, setIsDFA] = useState(null);
  const [string, setString] = useState("");
  const [transitions, setTransitions] = useState([]);

  console.log("transitions: ", transitions);
  console.log("state: ", state);
  const states = state.states.split(",");
  const alphabets = state.alphabets.split(",");
  const startState = state.startState.split(",");
  const endStates = state.endStates.split(",");

  // feature to check wheater FA is the DFA or NFA
  function checkFAType() {
    let alertDFA = true;
    // check if there is any empty field
    if (state.states === "" || state.alphabets === "") {
      alert("Please fill all the fields");
      return;
    }

    if (state.startState === "") {
      // check if start state is empty
      alert("Please fill the start state");
      return;
    }

    if (state.endStates === "") {
      // check if end states is empty
      alert("Please fill the end states.");
      return;
    }

    if (startState.length > 1) {
      // check if start is more than one
      setIsDFA(false);
      alertDFA = false;
      alert("This is Fa is a NFA. because it has more than one start state");
      return;
    }

    // check if there is any empty transition
    let transitionCount = 0;
    transitions.forEach((transition) => {
      if (transition.transition !== "") {
        transitionCount++;
      }
    });

    if (transitionCount < states.length * alphabets.length) {
      setIsDFA(false);
      alertDFA = false;
      alert("This is Fa is a NFA. because it includes empty transition");
      return;
    }

    // check if the transitions include epsolon or not
    transitions.forEach((transition) => {
      if (transition.transition.includes("ε")) {
        setIsDFA(false);
        alertDFA = false;
        alert("This is Fa is a NFA. because it includes ε");
        return;
      }
    });

    // check if the transitions include more than one transition for a state and alphabet
    transitions.forEach((transition) => {
      const result = transition.transition.split(",");
      if (result.length > 1) {
        setIsDFA(false);
        alertDFA = false;
        alert(
          "This is Fa is a NFA. because it includes more than one transition for a state and alphabet"
        );
        return;
      }
    });

    if (alertDFA) {
      alert("This is Fa is a DFA");
      setIsDFA(true);
    }
  }

  function checkString() {
    const stringArray = string.split("");

    // check if the string is accepted or not
    if (string === "") {
      alert("Please enter a string");
      return;
    }

    //for DFA
    console.log("=================DFA==================");

    let state = startState[0];
    console.log("start state: ", state);
    stringArray.forEach((character) => {
      console.log("character: ", character);

      for (let i = 0; i < transitions.length; i++) {
        console.log(
          "transition: ",
          transitions[i].state,
          transitions[i].alphabet
        );
        if (
          transitions[i].state === state &&
          transitions[i].alphabet === character
        ) {
          state = transitions[i].transition;
          console.log("state met condition:", state);
          break;
        }
      }

      if (state === undefined) {
        alert("This string is not accepted, undifined");
      }
    });

    let result = endStates.includes(state);

    if (result) {
      alert("This string is accepted");
    } else {
      alert("This string is not accepted");
    }
  }

  return (
    <div>
      <Header />
      <div className="p-6 md:p-12 pb-0 pt-3">
        <Title title="Create Finite Automata" />
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
        <Title title="Features" />
        <FaTypeChecker checkFAType={checkFAType} />
        <StringAceptedChecker
          checkString={checkString}
          string={string}
          setString={setString}
          isDFA={isDFA}
        />
      </div>
    </div>
  );
}
