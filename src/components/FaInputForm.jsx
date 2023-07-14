import { Multiselect } from "multiselect-react-dropdown";

const FaInputForm = ({ state, setState, setTransitions }) => {
  function handleChangeState(e) {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    //set transitions to empty
    setTransitions([]);
  }

  function handleOnSelect(e, type) {
    if (type === "start") {
      setState((prevState) => ({
        ...prevState,
        startState: e[0].name,
      }));
      return;
    }

    const selectedStates = e.map((state) => state.name).join(",");

    setState((prevState) => ({
      ...prevState,
      endStates: selectedStates,
    }));
  }

  const selectData = state.states.split(",").map((state) => {
    return { name: state, id: state };
  });

  return (
    <div className="shadow-xl p-5 rounded border mt-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="states" className="font-bold text-orange-400">
          States
        </label>
        <input
          name="states"
          type="text"
          placeholder="States (eg: q0,q1,q2...)"
          className="px-2 py-2 rounded border-2 outline-none border-gray-300"
          value={state.states}
          onChange={handleChangeState}
        />
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <label htmlFor="startState" className="font-bold text-orange-400">
          Start State
        </label>

        <Multiselect
          singleSelect={true}
          placeholder="Select Start State"
          className="rounded border border-gray-300"
          options={selectData}
          name="endStates"
          displayValue="name"
          onSelect={(e) => handleOnSelect(e, "start")} // Function will trigger on select event
          onRemove={(e) => handleOnSelect(e, "start")} // Function will trigger on remove event
        />
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <label htmlFor="endStates" className="font-bold text-orange-400">
          End States
        </label>
        <Multiselect
          searchable={true}
          placeholder="Select Final States"
          className="rounded border border-gray-300"
          options={selectData}
          name="endStates"
          displayValue="name"
          onSelect={(e) => handleOnSelect(e, "end")} // Function will trigger on select event
          onRemove={(e) => handleOnSelect(e, "end")} // Function will trigger on remove event
        />
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <label htmlFor="alphabets" className="font-bold text-orange-400">
          Alphabets
        </label>
        <input
          name="alphabets"
          type="text"
          placeholder="Alphabets (eg: a,b,c or 1,0)"
          className="px-2 py-2 rounded border-2 outline-none border-gray-300"
          value={state.alphabets}
          onChange={handleChangeState}
        />
      </div>
    </div>
  );
};

export default FaInputForm;
