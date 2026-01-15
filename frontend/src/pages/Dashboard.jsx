// import { BarChart2, Users, Mail } from "lucide-react";

// const Dashboard = () => {
//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Dashboard</h1>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="p-4 bg-white shadow rounded">
//           <Users className="w-6 h-6 text-blue-500" />
//           <p className="text-gray-500">Total Subscribers</p>
//           <h2 className="text-2xl font-bold">—</h2>
//         </div>

//         <div className="p-4 bg-white shadow rounded">
//           <Mail className="w-6 h-6 text-green-500" />
//           <p className="text-gray-500">Campaigns Sent</p>
//           <h2 className="text-2xl font-bold">—</h2>
//         </div>

//         <div className="p-4 bg-white shadow rounded">
//           <BarChart2 className="w-6 h-6 text-purple-500" />
//           <p className="text-gray-500">Open Rate</p>
//           <h2 className="text-2xl font-bold">—</h2>
//         </div>
//       </div>

//       {/* Chart Placeholder */}
//       <div className="bg-white p-4 shadow rounded h-64 flex items-center justify-center">
//         Chart will go here
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { Users, Mail } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/analytics/dashboard");
        setData(res.data);
      } catch (err) {
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <div className="flex items-center gap-3">
            <Users className="text-blue-500" />
            <p className="text-gray-500">Total Subscribers</p>
          </div>
          <h2 className="text-3xl font-bold mt-2">
            {data.totalSubscribers}
          </h2>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <div className="flex items-center gap-3">
            <Mail className="text-green-500" />
            <p className="text-gray-500">Campaigns Sent</p>
          </div>
          <h2 className="text-3xl font-bold mt-2">
            {data.totalCampaignsSent}
          </h2>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="font-semibold mb-4">Opens per Campaign</h2>

        {data.opensPerCampaign.length === 0 ? (
          <p className="text-gray-500">No data available</p>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.opensPerCampaign}>
                <XAxis dataKey="campaignTitle" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="opens" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
