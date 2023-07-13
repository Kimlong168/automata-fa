const StringAceptedChecker = ({ checkString, string, setString, isDFA }) => {
  return (
    <div className="rounded shadow-lg p-5 border mb-5">
      <h1 className="text-md lg:text-xl py-5 pt-0 text-blue-900 font-semibold">
        Test if a string is accepted.
      </h1>
      <hr />
      <input
        type="text"
        onChange={(event) => {
          setString(event.target.value);
        }}
        value={string}
        name="string"
        placeholder="Please input the string"
        className="py-4 outline-none"
      />
      <hr />
      {isDFA && (
        <button
          onClick={checkString}
          className="rounded px-3 py-2 text-white font-semibold mt-3 bg-orange-400 hover:bg-orange-500"
        >
          Check
        </button>
      )}
    </div>
  );
};

export default StringAceptedChecker;
