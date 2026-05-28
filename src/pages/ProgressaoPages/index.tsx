import { ProgressaoForm } from "./ProgressaoForm";
import { ProgressaoTable } from "./ProgressaoTable";

export const ProgressaoPages = () => {
  return (
    <div className="container mt-4">
      <div className="row justify-content-start">
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-4">
              <h2 className="h5 mb-4">Registrar Progressão</h2>
              <ProgressaoForm />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="h5 mb-4">Progressões</h2>
              <ProgressaoTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
