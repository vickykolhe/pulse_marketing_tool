import { useState } from "react";
import api from "../api/axios";

const BulkSubscriberForm = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleBulkAdd = async () => {
    const subscribers = text
      .split("\n")
      .map((line) => {
        const [name, email] = line.split(",");
        if (!name || !email) return null;
        return { name: name.trim(), email: email.trim() };
      })
      .filter(Boolean);

    if (subscribers.length === 0) {
      setMessage("No valid subscribers found");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/subscribers/bulk", subscribers);
      setMessage(`Inserted ${res.data.inserted} subscribers`);
      setText("");
    } catch {
      setMessage("Bulk insert failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <textarea
        rows="6"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Name,email"
      />

      <button
        onClick={handleBulkAdd}
        disabled={loading}
        className="w-full bg-green-600 text-black py-2 rounded"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </div>
  );
};

export default BulkSubscriberForm;
