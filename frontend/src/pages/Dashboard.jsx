// import { useEffect, useState, useMemo } from "react";
// import api from "../api/axios.js";
// import { Users, Mail } from "lucide-react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// const Dashboard = () => {
//   const [data, setData] = useState(null);
//   const [limit, setLimit] = useState(10); // Top N
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const res = await api.get("/analytics/dashboard");
//         setData(res.data);
//       } catch (err) {
//         setError("Failed to load dashboard");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, []);

//   /* 🔹 Sort & limit campaigns */
//   const chartData = useMemo(() => {
//     if (!data) return [];
//     const sorted = [...data.opensPerCampaign].sort(
//       (a, b) => Number(b.opens) - Number(a.opens)
//     );
//     return limit === "all" ? sorted : sorted.slice(0, limit);
//   }, [data, limit]);

//   if (loading) return <p className="p-6">Loading...</p>;
//   if (error) return <p className="p-6 text-red-500">{error}</p>;

//   return (
//     <div className="p-6 space-y-8">
//       <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <KpiCard
//           icon={<Users className="text-blue-600" />}
//           label="Total Subscribers"
//           value={data.totalSubscribers}
//         />
//         <KpiCard
//           icon={<Mail className="text-green-600" />}
//           label="Campaigns Sent"
//           value={data.totalCampaignsSent}
//         />
//       </div>

//       {/* Chart Section */}
//       <div className="bg-white p-6 rounded-lg shadow border">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="font-semibold text-lg">Opens per Campaign</h2>

//           {/* LIMIT DROPDOWN */}
//           <select
//   value={limit}
//   onChange={(e) =>
//     setLimit(e.target.value === "all" ? "all" : Number(e.target.value))
//   }
//   className="border rounded px-3 py-1 text-sm"
// >
//   <option value={5}>Top 5</option>
//   <option value={10}>Top 10</option>
//   <option value="all">All</option>
// </select>
//         </div>

//         {chartData.length === 0 ? (
//           <p className="text-gray-500">No data available</p>
//         ) : (
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart
//                 data={chartData}
//                 margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis
//                   dataKey="campaignTitle"
//                   angle={-35}
//                   textAnchor="end"
//                   interval={0}
//                   height={80}
//                 />
//                 <YAxis allowDecimals={false} />
//                 <Tooltip />
//                 <Bar dataKey="opens" fill="#3b82f6" radius={[6, 6, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// /* 🔹 KPI Card Component */
// const KpiCard = ({ icon, label, value }) => (
//   <div className="bg-white p-6 rounded-lg shadow border hover:shadow-md transition">
//     <div className="flex items-center gap-3">
//       {icon}
//       <p className="text-gray-500">{label}</p>
//     </div>
//     <h2 className="text-3xl font-bold mt-2">{value}</h2>
//   </div>
// );

// export default Dashboard;


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

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  const chartData =
    limit === "all"
      ? data.opensPerCampaign
      : data.opensPerCampaign.slice(0, limit);

  return (
    <div className="space-y-10">

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Overview of your campaign performance
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <StatCard
          title="Total Subscribers"
          value={data.totalSubscribers}
          icon={Users}
          gradient="from-blue-500 to-blue-600"
        />

        <StatCard
          title="Campaigns Sent"
          value={data.totalCampaignsSent}
          icon={Mail}
          gradient="from-green-500 to-green-600"
        />
      </div>

      {/* CHART CARD */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">

        {/* CHART HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Opens per Campaign
            </h2>
            <p className="text-sm text-gray-500">
              Engagement performance by campaign
            </p>
          </div>

          <div className="flex items-center gap-2">
            <TrendingUp className="text-gray-400" size={18} />
            <select
              value={limit}
              onChange={(e) =>
                setLimit(e.target.value === "all" ? "all" : Number(e.target.value))
              }
              className="
                bg-gray-50 border border-gray-300
                rounded-md px-3 py-1.5 text-sm
                focus:ring-2 focus:ring-blue-500
              "
            >
              <option value={5}>Top 5</option>
              <option value={10}>Top 10</option>
              <option value="all">All Campaigns</option>
            </select>
          </div>
        </div>

        {/* CHART */}
        {chartData.length === 0 ? (
          <p className="text-gray-500">No analytics available</p>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 10, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
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
                  fill="#3b82f6"
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
const StatCard = ({ title, value, icon: Icon, gradient }) => (
  <div
    className={`rounded-xl p-6 text-white shadow-lg bg-gradient-to-br ${gradient}
      hover:scale-[1.02] transition-transform`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-90">{title}</p>
        <h2 className="text-4xl font-bold mt-1">{value}</h2>
      </div>
      <div className="bg-white/20 p-3 rounded-lg">
        <Icon size={28} />
      </div>
    </div>
  </div>
);

export default Dashboard;



