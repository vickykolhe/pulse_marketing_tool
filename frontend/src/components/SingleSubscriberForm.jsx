// import { useState } from "react";
// import api from "../api/axios";

// const SingleSubscriberForm = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (!name || !email) {
//       setMessage("Name and email are required");
//       return;
//     }

//     try {
//       setLoading(true);
//       await api.post("/subscribers", { name, email });
//       setMessage("Subscriber added successfully");
//       setName("");
//       setEmail("");
//     } catch {
//       setMessage("Failed to add subscriber");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-3">
//       <input
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="w-full border p-2 rounded"
//       />

//       <input
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="w-full border p-2 rounded"
//       />

//       <button
//         disabled={loading}
//         className="w-full bg-blue-600 text-white py-2 rounded"
//       >
//         {loading ? "Adding..." : "Add Subscriber"}
//       </button>

//       {message && <p className="text-sm mt-2">{message}</p>}
//     </form>
//   );
// };

// export default SingleSubscriberForm;


import { useState } from "react";
import api from "../api/axios";

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const SingleSubscriberForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!name || !email) {
      setError("Name and email are required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid email address");
      return;
    }

    try {
      setLoading(true);
      await api.post("/subscribers", { name, email });
      setMessage("Subscriber added successfully");
      setName("");
      setEmail("");
    } catch (err) {
      if (err.response?.status === 409) {
        setError("Subscriber already exists");
      } else {
        setError("Failed to add subscriber");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        disabled={loading}
        className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white
                   hover:bg-gray-600 transition disabled:opacity-60"
      >
        {loading ? "Adding…" : "Add Subscriber"}
      </button>

      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
      {message && <p className="text-sm text-green-600 text-center">{message}</p>}
    </form>
  );
};

const Input = (props) => (
  <input
    {...props}
    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
               focus:border-black-600 focus:ring-2 focus:ring-black-100 outline-none"
  />
);

export default SingleSubscriberForm;
