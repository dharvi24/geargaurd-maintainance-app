import React, { useEffect, useState } from "react";
import { getAllMaintenances } from "../services/maintenanceService";

const MaintenancePage = () => {
  const [maintenances, setMaintenances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMaintenances = async () => {
      try {
        const data = await getAllMaintenances();
        setMaintenances(data);
      } catch (err) {
        setError("Failed to load maintenance records");
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenances();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Maintenance Records</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Subject</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Equipment ID</th>
            <th className="border p-2">Team ID</th>
            <th className="border p-2">Technician ID</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Scheduled Date</th>
            <th className="border p-2">Duration (Hours)</th>
            <th className="border p-2">Created By</th>
          </tr>
        </thead>
        <tbody>
          {maintenances.map((m) => (
            <tr key={m.id} className="hover:bg-gray-50">
              <td className="border p-2">{m.subject}</td>
              <td className="border p-2">{m.description}</td>
              <td className="border p-2">{m.type}</td>
              <td className="border p-2">{m.equipmentId}</td>
              <td className="border p-2">{m.maintenanceTeamId}</td>
              <td className="border p-2">{m.assignedTechnicianId}</td>
              <td className="border p-2">{m.status}</td>
              <td className="border p-2">
                {new Date(m.scheduledDate).toLocaleString()}
              </td>
              <td className="border p-2">{m.durationHours}</td>
              <td className="border p-2">{m.createdBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaintenancePage;
