export const MatriculasTable = () => {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Aluno</th>
            <th>Curso</th>
            <th>Data</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={6} className="text-center text-muted">
              Nenhuma matrícula cadastrada
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
