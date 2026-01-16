// import { useEffect, useState } from "react";
// import api from "../api/axios";

// const PAGE_LIMIT = 10;

// const SubscriberList = () => {
//   const [subscribers, setSubscribers] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   const fetchSubscribers = async () => {
//     setLoading(true);
//     try {
//       const response = await api.get("/subscribers", {
//         params: {
//           page,
//           limit: PAGE_LIMIT,
//           search
//         }
//       });

//       setSubscribers(response.data.data);
//       setTotal(response.data.total);
//     } catch (error) {
//       console.error("Error fetching subscribers", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSubscribers();
//   }, [page, search]);

//   const totalPages = Math.ceil(total / PAGE_LIMIT);

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold">Subscribers</h1>

//       {/* Search */}
//       <input
//         type="text"
//         placeholder="Search by email..."
//         value={search}
//         onChange={(e) => {
//           setPage(1);
//           setSearch(e.target.value);
//         }}
//         className="border p-2 rounded w-64"
//       />

//       {/* Table */}
//       {loading ? (
//         <p>Loading subscribers...</p>
//       ) : (
//         <div className="bg-white shadow rounded">
//           <table className="w-full border-collapse">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-3 text-left">Name</th>
//                 <th className="p-3 text-left">Email</th>
//               </tr>
//             </thead>

//             <tbody>
//               {subscribers.length === 0 ? (
//                 <tr>
//                   <td colSpan="2" className="p-4 text-center text-gray-500">
//                     No subscribers found
//                   </td>
//                 </tr>
//               ) : (
//                 subscribers.map((subscriber) => (
//                   <tr key={subscriber.id} className="border-t">
//                     <td className="p-3">{subscriber.name}</td>
//                     <td className="p-3">{subscriber.email}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Pagination */}
//       <div className="flex items-center gap-4">
//         <button
//           disabled={page === 1}
//           onClick={() => setPage(page - 1)}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Previous
//         </button>

//         <span>
//           Page {page} of {totalPages}
//         </span>

//         <button
//           disabled={page === totalPages || totalPages === 0}
//           onClick={() => setPage(page + 1)}
//           className="px-3 py-1 border rounded disabled:opacity-50"
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
          search,
        },
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
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Subscribers
          </h1>
          <p className="text-sm text-gray-500">
            Manage and search your subscribers
          </p>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search by email"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="w-full sm:w-64 rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-black-600 focus:ring-2 focus:ring-black-100 outline-none"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {loading ? (
          <p className="p-6 text-sm text-gray-500">
            Loading subscribers…
          </p>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-900">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-900">
                  Email
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {subscribers.length === 0 ? (
                <tr>
                  <td
                    colSpan="2"
                    className="px-6 py-8 text-center text-sm text-gray-500"
                  >
                    No subscribers found
                  </td>
                </tr>
              ) : (
                subscribers.map((subscriber) => (
                  <tr
                    key={subscriber.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {subscriber.name || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {subscriber.email}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Page {page} of {totalPages || 1}
        </p>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm
                       hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>

          <button
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage(page + 1)}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm
                       hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriberList;
