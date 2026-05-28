import { PagamentoForm } from "./PagamentoForm";
import { PagamentoTable } from "./PagamentoTable";
import { PlanoForm } from "./PlanoForm";
import { PlanoTable } from "./PlanoTable";

export const FinanceiroPages = () => {
  return (
    <div className="container mt-4">
      <div className="row justify-content-start">
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-4">
              <h2 className="h5 mb-4">Novo Pagamento</h2>
              <PagamentoForm />
            </div>
          </div>
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-4">
              <h2 className="h5 mb-4">Pagamentos</h2>
              <PagamentoTable />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-4">
              <h2 className="h5 mb-4">Novo Plano</h2>
              <PlanoForm />
            </div>
          </div>
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="h5 mb-4">Planos</h2>
              <PlanoTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
