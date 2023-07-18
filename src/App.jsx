import { useState } from "react";
import "./App.css";
import FaInputForm from "./components/FaInputForm";
import Header from "./components/Header";
import TransitionTable from "./components/TransitionTable";
// import DisplayState from "./components/DisplayState";
import FaTypeChecker from "./components/FaTypeChecker";
import StringAceptedChecker from "./components/StringAceptedChecker";
import Title from "./components/title";
import Converter from "./components/Converter";

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

  //design finite automata , fill all the fields
  function isFA() {
    // check if there is any empty states and alphabets
    if (
      state.states === "" ||
      state.alphabets === "" ||
      state.startState === "" ||
      state.endStates === ""
    ) {
      alert("Please fill all the fields");
      return false;
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
      return false;
    }

    return true;
  }

  function isDfa() {
    let alertDFA = true;
    // check if there is any empty field
    if (!isFA()) return false;
    // check if the transitions include ∅ or not
    for (let i = 0; i < transitions.length; i++) {
      if (transitions[i].transition.includes("∅")) {
        setIsDFA(false);
        alertDFA = false;
        let msg = "This is Fa is a NFA. because it includes ∅ transition";
        return msg;
      }
    }

    // check if the transitions include epsolon or not
    if (isIncludeEpsolon) {
      setIsDFA(false);
      alertDFA = false;
      let msg = "This is Fa is a NFA. because it includes ε transition";
      return msg;
    }

    // check if the transitions include more than one transition for a state and alphabet
    for (let i = 0; i < transitions.length; i++) {
      const result = transitions[i].transition.split(",");
      if (result.length > 1) {
        setIsDFA(false);
        alertDFA = false;
        let msg =
          "This is Fa is a NFA. because it includes more than one transition for a state and alphabet";

        return msg;
      }
    }

    if (alertDFA) {
      setIsDFA(true);
      let msg = "This is Fa is a DFA";
      return msg;
    }
  }

  // feature to check wheater FA is the DFA or NFA
  function checkFAType() {
    const msg = isDfa();
    if (msg) {
      alert(msg);
    }
  }

  // check if the string is accepted or not
  function checkStringDFA() {
    //to make sure all fields are filled
    //to find if the FA is DFA or NFA
    if (!isDfa()) return;

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

      // if (state === undefined) {
      //   alert("This string is not accepted, undifined");
      // }
    });

    let result = endStates.includes(state);

    if (result) {
      alert("This string is accepted");
    } else {
      alert("This string is not accepted");
    }
  }

  const checkStringNFA = () => {
    //to make sure all fields are filled
    //to find if the FA is DFA or NFA
    if (!isDfa()) return;

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

                console.log("delete", nfaStates[j]);
                break;
              }
            }

            //configuration for NFA
            if (transitions[i].transition.includes(",")) {
              const result = transitions[i].transition.split(",");
              console.log("add more state :", result);
              tempStates = [...tempStates, ...result];
            } else {
              if (transitions[i].transition !== "∅") {
                console.log("add more state :", transitions[i].transition);
                tempStates = [...tempStates, transitions[i].transition];
              }
            }

            console.log("state met condition:", tempStates);
          }
        }

        // ----------------------- epsilon transition -----------------------
        let tempState_length = tempStates.length;
        let temp_tempStates = tempStates;
        for (let k = 0; k < tempState_length; k++) {
          for (let m = 0; m < transitions.length; m++) {
            if (
              transitions[m].state === tempStates[k] &&
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

  //---------------------------------convert NFA to DFA--------------------------
  const convertNFAtoDFA = () => {
    //to make sure all fields are filled
    //to find if the FA is DFA or NFA
    if (!isDfa()) return;

    let nfaStates = [];
    let dfaStates = [];
    // let dfaTransitions = [];
    nfaStates.push(startState);

    //find transition for NFA for epsilon
    transitions.forEach((transition) => {
      for (let i = 0; i < nfaStates.length; i++) {
        if (nfaStates[i] === transition.state && transition.alphabet === "ε") {
          if (transition.transition.includes(",")) {
            const result = transition.transition.split(",");
            nfaStates = [...nfaStates, ...result];
          } else if (transition.transition !== "∅") {
            nfaStates = [...nfaStates, transition.transition];
          }
        }
      }
    });

    dfaStates.push({
      fromNfaStates: nfaStates,
      name: "q0'",
      isStart: true,
      isEndState: false,
      transitions: [],
    });

    //find transition for NFA for all aphabets
    //loop through dfaStates
    console.log("============Converter===============");
    // dfaStates.length
    for (let i = 0; i < dfaStates.length; i++) {
      //loop through alphabets
      console.log("=====dfa from Nfa States=====", dfaStates[i].fromNfaStates);

      alphabets.forEach((alphabet) => {
        console.log("---aphabet---: ", alphabet);
        console.log("start dfaStates: ", dfaStates[i].fromNfaStates);

        let tempDfaStates = dfaStates[i].fromNfaStates;
        // let tempDfaStates = [];
        // let tempDfaTransitions = dfaStates[i].transitions;

        for (let j = 0; j < dfaStates[i].fromNfaStates.length; j++) {
          for (let n = 0; n < transitions.length; n++) {
            //find transition for NFA for all aphabets
            if (
              dfaStates[i].fromNfaStates[j] == transitions[n].state &&
              alphabet == transitions[n].alphabet
            ) {
              //delete the old state

              let time = 0;
              tempDfaStates = tempDfaStates.filter((item) => {
                if (item === dfaStates[i].fromNfaStates[j] && time === 0) {
                  time++;
                  return false;
                } else {
                  return true;
                }
              });

              console.log("delete", dfaStates[i].fromNfaStates[j]);

              //add new state
              if (transitions[n].transition.includes(",")) {
                let result = transitions[n].transition.split(",");
                //check existing state
                result = result.filter((item) => {
                  if (
                    tempDfaStates.includes(item) &&
                    !dfaStates[i].fromNfaStates.includes(item)
                  ) {
                    return false;
                  } else {
                    return true;
                  }
                });
                tempDfaStates = [...tempDfaStates, ...result];
                console.log("add to tempDfaStates: ", result);
              } else if (transitions[n].transition !== "∅") {
                //check existing state
                if (
                  !(
                    tempDfaStates.includes(transitions[n].transition) &&
                    !dfaStates[i].fromNfaStates.includes(
                      transitions[n].transition
                    )
                  )
                ) {
                  tempDfaStates = [...tempDfaStates, transitions[n].transition];
                  console.log(
                    "add to tempDfaStates: ",
                    transitions[n].transition
                  );
                }
              }

              //epsolon transition
              //double check here for epsolon transition
              console.log("epsolon---")
              transitions.forEach((transition) => {
                for (let m = 0; m < tempDfaStates.length; m++) {
                  if (
                    tempDfaStates[m] === transition.state &&
                    transition.alphabet === "ε"
                  ) {
                    if (transition.transition.includes(",")) {
                      let result = transition.transition.split(",");
                      //check existing state
                      result = result.filter((item) => {
                        if (tempDfaStates.includes(item)) {
                          return false;
                        } else {
                          return true;
                        }
                      });

                      tempDfaStates = [...tempDfaStates, ...result];
                      console.log("add to tempDfaStates epsolon: ", result);
                    } else if (transition.transition !== "∅") {
                      //check existing state
                      if (!tempDfaStates.includes(transition.transition)) {
                        tempDfaStates = [
                          ...tempDfaStates,
                          transition.transition,
                        ];
                        console.log(
                          "add to tempDfaStates epsolon: ",
                          transition.transition
                        );
                      }
                    }
                  }
                }
              });

              console.log("tempDfaStates: ", tempDfaStates);

              break;
            }
          }
        }

        //add tempDfaStates to dfaStates
        let isExist = false;
        for (let k = 0; k < dfaStates.length; k++) {
          //problem here: isExist never turns to true
          if (dfaStates[k].fromNfaStates.length !== tempDfaStates.length)
            continue;

          isExist = dfaStates[k].fromNfaStates.every((element, index) => {
            return element === tempDfaStates[index];
          });
          console.log("isExist: ", isExist);

          if (isExist) break;
        }

        if (!isExist) {
          console.log("**push to dfaStates:", tempDfaStates);
          dfaStates.push({
            fromNfaStates: tempDfaStates,
            name: "q" + dfaStates.length + "'",
            isStart: false,
            isEndState: false,
            transitions: [],
          });
        }

        //push transitions to the dfaStates.transitions
        dfaStates[i].transitions.push({
          alphabet: alphabet,
          transition: tempDfaStates.join(","),
        });

        console.log("transitions", dfaStates[i].transitions);
      });
    }

    console.log("dfaStates:", dfaStates);
  };

  return (
    <div>
      <Header />
      <div className="p-6 md:p-12 pb-0 pt-3">
        <Title title="Design Finite Automata" />

        {/* Form to design FA */}
        <FaInputForm
          state={state}
          setState={setState}
          setTransitions={setTransitions}
          setIsDFA={setIsDFA}
          isIncludeEpsolon={isIncludeEpsolon}
          setIsIncludeEpsolon={setIsIncludeEpsolon}
        />

        {state.states !== "" && state.alphabets !== "" && (
          <div>
            {/* transition table  */}
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
      <div className="p-6 md:p-12 pt-4">
        <Title title="Features" />

        {/* feature to find if FA is NFA or DFA */}
        <FaTypeChecker checkFAType={checkFAType} isDFA={isDFA} />

        {/* feature to check if a string is accepted or not */}
        <StringAceptedChecker
          checkStringDFA={checkStringDFA}
          checkStringNFA={checkStringNFA}
          string={string}
          setString={setString}
          isDFA={isDFA}
        />

        {/* feature to convert NFA to DFA */}
        <Converter convertNFAtoDFA={convertNFAtoDFA} />
      </div>
    </div>
  );
}
