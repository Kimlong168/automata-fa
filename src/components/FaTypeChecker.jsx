import Btn from "./Btn";
const FaTypeChecker = ({ checkFAType, isDFA }) => {
  const result =
    isDFA === null ? (
      ""
    ) : isDFA ? (
      <div className="py-4 ">
        Your FA is a deterministic finite automata{" "}
        <span className="font-bold text-orange-400">(DFA)</span>
      </div>
    ) : (
      <div className="py-4">
        Your FA is a non-deternimistic finite automata{" "}
        <span className="font-bold text-orange-400">(NFA)</span>
      </div>
    );
  return (
    <div className="rounded shadow-lg p-5 border mb-5">
      <h1 className="text-md lg:text-xl py-5 pt-0 text-blue-900 font-semibold">
        Test wheater your FA is a deterministic or non-deternimistic finite
        automata
      </h1>
      <hr />

      {result}
      {result !== "" && <hr />}

      <Btn handleClick={checkFAType} />
    </div>
  );
};

export default FaTypeChecker;
