// import { useState } from "react";
// import SingleSubscriberForm from "../components/SingleSubscriberForm";
// import BulkSubscriberForm from "../components/BulkSubscriberForm";

// const AddSubscriber = () => {
//   const [mode, setMode] = useState("single");

//   return (
//     <div className="bg-white p-6 rounded shadow max-w-lg">
//       <h1 className="text-xl font-semibold mb-4">Add Subscribers</h1>

//       {/* Toggle Buttons */}
//       <div className="flex gap-2 mb-4">
//         <button
//           onClick={() => setMode("single")}
//           className={`px-4 py-2 rounded ${
//             mode === "single"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-200"
//           }`}
//         >
//           Single
//         </button>

//         <button
//           onClick={() => setMode("bulk")}
//           className={`px-4 py-2 rounded ${
//             mode === "bulk"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-200"
//           }`}
//         >
//           Bulk
//         </button>
//       </div>

//       {/* Forms */}
//       {mode === "single" ? (
//         <SingleSubscriberForm />
//       ) : (
//         <BulkSubscriberForm />
//       )}
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
    <div className="max-w-xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Add Subscribers
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Add subscribers individually or upload in bulk
        </p>
      </div>

      {/* Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        {/* Toggle */}
        <div className="mb-6 inline-flex rounded-lg border border-gray-300 bg-white p-1">
          <ToggleButton
            active={mode === "single"}
            onClick={() => setMode("single")}
          >
            Single
          </ToggleButton>
          <ToggleButton
            active={mode === "bulk"}
            onClick={() => setMode("bulk")}
          >
            Bulk
          </ToggleButton>
        </div>

        {/* Forms */}
        {mode === "single" ? (
          <SingleSubscriberForm />
        ) : (
          <BulkSubscriberForm />
        )}
      </div>
    </div>
  );
};

const ToggleButton = ({ active, children, ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 text-sm font-medium rounded-md transition
      ${
        active
          ? "bg-gray-200 text-gray-800 shadow-sm"
          : "text-gray-600 hover:text-gray-900"
      }`}
  >
    {children}
  </button>
);

export default AddSubscriber;
