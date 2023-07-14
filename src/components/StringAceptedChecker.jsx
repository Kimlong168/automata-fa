import Btn from "./Btn";
const StringAceptedChecker = ({
  checkStringDFA,
  checkStringNFA,
  string,
  setString,
  isDFA,
}) => {
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
        className="py-4 outline-none w-full"
      />
      <hr />
      {isDFA !== null ? (
        <Btn
          handleClick={() => (isDFA ? checkStringDFA() : checkStringNFA())}
        />
      ) : (
        <div className="text-xs text-gray-500 mt-4">
          <span className="text-red-600">*</span>Check to find FA's type first
          to enalbe this feature.
        </div>
      )}
    </div>
  );
};

export default StringAceptedChecker;
