import React from "react";

const DisplayState = ({ state, transitions }) => {
  const TransitionTable = transitions.map((transition) => {
    if (transition.transition === "") return null;
    return (
      <>
        <h1>
          Transition({transition.state}--{transition.alphabet}): {transition.transition}
        </h1>
      </>
    );
  });

  return (
    <div>
      <div className="text-xl font-bold my-5 ">Summary</div>
      <h1>States: {state.states}</h1>
      <h1>Start State: {state.startState}</h1>
      <h1>End States: {state.endStates}</h1>
      <h1>Alphabets: {state.alphabets}</h1>
      {TransitionTable}
    </div>
  );
};

export default DisplayState;
