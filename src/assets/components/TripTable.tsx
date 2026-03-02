export default function TripTable() {
  return (
    <div className="bg-gray-800 rounded-2xl p-4">
      <h2 className="mb-4 font-semibold">Trip Summary</h2>

      <table className="w-full text-sm text-left">
        <thead className="text-gray-400 border-b border-gray-700">
          <tr>
            <th className="py-2">Driver</th>
            <th>Status</th>
            <th>Distance</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b border-gray-700">
            <td className="py-2">Lucas Dias</td>
            <td>Active</td>
            <td>12 KM</td>
            <td>08:00</td>
            <td>09:15</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}