function Winners() {
  return (
    <div className="page-container">
      <div className="winners-header">
        <h1 className="page-title winners-title">Winners</h1>
      </div>
      <div className="winners-content">
        <div className="winners-table">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Car</th>
                <th>Name</th>
                <th>Wins</th>
                <th>Best Time (Seconds)</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Winners;
