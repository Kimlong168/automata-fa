

const Btn = ({ handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="rounded px-3 py-2 text-white font-semibold mt-3 bg-orange-400 hover:bg-orange-500"
    >
      Check
    </button>
  );
};

export default Btn;
