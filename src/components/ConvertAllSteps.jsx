const ConvertAllSteps = ({ DfaToNfa, alphabets }) => {
  console.log(DfaToNfa, alphabets);
  const stepLists = DfaToNfa.map((state) => {
    const elements = alphabets.map((alphabet, index) => {
      if (alphabet === "") return null;
      if (alphabet == state.transitions[index].alphabet) {
        return (
          <>
            <tr>
              {index == 0 ? (
                <>
                  <td className="p-2 py-0 text-right">⭐ {state.name}</td>
                  <td className="p-2 py-0">=</td>
                  <td className="p-2 py-0 text-center">
                    {" "}
                    {state.fromNfaStates.length == 0 ? (
                      "∅"
                    ) : (
                      <span>&#123;{state.fromNfaStates.join(",")}&#125;</span>
                    )}
                  </td>
                </>
              ) : (
                <>
                  <td colSpan={3}></td>
                </>
              )}

              <td className="p-2 py-0">
                <span className="relative px-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>

                  <span className="absolute left-[50%] top-0">{alphabet}</span>
                </span>
              </td>
              <td className="p-2 py-0  text-center">
                {" "}
                {state.nfaToDfaTransitions[index].transition == "" ? (
                  "∅"
                ) : (
                  <span>
                    &#123;{state.nfaToDfaTransitions[index].transition}&#125;
                  </span>
                )}
              </td>
              <td className="p-2 py-0">=</td>
              <td className="p-2 py-0">
                {" "}
                {state.transitions[index].transition}
              </td>
            </tr>
          </>
        );
      }

      return "nothing";
    });

    return <>{elements}</>;
  });

  return (
    <>
      <div className="scroll-bar overflow-x-auto font-semibold">
        <legend className="text-red-500 mb-3">
          ➡️ We have {DfaToNfa[0].name} ={" "}
          <span>&#123;{DfaToNfa[0].fromNfaStates.join(",")}&#125;</span>
        </legend>
        <table>{stepLists}</table>
      </div>
    </>
  );
};

export default ConvertAllSteps;
