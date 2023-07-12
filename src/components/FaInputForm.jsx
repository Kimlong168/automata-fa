import { Multiselect } from "multiselect-react-dropdown";

const FaInputForm = ({ state, setState }) => {
  function handleChangeState(e) {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleOnSelect(e,type) {
    const selectedStates = e.map((state) => state.name).join(",");

    if(type === 'start'){
      setState((prevState) => ({
        ...prevState,
        startState: selectedStates,
      }));
      return;
    }

    setState((prevState) => ({
      ...prevState,
      endStates: selectedStates,
    }));

  }


  const selectData = state.states.split(",").map((state) => {
    return { name: state, id: state };
  });


  return (
    <div className="p-4">
      <div className="flex flex-col gap-2 mt-5">
        <label htmlFor="states" className="font-bold text-green-700">States</label>
        <input
          name="states"
          type="text"
          placeholder="States (eg: q0,q1,q2...)"
          className="px-2 py-2 rounded border border-black"
          value={state.states}
          onChange={handleChangeState}
        />
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <label htmlFor="startState" className="font-bold text-green-700">Start State</label>

        <Multiselect
          placeholder="Select Start State"
          className="rounded border border-black"
          options={selectData}
          name="endStates"
          displayValue="name"
          onSelect={(e) => handleOnSelect(e,'start')} // Function will trigger on select event
          onRemove={(e) => handleOnSelect(e,'start')} // Function will trigger on remove event
        />

      </div>
      <div className="flex flex-col gap-2 mt-5">
        <label htmlFor="endStates" className="font-bold text-green-700">End States</label>
        <Multiselect
          searchable={true}
          placeholder="Select End States"
          className="rounded border border-black"
          options={selectData}
          name="endStates"
          displayValue="name"
          onSelect={(e) => handleOnSelect(e,'end')} // Function will trigger on select event
          onRemove={(e) => handleOnSelect(e,'end')} // Function will trigger on remove event
        />
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <label htmlFor="alphabets" className="font-bold text-green-700">Alphabets</label>
        <input
          name="alphabets"
          type="text"
          placeholder="Alphabets (eg: a,b,c or 1,0)"
          className="px-2 py-2 rounded border border-black"
          value={state.alphabets}
          onChange={handleChangeState}
        />
      </div>
    </div>
  );
};

export default FaInputForm;
