import { useEffect, useState } from "react";
import api from "../api/axios";
import { Users, Mail, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [limit, setLimit] = useState(10);
  const [searchCampaign, setSearchCampaign] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/analytics/dashboard");
        setData(res.data);
      } catch {
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <p className="p-6 text-gray-500">Loading dashboard…</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  // SORT campaigns by opens DESC
  const sortedCampaigns = [...data.opensPerCampaign].sort(
    (a, b) => b.opens - a.opens
  );

  // FILTER by search
  const filteredCampaigns = sortedCampaigns.filter((campaign) =>
    campaign.campaignTitle.toLowerCase().includes(searchCampaign.toLowerCase())
  );

  // SLICE by limit
  const chartData =
    limit === "all" ? filteredCampaigns : filteredCampaigns.slice(0, limit);

  return (
    <div className="space-y-10">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your campaign performance
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <StatCard title="Total Subscribers" value={data.totalSubscribers} icon={Users} />
        <StatCard title="Campaigns Sent" value={data.totalCampaignsSent} icon={Mail} />
      </div>

      {/* CHART CARD */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 space-y-4">
        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Opens per Campaign
            </h2>
            <p className="text-sm text-gray-500">
              Engagement performance by campaign
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <TrendingUp size={18} className="text-gray-400" />
            <select
              value={limit}
              onChange={(e) =>
                setLimit(e.target.value === "all" ? "all" : Number(e.target.value))
              }
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm
                        outline-none"
            >
              <option value={5}>Top 5</option>
              <option value={10}>Top 10</option>
              <option value="all">All Campaigns</option>
            </select>
          </div>
        </div>

        {/* SEARCH */}
        <div>
          <input
            type="text"
            placeholder="Search campaign…"
            value={searchCampaign}
            onChange={(e) => setSearchCampaign(e.target.value)}
            className="w-64 rounded-lg border border-gray-300 px-3 py-1.5 text-sm
                       focus:border-black- focus:ring-2 focus:ring-black outline-none"
          />
          <p className="text-xs text-gray-600 mt-1">
            Filter campaigns by name
          </p>
        </div>

        {/* CHART */}
        {chartData.length === 0 ? (
          <p className="text-sm text-gray-500">No analytics available</p>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 10, bottom: 50 }}
              >
                <CartesianGrid stroke="#a2a5aa" strokeDasharray="3 3" />
                <XAxis
                  dataKey="campaignTitle"
                  tick={{ fontSize: 12 }}
                  angle={-30}
                  textAnchor="end"
                />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar
                  dataKey="opens"
                  fill="#191f6df8"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

/* KPI CARD COMPONENT */
const StatCard = ({ title, value, icon: Icon }) => (
  <div className="rounded-xl border border-gray-100 bg-gray-100 p-6 transition hover:shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-700">{title}</p>
        <h2 className="mt-1 text-3xl font-semibold text-gray-900">{value}</h2>
      </div>
      <div className="rounded-lg bg-gray-300 p-3 text-black">
        <Icon size={26} />
      </div>
    </div>
  </div>
);

export default Dashboard;

