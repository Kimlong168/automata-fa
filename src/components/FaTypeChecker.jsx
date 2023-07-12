const FaTypeChecker = ({ checkFAType }) => {
  return (
    <div className="rounded shadow-lg p-5 border">
      <h1 className="text-md lg:text-xl py-5 pt-0 text-blue-900 font-semibold">
        Test wheater your FA is deterministic or non-deternimistic
      </h1>
      <hr />
      <button
        onClick={checkFAType}
        className="rounded px-3 py-2 text-white font-semibold mt-3 bg-orange-400 hover:bg-orange-500"
      >
        Check
      </button>
    </div>
  );
};

export default FaTypeChecker;
