import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    // Fetching admin details from local storage
    const storedInfo = localStorage.getItem("doctorInfo");
    if (storedInfo) {
      setAdminInfo(JSON.parse(storedInfo));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Admin Dashboard
        </h1>

        {adminInfo ? (
          <div className="space-y-4">
            <div>
              <h2 className="text-gray-600 font-semibold">Admin Details:</h2>
              <p>
                <strong>ID:</strong> {adminInfo.id}
              </p>
              <p>
                <strong>Name:</strong> {adminInfo.name}
              </p>
              <p>
                <strong>Email:</strong> {adminInfo.email}
              </p>
              <p>
                <strong>Specialty:</strong> {adminInfo.specialty}
              </p>
            </div>

            <button
              onClick={() => {
                localStorage.removeItem("doctorInfo");
                window.location.reload();
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-gray-600 text-center">No admin details found!</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
