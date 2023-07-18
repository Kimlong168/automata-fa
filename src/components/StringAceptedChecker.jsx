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
        Test if a string is accepted or not
      </h1>
      <hr />
      <input
        type="text"
        onChange={(event) => {
          setString(event.target.value);
        }}
        value={string}
        name="string"
        placeholder="Please input the string here"
        className="py-4 outline-none w-full"
      />
      <hr />

      <Btn handleClick={() => (isDFA ? checkStringDFA() : checkStringNFA())} />
    </div>
  );
};

export default StringAceptedChecker;
