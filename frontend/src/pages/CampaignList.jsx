import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CampaignList = () => {
  const navigate = useNavigate();

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingId, setSendingId] = useState(null);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");

  const limit = 10;

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const res = await api.get("/campaigns", {
        params: { page, limit, status: statusFilter },
      });

      setCampaigns(res.data.data);
      setTotal(res.data.total);
    } catch {
      alert("Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  };

  const sendCampaign = async (campaignId) => {
    try {
      setSendingId(campaignId);
      await api.post(`/campaigns/${campaignId}/send`);
      fetchCampaigns();
    } catch (error) {
      alert(error.response?.data?.error || "Failed to send campaign");
    } finally {
      setSendingId(null);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [page, statusFilter]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
        <p className="text-gray-500 mt-1">
          Manage, edit, and send your email campaigns
        </p>
      </div>

      {/* Filter */}
      <div className="flex justify-between items-center">
        <select
          value={statusFilter}
          onChange={(e) => {
            setPage(1);
            setStatusFilter(e.target.value);
          }}
          className="border border-gray-300 bg-white rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-black-500"
        >
          <option value="">All Campaigns</option>
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
        </select>

        <button
          onClick={() => navigate("/campaigns/new")}
          className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-600"
        >
          + New Campaign
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500">Loading campaigns...</p>
        ) : campaigns.length === 0 ? (
          <p className="p-6 text-gray-500">No campaigns found.</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-200 border-b">
              <tr>
                <th className="p-4 text-left text-sm font-medium text-gray-900">
                  Title
                </th>
                <th className="p-4 text-center text-sm font-medium text-gray-900">
                  Status
                </th>
                <th className="p-4 text-center text-sm font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {campaigns.map((campaign) => (
                <tr
                  key={campaign.id}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="p-4 font-medium text-gray-800">
                    {campaign.title}
                  </td>

                  <td className="p-4 text-center">
                    {campaign.status === "draft" ? (
                      <span className="inline-flex px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                        Draft
                      </span>
                    ) : (
                      <span className="inline-flex px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        Sent
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-center">
                    {campaign.status === "draft" ? (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            navigate(`/campaigns/edit/${campaign.id}`)
                          }
                          className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-900 hover:text-white"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => sendCampaign(campaign.id)}
                          disabled={sendingId === campaign.id}
                          className="px-4 py-1.5 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
                        >
                          {sendingId === campaign.id
                            ? "Sending..."
                            : "Send"}
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 text-sm border rounded-md disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-gray-500">
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 text-sm border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CampaignList;
