import Multiselect from "multiselect-react-dropdown";
const TransitionTable = ({
  state,
  transitions,
  setTransitions,
  setIsDFA,
  isIncludeEpsolon,
}) => {
  const states = state.states.split(",");
  const alphabets = state.alphabets.split(",");
  const endStates = state.endStates.split(",");
  const startState = state.startState;
  const selectData = state.states.split(",").map((state) => {
    return { name: state, id: state };
  });

  //include ∅ in select options
  selectData.push({ name: "∅", id: "∅" });

  //include epsolon in alphabets/table header
  if (isIncludeEpsolon) {
    alphabets.push("ε");
  } else if (alphabets.includes("ε")) {
    alphabets.pop();
  }

  function handleOnSelect(e, id, state, alphabet) {
    const value = e.map((state) => state.name).join(",");
    let isOld = false;

    transitions.forEach((transition) => {
      if (transition.id === id) {
        const newTransitions = transitions.filter(
          (transition) => transition.id !== id && transition.transition !== ""
        );
        setTransitions([
          ...newTransitions,
          { transition: value, id: id, state: state, alphabet: alphabet },
        ]);
        isOld = true;
        return;
      }
    });

    if (!isOld) {
      setTransitions([
        ...transitions,
        {
          transition: value,
          id: id,
          state: state,
          alphabet: alphabet,
        },
      ]);
    }

    //reset isDFA to null when transition change
    setIsDFA(null);
  }

  const tableHeader = alphabets.map((alphabet) => {
    if (alphabet === "") return null;
    return (
      <>
        <th className="border border-blue-500 p-3">{alphabet}</th>
      </>
    );
  });

  const stateRow = states.map((state) => {
    if (state === "") return null;
    return (
      <>
        <tr>
          <td className="border border-blue-500 px-3 py-2 font-bold  text-center">
            {startState == state && (
              <span className="text-green-600">&#10145;</span>
            )}
            {endStates.includes(state) && (
              <span className="text-red-600">*</span>
            )}
            {state}
          </td>
          {alphabets.map((alphabet) => {
            //to make transition table change when we change states or alphabets (set transition to empty)
            let transitionArr = transitions.find(
              // find the transition for this state and alphabet
              (transition) => transition.id === `${state}${alphabet}`
            );

            if (!transitionArr) {
              transitionArr = [];
            } else if (transitionArr.transition === "") {
              transitionArr = [];
            } else {
              transitionArr = transitionArr.transition
                .split(",")
                .map((state) => {
                  return { name: state, id: state };
                });
            }

            return (
              <>
                <td
                  className="border border-blue-500 px-3 py-2"
                  key={`${state}${alphabet}`}
                >
                  <Multiselect
                    caseSensitiveSearch={true}
                    selectedValues={transitionArr}
                    placeholder={`${state}${alphabet}`}
                    options={selectData}
                    displayValue="name"
                    onSelect={(e) =>
                      handleOnSelect(e, `${state}${alphabet}`, state, alphabet)
                    } // Function will trigger on select event
                    onRemove={(e) =>
                      handleOnSelect(e, `${state}${alphabet}`, state, alphabet)
                    } // Function will trigger on remove event
                  />
                </td>
              </>
            );
          })}
        </tr>
      </>
    );
  });

  return (
    <div className="w-full my-5 scroll-bar overflow-x-auto mt-10 shadow-xl">
      <table className="border-collapse min-w-full h-full border">
        <thead className="bg-white border-b">
          <tr>
            <th className="border border-blue-950 p-3 text-center text-orange-400">
              Transition
            </th>
            {tableHeader}
          </tr>
        </thead>
        <tbody>{stateRow}</tbody>
      </table>
    </div>
  );
};

export default TransitionTable;
