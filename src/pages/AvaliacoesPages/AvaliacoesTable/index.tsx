export const AvaliacoesTable = () => {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Peso (%)</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={5} className="text-center text-muted">
              Nenhuma avaliação cadastrada
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
