import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEquipmentById } from "../../services/equipmentService";

const EquipmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const equipmentData = await getEquipmentById(id);
        setEquipment(equipmentData);
      } catch (err) {
        setError("Failed to load equipment details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEquipment();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!equipment) return null;

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h2>Equipment Details</h2>

      <table border="1" cellPadding="10" width="100%">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{equipment.name}</td>
          </tr>

          <tr>
            <th>Serial Number</th>
            <td>{equipment.serialNumber}</td>
          </tr>

          <tr>
            <th>Category</th>
            <td>{equipment.category}</td>
          </tr>

          <tr>
            <th>Department</th>
            <td>{equipment.department}</td>
          </tr>

          <tr>
            <th>Location</th>
            <td>{equipment.location}</td>
          </tr>

          <tr>
            <th>Maintenance Team</th>
            <td>
              {equipment.maintenanceTeamId?.name || "Not Assigned"}
            </td>
          </tr>

          <tr>
            <th>Default Technician</th>
            <td>
              {equipment.defaultTechnicianId?.name || "Not Assigned"}
            </td>
          </tr>

          <tr>
            <th>Scrapped</th>
            <td>{equipment.isScrapped ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </table>

      <button style={{ marginTop: "20px" }} onClick={() => navigate("/equipment")}>
        Back
      </button>
    </div>
  );
};

export default EquipmentDetails;
