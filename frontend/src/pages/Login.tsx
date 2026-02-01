export default function Login() {
  return (
    <div className="max-w-sm mx-auto mt-20 bg-gray-800 p-6 rounded">
      <h2 className="text-2xl mb-4">Login</h2>
      <input className="w-full mb-3 p-2 rounded bg-gray-700" placeholder="Email" />
      <input
        type="password"
        className="w-full mb-4 p-2 rounded bg-gray-700"
        placeholder="Password"
      />
      <button className="w-full bg-blue-600 p-2 rounded">Login</button>
    </div>
  );
}
