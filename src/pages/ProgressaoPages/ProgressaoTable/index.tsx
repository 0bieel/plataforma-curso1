export const ProgressaoTable = () => {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Aluno</th>
            <th>Curso</th>
            <th>Percentual (%)</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={6} className="text-center text-muted">
              Nenhuma progressão registrada
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
