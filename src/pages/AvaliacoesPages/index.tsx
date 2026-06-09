import { avaliacaoSchema, type IAvaliacao } from "../../models/avaliacao.model";
import { avaliacoesService } from "../../services/avaliacao.service";
import { getOptionLabel, getOptions } from "../../services/options.service";
import { ResourcePage } from "../shared/ResourcePage";
import type { ResourcePageConfig } from "../shared/resource-page.types";

const avaliacoesConfig = (): ResourcePageConfig<IAvaliacao> => ({
  title: "Avaliacoes",
  initialItem: { id: "", curso: "", usuario: "", nota: "", comentario: "" },
  schema: avaliacaoSchema,
  service: avaliacoesService,
  fields: [
    {
      name: "curso",
      label: "Curso",
      type: "select",
      options: getOptions("cursos", "titulo"),
      renderValue: (avaliacao) => getOptionLabel("cursos", avaliacao.curso, "titulo"),
    },
    {
      name: "usuario",
      label: "Usuario",
      type: "select",
      options: getOptions("usuarios", "nome"),
      renderValue: (avaliacao) => getOptionLabel("usuarios", avaliacao.usuario, "nome"),
    },
    { name: "nota", label: "Nota", type: "number", placeholder: "Maximo 5", min: 0, max: 5, step: 0.1 },
    { name: "comentario", label: "Comentario", type: "textarea" },
  ],
});

export const AvaliacoesPages = () => <ResourcePage config={avaliacoesConfig()} />;
