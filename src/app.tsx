import { useState } from "preact/hooks";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
// const password = "69420";

export function App() {
  const [sequence, setSequence] = useState("");

  function handleClick(number: number) {
    setSequence((prevSequence) => prevSequence + number.toString());
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-stone-900 text-white select-none">
      <h1 className="pb-4 text-4xl">
        Sequence is : {sequence === "" ? "empty" : sequence}
      </h1>
      <div>
        <button
          className="px-4 py-2 text-2xl p-4 hover:text-gray-400"
          onClick={() => setSequence("")}
        >
          Clear
        </button>
        {numbers.map((n) => (
          <button
            onClick={() => handleClick(n)}
            className="p-4 text-3xl hover:text-cyan-400"
          >
            {n}
          </button>
        ))}
        <button
          onClick={() =>
            sequence.length > 0 &&
            setSequence(sequence.substring(0, sequence.length - 1))
          }
          className="p-4 text-3xl hover:text-red-500"
        >
          {"<"}
        </button>
      </div>
    </div>
  );
}
