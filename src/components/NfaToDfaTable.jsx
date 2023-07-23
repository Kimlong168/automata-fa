const NfaToDfaTable = ({ DfaToNfa, alphabets }) => {
  // header
  console.log(alphabets);
  const header = alphabets.map((alphabet) => {
    if (alphabet === "") return null;
    return (
      <>
        <th key={alphabet} className="border border-blue-500 p-3 text-center">{alphabet}</th>
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
            <td className="border border-blue-500 p-3 text-center" key={alphabet}>
              {state.transitions[i].transition}
            </td>
          );
        }
      }

      return (
        <>
          <td className="border border-blue-500 p-3 text-center" key={alphabet}>
            nothing
          </td>
        </>
      );
    });

    return (
      <>
        <tr>
          {/* state */}
          <td
            className="border border-blue-500 p-3 text-center font-bold"
            key={index}
          >
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
      <h1 className="text-lg md:text-xl text-orange-400 font-bold uppercase px-5 mb-3 mt-10 flex gap-3 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="orange"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
        Table representation (NFA to DFA)
      </h1>
      <div className="w-full my-5 scroll-bar overflow-x-auto shadow-xl">
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
    </div>
  );
};

export default NfaToDfaTable;
