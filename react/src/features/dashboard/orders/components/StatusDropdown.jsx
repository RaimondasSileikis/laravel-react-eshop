const StatusDropdown = ({ currentStatus, onChange, memoizedStatuses }) => {

  return (
    <select value={currentStatus} onChange={(e) => onChange(e.target.value)} >
      {memoizedStatuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );

};

export default StatusDropdown;
