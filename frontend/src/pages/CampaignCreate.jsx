import { useState } from "react";
import api from "../api/axios";

const CampaignCreate = () => {
  const [form, setForm] = useState({
    title: "",
    emailSubject: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* Controlled Input Handler */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* Submit Campaign */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.post("/campaigns", form);
      setSuccess("Campaign created successfully");
      setForm({ title: "", emailSubject: "", content: "" });
    } catch (err) {
      setError("Failed to create campaign");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left: Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 shadow rounded space-y-4"
      >
        <h2 className="text-xl font-semibold">Create Campaign</h2>

        <input
          name="title"
          placeholder="Campaign Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="emailSubject"
          placeholder="Email Subject"
          value={form.emailSubject}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <textarea
          name="content"
          placeholder="Email Content (HTML or Text)"
          rows={6}
          value={form.content}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Creating..." : "Create Campaign"}
        </button>
      </form>

      {/* Right: Live Preview */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-semibold mb-2">Live Preview</h2>

        <p className="font-semibold">
          Subject: {form.emailSubject || "Your subject here"}
        </p>

        <div className="mt-4 border p-3 rounded bg-gray-50">
          {form.content ? (
            <div dangerouslySetInnerHTML={{ __html: form.content }} />
          ) : (
            <p className="text-gray-400">Email content preview</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignCreate;
