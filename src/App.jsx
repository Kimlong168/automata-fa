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
  const startState = state.startState;
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

    // check if all transitions are filled
    let count = 0;
    for (let i = 0; i < transitions.length; i++) {
      if (transitions[i].transition !== "") {
        count++;
      }
    }
    if (count < states.length * alphabets.length) {
      alert("Please fill the transitions");
      return;
    }

    // check if the transitions include ∅ or not
    for (let i = 0; i < transitions.length; i++) {
      if (transitions[i].transition.includes("∅")) {
        setIsDFA(false);
        alertDFA = false;
        alert("This is Fa is a NFA. because it includes empty transition");
        return;
      }
    }

    // check if the transitions include epsolon or not
    for (let i = 0; i < transitions.length; i++) {
      if (transitions[i].transition.includes("ε")) {
        setIsDFA(false);
        alertDFA = false;
        alert("This is Fa is a NFA. because it includes ε transition");
        return;
      }
    }

    // check if the transitions include more than one transition for a state and alphabet
    for (let i = 0; i < transitions.length; i++) {
      const result = transitions[i].transition.split(",");
      if (result.length > 1) {
        setIsDFA(false);
        alertDFA = false;
        alert(
          "This is Fa is a NFA. because it includes more than one transition for a state and alphabet"
        );
        return;
      }
    }

    if (alertDFA) {
      alert("This is Fa is a DFA");
      setIsDFA(true);
    }
  }

  // check if the string is accepted or not
  function checkStringDFA() {
    const stringArray = string.split("");

    if (string === "") {
      alert("Please enter a string");
      return;
    }

    //for DFA
    console.log("=================DFA==================");

    let state = startState;
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

  function checkStringNFA() {
    const stringArray = string.split("");

    if (string === "") {
      alert("Please enter a string");
      return;
    }

    //for NFA
    console.log("=================NFA==================");

    let state = startState;
    // console.log("start state: ", state);
    // stringArray.forEach((character) => {
    //   console.log("character: ", character);

    //   for (let i = 0; i < transitions.length; i++) {
    //     console.log(
    //       "transition: ",
    //       transitions[i].state,
    //       transitions[i].alphabet
    //     );
    //     if (
    //       transitions[i].state === state &&
    //       transitions[i].alphabet === character
    //     ) {
    //       state = transitions[i].transition;
    //       console.log("state met condition:", state);
    //       break;
    //     }
    //   }

    //   if (state === undefined) {
    //     alert("This string is not accepted, undifined");
    //   }
    // });

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
        <FaInputForm
          state={state}
          setState={setState}
          setTransitions={setTransitions}
        />

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
          checkStringDFA={checkStringDFA}
          checkStringNFA={checkStringNFA}
          string={string}
          setString={setString}
          isDFA={isDFA}
        />
      </div>
    </div>
  );
}
