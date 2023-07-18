import Btn from "./Btn";

const Converter = ({convertNFAtoDFA}) => {
  return (
    <div className="rounded shadow-lg p-5 border mb-5">
      <h1 className="text-md lg:text-xl py-5 pt-0 text-blue-900 font-semibold">
        Convert NFA to DFA
      </h1>
      <hr />
      <Btn handleClick={convertNFAtoDFA} />
    </div>
  );
};

export default Converter;
