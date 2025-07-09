const Table = ({ data = [], objkey = [], renderRow }) => {
  return (
    <table>
      <thead>
        <tr>
          {objkey.map((key, index) => (
            <th key={index}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => renderRow(item, index))
        ) : (
          <tr>
            <td colSpan={objkey.length}>No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
