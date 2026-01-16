import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const CampaignCreate = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    emailSubject: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!isEditMode) return;

    const fetchCampaign = async () => {
      try {
        setPageLoading(true);
        const res = await api.get(`/campaigns/${id}`);
        setForm(res.data);
      } catch {
        setError("Failed to load campaign");
      } finally {
        setPageLoading(false);
      }
    };

    fetchCampaign();
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isEditMode) {
        await api.put(`/campaigns/${id}`, form);
        setSuccess("Campaign updated successfully");
      } else {
        await api.post("/campaigns", form);
        setSuccess("Campaign created successfully");
        setForm({ title: "", emailSubject: "", content: "" });
      }
    } catch {
      setError("Failed to save campaign");
    } finally {
      setLoading(false);
    }
  };

  
  if (pageLoading) {
    return <div className="p-6 text-gray-500">Loading campaign...</div>;
  }

  const formatPreviewContent = (content) => {
  const hasHTML = /<\/?[a-z][\s\S]*>/i.test(content);
  return hasHTML
    ? content
    : content.replace(/\n/g, "<br />");
};
  return (
    <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-lg p-6 space-y-5"
      >
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            {isEditMode ? "Edit Campaign" : "Create Campaign"}
          </h1>
          <p className="text-sm text-gray-500">
            Compose your email campaign and preview it live.
          </p>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Campaign Title
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black-500"
            placeholder="campaign title here"
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Subject
          </label>
          <input
            name="emailSubject"
            value={form.emailSubject}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black-500"
            placeholder="email subject here"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Content
          </label>
          <textarea
            name="content"
            rows={7}
            value={form.content}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black-500"
            placeholder="Write your email content here (HTML supported)"
          />
        </div>

        {/* Messages */}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        {/* Button */}
        <button
          disabled={loading}
          className="inline-flex items-center justify-center rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-600 disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : isEditMode
            ? "Update Campaign"
            : "Create Campaign"}
        </button>
      </form>

      {/* PREVIEW */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Live Preview
        </h2>

        <div className="mb-3">
          <p className="text-xs uppercase text-gray-500">Subject</p>
          <p className="font-medium text-gray-800">
            {form.emailSubject || "Your subject will appear here"}
          </p>
        </div>

        <div className="border rounded-md p-4 bg-gray-50 text-sm text-gray-700">
          {form.content ? (
            <div
  dangerouslySetInnerHTML={{
    __html: formatPreviewContent(form.content),
  }}
/>
          ) : (
            <p className="text-gray-400">
              Email content preview will appear here
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignCreate;
