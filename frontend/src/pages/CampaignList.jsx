import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingId, setSendingId] = useState(null);

  const navigate = useNavigate();

  // Fetch all campaigns
  const fetchCampaigns = async () => {
    try {
      const res = await api.get("/campaigns");
      setCampaigns(res.data);
    } catch (error) {
      alert("Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  };

  // Send campaign
  const sendCampaign = async (campaignId) => {
    try {
      setSendingId(campaignId);

      await api.post(`/campaigns/${campaignId}/send`);

      alert("Campaign sent successfully");

      // refresh campaign list to update status
      fetchCampaigns();
    } catch (error) {
      alert(error.response?.data?.error || "Failed to send campaign");
    } finally {
      setSendingId(null);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  if (loading) {
    return <p className="p-6">Loading campaigns...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Campaigns</h1>

      {campaigns.length === 0 ? (
        <p>No campaigns created yet.</p>
      ) : (
        <table className="w-full border rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Title</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="border-t">
                <td className="p-2">{campaign.title}</td>
                <td className="p-2 text-center">
                  {campaign.status}
                </td>
                <td className="p-2 text-center">
                  {campaign.status === "draft" ? (
  <div className="flex gap-2 justify-center">
    <button
      onClick={() => navigate(`/campaigns/edit/${campaign.id}`)}
      className="px-3 py-1 bg-gray-600 text-white rounded"
    >
      Edit
    </button>

    <button
      onClick={() => sendCampaign(campaign.id)}
      disabled={sendingId === campaign.id}
      className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
    >
      {sendingId === campaign.id ? "Sending..." : "Send"}
    </button>
  </div>
) : (
  <span className="text-green-600">Sent</span>
)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CampaignList;
