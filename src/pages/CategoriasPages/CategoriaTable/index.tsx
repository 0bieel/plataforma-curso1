export const CategoriaTable = () => {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={4} className="text-center text-muted">
              Nenhuma categoria cadastrada
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
