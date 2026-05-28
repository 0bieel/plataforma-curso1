export const PlanoTable = () => {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Valor (R$)</th>
            <th>Duração (meses)</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={5} className="text-center text-muted">
              Nenhum plano cadastrado
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
