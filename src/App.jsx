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
  const [transitions, setTransitions] = useState([]);
  const [isDFA, setIsDFA] = useState(null);
  const [string, setString] = useState("");
  const [isIncludeEpsolon, setIsIncludeEpsolon] = useState(false);
  console.log("isIncludeEpsolon: ", isIncludeEpsolon);
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
    if (
      state.states === "" ||
      state.alphabets === "" ||
      state.startState === "" ||
      state.endStates === ""
    ) {
      alert("Please fill all the fields");
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
    if (isIncludeEpsolon) {
      setIsDFA(false);
      alertDFA = false;
      alert("This is Fa is a NFA. because it includes ε transition");
      return;
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

  const checkStringNFA = () => {
    const stringArray = string.split("");

    if (string === "") {
      alert("Please enter a string");
      return;
    }

    //for NFA
    console.log("=================NFA==================");

    let nfaStates = [];
    let tempStates = [];

    nfaStates.push(startState);

    stringArray.forEach((character) => {
      console.log("-------character-------: ", character);
      console.log("start state: ", nfaStates);
      tempStates = nfaStates;

      // ---------------------------------------------------

      let length = nfaStates.length;
      for (let j = 0; j < length; j++) {
        for (let i = 0; i < transitions.length; i++) {
          if (
            transitions[i].state === nfaStates[j] &&
            transitions[i].alphabet === character
          ) {
            console.log(
              "transition: ",
              transitions[i].state,
              transitions[i].alphabet,
              " -> ",
              transitions[i].transition
            );

            //the problem is here : delete from tempstate but it also deleted form state (solved)

            for (let i = 0; i < tempStates.length; i++) {
              if (tempStates[i] === nfaStates[j]) {
                //problem is here : delete only one state (solved)

                let time = 0;
                tempStates = tempStates.filter((item) => {
                  if (item === nfaStates[j] && time === 0) {
                    time++;
                    return false;
                  } else {
                    return true;
                  }
                });

                console.log("delete", i + 1, nfaStates[j]);
                break;
              }
            }

            //configuration for NFA
            if (transitions[i].transition.includes(",")) {
              const result = transitions[i].transition.split(",");
              console.log("add more state :", result);
              tempStates = [...tempStates, ...result];
              // state = [...state, ...result];
            } else {
              if (transitions[i].transition !== "∅") {
                console.log("add more state :", transitions[i].transition);
                tempStates = [...tempStates, transitions[i].transition];
                // state = [...state, transitions[i].transition];
              }
            }

            console.log("state met condition:", tempStates);

            // break;
          }
        }
        let tempState_length = tempStates.length;
        let temp_tempStates = tempStates;
        for (let k = 0; k < tempState_length; k++) {
          for (let m = 0; m < transitions.length; m++) {
            if (
              transitions[m].state === temp_tempStates[k] &&
              transitions[m].alphabet === "ε"
            ) {
              if (transitions[m].transition.includes(",")) {
                const result = transitions[m].transition.split(",");
                let finalResult = result.filter((item) => {
                  if (temp_tempStates.includes(item)) {
                    return false;
                  } else {
                    return true;
                  }
                });

                temp_tempStates = [...temp_tempStates, ...finalResult];
                console.log(
                  "epsilon transition: ",
                  transitions[m].state,
                  " -> ",
                  transitions[m].transition
                );
                console.log("state met condition (epsilon):", temp_tempStates);
              } else if (transitions[m].transition !== "∅") {
                if (!temp_tempStates.includes(transitions[m].transition)) {
                  temp_tempStates = [
                    ...temp_tempStates,
                    transitions[m].transition,
                  ];
                  console.log(
                    "epsilon transition: ",
                    transitions[m].state,
                    " -> ",
                    transitions[m].transition
                  );
                  console.log(
                    "state met condition (epsilon):",
                    temp_tempStates
                  );
                }
              }

              break;
            }
          }
        }

        tempStates = temp_tempStates;
      }

      console.log("temp state:", tempStates);
      console.log("original state:", nfaStates);
      nfaStates = tempStates;
    });

    console.log("all states: ", nfaStates);
    let result = true;

    if (nfaStates.length == 0) {
      result = false;
    }

    for (let i = 0; i < nfaStates.length; i++) {
      result = endStates.includes(nfaStates[i]);
      if (result) {
        break;
      }
    }

    if (result) {
      alert("This string is accepted");
    } else {
      alert("This string is not accepted");
    }
  };

  return (
    <div>
      <Header />
      <div className="p-6 md:p-12 pb-0 pt-3">
        <Title title="Design Finite Automata" />
        <FaInputForm
          state={state}
          setState={setState}
          setTransitions={setTransitions}
          setIsDFA={setIsDFA}
          setIsIncludeEpsolon={setIsIncludeEpsolon}
        />

        {state.states !== "" && state.alphabets !== "" && (
          <div>
            <TransitionTable
              state={state}
              transitions={transitions}
              setTransitions={setTransitions}
              setIsDFA={setIsDFA}
              isIncludeEpsolon={isIncludeEpsolon}
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
