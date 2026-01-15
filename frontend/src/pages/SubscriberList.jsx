// import { useEffect, useState } from "react";
// import api from "../api/axios";

// const PAGE_LIMIT = 10;

// const SubscriberList = () => {
//   const [subscribers, setSubscribers] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchSubscribers = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const offset = (page - 1) * PAGE_LIMIT;

//       const res = await api.get("/subscribers", {
//         params: { page,
//         limit: PAGE_LIMIT,
//         search }
//       });

//       // SAFETY CHECK
//       setSubscribers(res?.data?.rows || []);
//       setTotalCount(res?.data?.count || 0);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load subscribers");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSubscribers();
//   }, [page, search]);

//   const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_LIMIT));

//   return (
//     <div className="min-h-screen bg-gray-50 p-6 space-y-6">

//       <h1 className="text-3xl font-bold text-gray-800">
//         Subscribers
//       </h1>

//       {/* SEARCH */}
//       <input
//         type="text"
//         placeholder="Search by email..."
//         value={search}
//         onChange={(e) => {
//           setPage(1);
//           setSearch(e.target.value);
//         }}
//         className="border px-3 py-2 rounded-md w-72 focus:ring-2 focus:ring-blue-500"
//       />

//       {/* CONTENT */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         {loading ? (
//           <p className="p-6 text-gray-500">Loading subscribers...</p>
//         ) : error ? (
//           <p className="p-6 text-red-500">{error}</p>
//         ) : (
//           <table className="w-full">
//             <thead className="bg-gray-100 text-gray-700">
//               <tr>
//                 <th className="p-3 text-left">Name</th>
//                 <th className="p-3 text-left">Email</th>
//               </tr>
//             </thead>

//             <tbody>
//               {subscribers.length === 0 ? (
//                 <tr>
//                   <td colSpan="2" className="p-6 text-center text-gray-500">
//                     No subscribers found
//                   </td>
//                 </tr>
//               ) : (
//                 subscribers.map((s) => (
//                   <tr key={s.id} className="border-t hover:bg-gray-50">
//                     <td className="p-3">{s.name}</td>
//                     <td className="p-3">{s.email}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* PAGINATION */}
//       <div className="flex items-center gap-4">
//         <button
//           disabled={page === 1}
//           onClick={() => setPage((p) => p - 1)}
//           className="px-4 py-2 border rounded disabled:opacity-50"
//         >
//           Previous
//         </button>

//         <span className="text-gray-600">
//           Page {page} of {totalPages}
//         </span>

//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage((p) => p + 1)}
//           className="px-4 py-2 border rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SubscriberList;

import { useEffect, useState } from "react";
import api from "../api/axios";

const PAGE_LIMIT = 10;

const SubscriberList = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/subscribers", {
        params: {
          page,
          limit: PAGE_LIMIT,
          search
        }
      });

      setSubscribers(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Error fetching subscribers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, [page, search]);

  const totalPages = Math.ceil(total / PAGE_LIMIT);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Subscribers</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by email..."
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
        className="border p-2 rounded w-64"
      />

      {/* Table */}
      {loading ? (
        <p>Loading subscribers...</p>
      ) : (
        <div className="bg-white shadow rounded">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
              </tr>
            </thead>

            <tbody>
              {subscribers.length === 0 ? (
                <tr>
                  <td colSpan="2" className="p-4 text-center text-gray-500">
                    No subscribers found
                  </td>
                </tr>
              ) : (
                subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="border-t">
                    <td className="p-3">{subscriber.name}</td>
                    <td className="p-3">{subscriber.email}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SubscriberList;


