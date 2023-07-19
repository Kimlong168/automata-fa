const NfaToDfaTable = ({ DfaToNfa, alphabets }) => {
  // header
  console.log(alphabets);
  const header = alphabets.map((alphabet) => {
    if (alphabet === "") return null;
    return (
      <>
        <th className="border border-blue-500 p-3 text-center text-orange-400">
          {alphabet}
        </th>
      </>
    );
  });

  //   body
  const body = DfaToNfa.map((state, index) => {

    const transitions = alphabets.map((alphabet) => {
      if (alphabet === "") return null;

      for (let i = 0; i < state.transitions.length; i++) {
        if (alphabet == state.transitions[i].alphabet) {
          return (
            <>
              <td className="border border-blue-500 p-3 text-blue-600" key={index}>
                {state.transitions[i].transition == ""
                  ? "∅"
                  : state.transitions[i].transition}
              </td>
            </>
          );
        }
      }

      return 'nothing';
    });

    // dfaStates[i].transitions.push({
    //     alphabet: alphabet,
    //     transition: tempDfaStates.join(","),
    //   });

    return (
      <>
        <tr>
          {/* state */}
          <td className="border border-blue-500 p-3" key={index}>
            {state.isStart && <span className="text-green-600">&#10145;</span>}
            {state.isEndState && <span className="text-red-600">*</span>}
            {state.name}
          </td>

          {/* transitions */}
          {transitions}
        </tr>
      </>
    );
  });

  return (
    <div>
      <table className="border-collapse min-w-full h-full border">
        <thead className="bg-white border-b">
          <tr>
            <th className="border border-blue-500 p-3 text-center text-orange-400">
              Transitions
            </th>
            {header}
          </tr>
        </thead>
        <tbody>{body}</tbody>
      </table>
    </div>
  );
};

export default NfaToDfaTable;
