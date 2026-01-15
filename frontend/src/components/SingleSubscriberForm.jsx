import { useState } from "react";
import api from "../api/axios";

const SingleSubscriberForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!name || !email) {
      setMessage("Name and email are required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/subscribers", { name, email });
      setMessage("Subscriber added successfully");
      setName("");
      setEmail("");
    } catch {
      setMessage("Failed to add subscriber");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <button
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        {loading ? "Adding..." : "Add Subscriber"}
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
};

export default SingleSubscriberForm;
