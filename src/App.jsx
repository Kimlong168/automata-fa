import { useState } from "react";
import "./App.css";
import FaInputForm from "./components/FaInputForm";
import Header from "./components/Header";
import TransitionTable from "./components/TransitionTable";
import DisplayState from "./components/DisplayState";
export default function App() {
  const [state, setState] = useState({
    startState: "",
    endStates: "",
    states: "",
    alphabets: "",
  });

  const [transitions, setTransitions] = useState([]);

  return (
    <div>
      <Header />
      <div className="p-8 pt-3">
        <FaInputForm state={state} setState={setState} />

        {state.states !== "" && state.alphabets !== "" && (
          <div>
            <TransitionTable
              state={state}
              transitions={transitions}
              setTransitions={setTransitions}
            />
            <DisplayState state={state} transitions={transitions} />
          </div>
        )}
      </div>
    </div>
  );
}
