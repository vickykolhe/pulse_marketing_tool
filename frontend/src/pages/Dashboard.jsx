import { BarChart2, Users, Mail } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded">
          <Users className="w-6 h-6 text-blue-500" />
          <p className="text-gray-500">Total Subscribers</p>
          <h2 className="text-2xl font-bold">—</h2>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <Mail className="w-6 h-6 text-green-500" />
          <p className="text-gray-500">Campaigns Sent</p>
          <h2 className="text-2xl font-bold">—</h2>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <BarChart2 className="w-6 h-6 text-purple-500" />
          <p className="text-gray-500">Open Rate</p>
          <h2 className="text-2xl font-bold">—</h2>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white p-4 shadow rounded h-64 flex items-center justify-center">
        Chart will go here
      </div>
    </div>
  );
};

export default Dashboard;
