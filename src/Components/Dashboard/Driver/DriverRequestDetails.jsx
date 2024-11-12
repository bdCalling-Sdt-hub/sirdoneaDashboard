
import { useParams, useLocation } from "react-router-dom";

const DriverDetails = () => {
  const { id } = useParams(); // Get `id` from the URL
  const location = useLocation();
  const request = location.state; // Access the request data from state

  if (!request) return <p>No driver data available for ID: {id}</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-[#013564] mb-4">
        {request.driverName} (ID: {id})
      </h1>
      <p>
        <strong>Role:</strong> {request.role}
      </p>
      <p>
        <strong>Gender:</strong> {request.gender}
      </p>
      <p>
        <strong>Email:</strong> {request.email}
      </p>
      <p>
        <strong>Phone:</strong> {request.phone}
      </p>
      <p>
        <strong>Truck Number:</strong> {request.truckNumber}
      </p>
      <p>
        <strong>Date of Birth:</strong> {request.dateOfBirth}
      </p>
      <p>
        <strong>NID Number:</strong> {request.nid}
      </p>
    </div>
  );
};

export default DriverDetails;
