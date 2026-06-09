import { matriculaSchema, type IMatricula } from "../../models/matricula.model";
import type { IAulaModulo } from "../../models/aula-modulo.model";
import type { IProgresso } from "../../models/progresso.model";
import { matriculasService } from "../../services/matricula.service";
import { getOptionLabel, getOptions, getStoredItems } from "../../services/options.service";
import { ResourcePage } from "../shared/ResourcePage";
import type { ResourcePageConfig } from "../shared/resource-page.types";

const getToday = () => new Date().toISOString().slice(0, 10);

const getStatusMatricula = (usuario: string, curso: string) => {
  const aulas = getStoredItems<IAulaModulo>("aulasModulos").filter(
    (item) => item.tipo === "aula" && item.curso === curso && item.id,
  );
  const progressos = getStoredItems<IProgresso>("progresso").filter(
    (item) => item.usuario === usuario && item.curso === curso && item.concluida,
  );

  if (aulas.length > 0 && aulas.every((aula) => progressos.some((progresso) => progresso.aula === aula.id))) {
    return "Concluido";
  }

  return "Em andamento";
};

const matriculasConfig = (): ResourcePageConfig<IMatricula> => ({
  title: "Matriculas",
  initialItem: { id: "", usuario: "", curso: "", data: "", status: "" },
  schema: matriculaSchema,
  service: matriculasService,
  prepareItem: (matricula) => ({
    ...matricula,
    data: matricula.data || getToday(),
    status: getStatusMatricula(matricula.usuario, matricula.curso),
  }),
  fields: [
    {
      name: "usuario",
      label: "Usuario",
      type: "select",
      options: getOptions("usuarios", "nome"),
      renderValue: (matricula) => getOptionLabel("usuarios", matricula.usuario, "nome"),
    },
    {
      name: "curso",
      label: "Curso",
      type: "select",
      options: getOptions("cursos", "titulo"),
      renderValue: (matricula) => getOptionLabel("cursos", matricula.curso, "titulo"),
    },
    {
      name: "data",
      label: "Data",
      type: "date",
      renderValue: (matricula) => matricula.data,
      visibleWhen: () => false,
    },
    {
      name: "status",
      label: "Status",
      type: "text",
      renderValue: (matricula) => getStatusMatricula(matricula.usuario, matricula.curso),
      visibleWhen: () => false,
    },
  ],
});

export const MatriculasPages = () => <ResourcePage config={matriculasConfig()} />;
