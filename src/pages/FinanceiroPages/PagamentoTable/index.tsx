export const PagamentoTable = () => {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Referência</th>
            <th>Valor</th>
            <th>Vencimento</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={6} className="text-center text-muted">
              Nenhum pagamento cadastrado
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
