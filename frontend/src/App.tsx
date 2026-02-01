import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white gap-6">
      <h1 className="text-4xl font-bold">Vite + React + Tailwind</h1>

      <button
        onClick={() => setCount(count + 1)}
        className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
      >
        Count is {count}
      </button>

      <p className="text-gray-400">
        Edit <code className="text-blue-400">src/App.tsx</code> and save
      </p>
    </div>
  );
}

export default App;
