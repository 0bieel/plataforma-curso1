export const AulasTable = () => {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Módulo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={4} className="text-center text-muted">
              Nenhuma aula cadastrada
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
