import { useEffect, useState } from "preact/hooks";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const password = "69420";

enum State {
  Typing,
  Correct,
  Error,
}

export function App() {
  const [sequence, setSequence] = useState("");
  const [state, setState] = useState(State.Typing);

  function updateSequence(number: number) {
    // had to use `prevSequence` variable inside `setSequence()` because
    // `updateSequence()` is called both from onClick events and `handleKeyDown()`
    setSequence((prevSequence) => {
      let newSequence = prevSequence + number.toString();
      let newState = setNewState(newSequence);
      if (newState !== State.Typing) {
        newSequence = "";
      }
      return newSequence;
    });
  }

  function setNewState(newSequence: string) {
    let newState = State.Typing;
    if (newSequence.length === password.length) {
      if (newSequence === password) {
        newState = State.Correct;
      } else {
        newState = State.Error;
      }
    }
    setState(newState);
    return newState;
  }

  function removeLastSequenceCharacter() {
    setSequence((prevSequence) =>
      prevSequence.substring(0, prevSequence.length - 1)
    );
  }

  function clearSequence() {
    setSequence("");
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (parseInt(e.key) > -1) {
      updateSequence(parseInt(e.key));
    }
    if (e.key === "Backspace") {
      removeLastSequenceCharacter();
    }
    if (e.key === "c") {
      clearSequence();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen select-none flex-col items-center justify-center bg-stone-900 text-white">
      <h1 className="pb-4 text-4xl">
        {(() => {
          if (state === State.Correct) {
            return "Access Granted";
          } else if (state === State.Error) {
            return "Incorrect Password";
          } else if (state === State.Typing) {
            return `Sequence is: ${sequence === "" ? "empty" : sequence}`;
          }
        })()}
      </h1>
      <div>
        <button
          className="p-4 px-4 py-2 text-2xl hover:text-gray-400"
          onClick={() => clearSequence()}
        >
          Clear
        </button>
        {numbers.map((n) => (
          <button
            onClick={() => updateSequence(n)}
            className="p-4 text-3xl hover:text-cyan-400"
          >
            {n}
          </button>
        ))}
        <button
          onClick={() => removeLastSequenceCharacter()}
          className="p-4 text-3xl hover:text-red-500"
        >
          {"<"}
        </button>
      </div>
    </div>
  );
}
