import React, { useEffect, useState } from "react";
import { getAllEquipment } from "../../services/equipmentService";
import { useNavigate } from "react-router-dom";
import AddEquipment from "./AddEquipment";

const EquipmentList = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const equipments = await getAllEquipment();
        setEquipment(equipments);
      } catch (err) {
        setError("Failed to load equipment");
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Equipment List</h2>
      <button onClick={() => navigate("/equipment/add")}>
        Add Equipment
      </button>


      <table border="1" cellPadding="10" width="100%" style={{ marginTop: "15px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {equipment.length > 0 ? (
            equipment.map((eq) => (
              <tr key={eq._id}>
                <td>{eq.name}</td>
                <td>{eq.category}</td>
                <td>{eq.department}</td>
                <td>
                  <button onClick={() => navigate(`/equipment/${eq._id}`)}>
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" align="center">
                No equipment found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentList;
