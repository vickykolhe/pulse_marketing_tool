import { useState } from "react";
import api from "../api/axios";

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const BulkSubscriberForm = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleBulkAdd = async () => {
    setMessage("");
    setError("");

    let invalidCount = 0;

    const subscribers = text
      .split("\n")
      .map((line) => {
        const [name, email] = line.split(",");
        if (!name || !email || !isValidEmail(email.trim())) {
          invalidCount++;
          return null;
        }
        return { name: name.trim(), email: email.trim() };
      })
      .filter(Boolean);

    if (subscribers.length === 0) {
      setError("No valid subscribers found");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/subscribers/bulk", subscribers);

      let msg = `Inserted ${res.data.inserted} subscribers`;
      if (invalidCount > 0) {
        msg += ` • Skipped ${invalidCount} invalid email(s)`;
      }

      setMessage(msg);
      setText("");
    } catch {
      setError("Bulk insert failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        rows="6"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Name,email"
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                   focus:border-black-600 focus:ring-2 focus:ring-black-100 outline-none"
      />

      <button
        onClick={handleBulkAdd}
        disabled={loading}
        className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white
                   hover:bg-gray-600 transition disabled:opacity-60"
      >
        {loading ? "Uploading…" : "Upload Subscribers"}
      </button>

      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
      {message && <p className="text-sm text-green-600 text-center">{message}</p>}
    </div>
  );
};

export default BulkSubscriberForm;

