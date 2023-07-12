import Multiselect from "multiselect-react-dropdown";
const TransitionTable = ({ state, transitions, setTransitions }) => {
  const states = state.states.split(",");
  const alphabets = state.alphabets.split(",");
  const endStates = state.endStates.split(",");
  const startState = state.startState;
  const selectData = state.states.split(",").map((state) => {
    return { name: state, id: state };
  });

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
  }

  const tableHeader = alphabets.map((alphabet) => {
    if (alphabet === "") return null;
    return (
      <>
        <th className="border border-slate-600 p-3">{alphabet}</th>
      </>
    );
  });

  const stateRow = states.map((state) => {
    if (state === "") return null;
    return (
      <>
        <tr>
          <td className="border border-slate-600 px-3 py-2 font-bold">
            {startState == state && (
              <span className="text-green-600">&#10145;</span>
            )}
            {endStates.includes(state) && (
              <span className="text-red-600">*</span>
            )}
            {state}
          </td>
          {alphabets.map((alphabet) => {
            return (
              <>
                <td className="border border-slate-600 px-3 py-2">
                  {/* <input
                    placeholder={`${state}${alphabet}`}
                    name={`${state}${alphabet}`}
                    onChange={(e) =>
                      handleOnChangeTransition(e, `${state}${alphabet}`)
                    }
                    value={transitions[`"${state}${alphabet}"`]}
                    type="text"
                    className="h-full w-full outline-0"
                  /> */}

                  <Multiselect
                    key={`${state}${alphabet}`}
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
  //     if (state === "") return null;
  //     return (
  //       <>
  //         <tr>
  //           <td className="border border-slate-600 px-3 py-2"><span className="text-red-600">*</span>{state}</td>
  //           {alphabets.map((alphabet) => {
  //             return (
  //               <>
  //                 <td className="border border-slate-600 px-3 py-2">
  //                   <input
  //                     placeholder={`${state}${alphabet}`}
  //                     name={`${state}${alphabet}`}
  //                     onChange={(e) =>
  //                       handleOnChangeTransition(e, `${state}${alphabet}`)
  //                     }
  //                     value={transitions[`"${state}${alphabet}"`]}
  //                     type="text"
  //                     className="h-full w-full outline-0"
  //                   />
  //                 </td>
  //               </>
  //             );
  //           })}
  //         </tr>
  //       </>
  //     );
  //   });

  return (
    <div className="p-4 w-full my-5 scroll-bar overflow-x-auto ">
      <table className="border-collapse border border-slate-500 min-w-full h-full">
        <thead className="bg-white border-b text-left">
          <tr>
            <th className="border border-slate-600 p-3 text-center text-green-700">
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
