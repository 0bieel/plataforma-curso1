import { cursoSchema, type ICurso } from "../../models/curso.model";
import { cursosService } from "../../services/curso.service";
import { getOptionLabel, getOptions } from "../../services/options.service";
import { ResourcePage } from "../shared/ResourcePage";
import type { ResourcePageConfig } from "../shared/resource-page.types";

const normalize = (value: string) => value.trim().replace(/\s+/g, " ").toLowerCase();

const cursosConfig = (): ResourcePageConfig<ICurso> => ({
  title: "Cursos",
  initialItem: { id: "", titulo: "", categoria: "", descricao: "", cargaHoraria: "" },
  schema: cursoSchema,
  service: cursosService,
  validateItem: (curso, cursos) => {
    const cursoDuplicado = cursos.some(
      (item) =>
        item.id !== curso.id &&
        normalize(item.titulo) === normalize(curso.titulo) &&
        normalize(item.categoria) === normalize(curso.categoria) &&
        normalize(item.descricao) === normalize(curso.descricao),
    );

    return cursoDuplicado
      ? { titulo: "Ja existe um curso com o mesmo titulo, categoria e descricao" }
      : {};
  },
  fields: [
    { name: "titulo", label: "Titulo", type: "text", placeholder: "Digite o titulo" },
    {
      name: "categoria",
      label: "Categoria",
      type: "select",
      options: () => getOptions("categorias", "nome"),
      renderValue: (curso) => getOptionLabel("categorias", curso.categoria, "nome"),
    },
    { name: "descricao", label: "Descricao", type: "textarea" },
    { name: "cargaHoraria", label: "Carga horaria", type: "text", placeholder: "Ex.: 10h" },
  ],
});

export const CursosPages = () => <ResourcePage config={cursosConfig()} />;
