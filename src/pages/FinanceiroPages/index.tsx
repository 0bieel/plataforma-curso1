import { planoSchema, type IPlano } from "../../models/plano.model";
import { planosService } from "../../services/plano.service";
import { ResourcePage } from "../shared/ResourcePage";
import type { ResourcePageConfig } from "../shared/resource-page.types";

const planosConfig: ResourcePageConfig<IPlano> = {
  title: "Financeiro",
  initialItem: { id: "", nome: "", valor: "", periodicidade: "", descricao: "" },
  schema: planoSchema,
  service: planosService,
  fields: [
    { name: "nome", label: "Plano", type: "text", placeholder: "Digite o plano" },
    { name: "valor", label: "Valor", type: "number", placeholder: "Ex.: 99" },
    { name: "periodicidade", label: "Periodicidade", type: "text", placeholder: "Mensal, anual..." },
    { name: "descricao", label: "Descricao", type: "textarea" },
  ],
};

export const FinanceiroPages = () => <ResourcePage config={planosConfig} />;
