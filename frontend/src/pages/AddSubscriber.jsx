// import { useState } from "react";
// import api from "../api/axios";

// const AddSubscriber = () => {
//   // 1️⃣ Form state
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");

//   // 2️⃣ UI states
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // 3️⃣ Validation function
//   const validate = () => {
//     if (!name.trim()) {
//       setError("Name is required");
//       return false;
//     }

//     if (!email.trim()) {
//       setError("Email is required");
//       return false;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setError("Invalid email format");
//       return false;
//     }

//     return true;
//   };

//   // 4️⃣ Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!validate()) return;

//     try {
//       setLoading(true);

//       await api.post("/subscribers", {
//         name,
//         email,
//       });

//       setSuccess("Subscriber added successfully");
//       setName("");
//       setEmail("");
//     } catch (err) {
//       setError(err.response?.data?.error || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md bg-white p-6 rounded shadow">
//       <h1 className="text-xl font-semibold mb-4">Add Subscriber</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Name */}
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full border p-2 rounded"
//         />

//         {/* Email */}
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border p-2 rounded"
//         />

//         <button
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
//         >
//           {loading ? "Adding..." : "Add Subscriber"}
//         </button>
//       </form>

//       {error && <p className="text-red-500 mt-3">{error}</p>}
//       {success && <p className="text-green-600 mt-3">{success}</p>}
//     </div>
//   );
// };

// export default AddSubscriber;


import { useState } from "react";
import SingleSubscriberForm from "../components/SingleSubscriberForm";
import BulkSubscriberForm from "../components/BulkSubscriberForm";

const AddSubscriber = () => {
  const [mode, setMode] = useState("single");

  return (
    <div className="bg-white p-6 rounded shadow max-w-lg">
      <h1 className="text-xl font-semibold mb-4">Add Subscribers</h1>

      {/* Toggle Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode("single")}
          className={`px-4 py-2 rounded ${
            mode === "single"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Single
        </button>

        <button
          onClick={() => setMode("bulk")}
          className={`px-4 py-2 rounded ${
            mode === "bulk"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Bulk
        </button>
      </div>

      {/* Forms */}
      {mode === "single" ? (
        <SingleSubscriberForm />
      ) : (
        <BulkSubscriberForm />
      )}
    </div>
  );
};

export default AddSubscriber;
