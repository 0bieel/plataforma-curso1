import { progressoSchema, type IProgresso } from "../../models/progresso.model";
import type { IAulaModulo } from "../../models/aula-modulo.model";
import type { IMatricula } from "../../models/matricula.model";
import { getOptionLabel, getOptions, getStoredItems } from "../../services/options.service";
import { matriculasService } from "../../services/matricula.service";
import { progressosService } from "../../services/progresso.service";
import { ResourcePage } from "../shared/ResourcePage";
import type { ResourcePageConfig } from "../shared/resource-page.types";

const getAulaOptions = (curso: string) =>
  getStoredItems<IAulaModulo>("aulas-modulos")
    .filter((item) => item.tipo === "aula" && item.curso === curso && item.id)
    .map((item) => ({ value: item.id ?? "", label: item.aula }));

const getAulaLabel = (aulaId: string) =>
  getStoredItems<IAulaModulo>("aulas-modulos").find((item) => item.id === aulaId)?.aula ?? "";

const getStatusMatricula = (usuario: string, curso: string, progressos: IProgresso[]) => {
  const aulas = getStoredItems<IAulaModulo>("aulas-modulos").filter(
    (item) => item.tipo === "aula" && item.curso === curso && item.id,
  );

  if (
    aulas.length > 0 &&
    aulas.every((aula) =>
      progressos.some(
        (progresso) =>
          progresso.usuario === usuario &&
          progresso.curso === curso &&
          progresso.aula === aula.id &&
          progresso.concluida,
      ),
    )
  ) {
    return "Concluido";
  }

  return "Em andamento";
};

const atualizarStatusMatriculas = async (progressos: IProgresso[]) => {
  const matriculas = getStoredItems<IMatricula>("matriculas");
  const matriculasAtualizadas = matriculas.map((matricula) => ({
    ...matricula,
    status: getStatusMatricula(matricula.usuario, matricula.curso, progressos),
  }));

  await Promise.all(
    matriculasAtualizadas
      .filter((matricula) => matricula.id && matricula.status !== matriculas.find((item) => item.id === matricula.id)?.status)
      .map((matricula) => matriculasService.update(matricula.id!, matricula)),
  );
};

const progressosConfig = (): ResourcePageConfig<IProgresso> => ({
  title: "Progresso",
  initialItem: { id: "", usuario: "", curso: "", aula: "", concluida: false, observacao: "" },
  schema: progressoSchema,
  service: progressosService,
  prepareItem: (progresso) => ({ ...progresso, observacao: "" }),
  validateItem: (progresso, progressos) => {
    const aulaJaConcluida = progressos.some(
      (item) =>
        item.id !== progresso.id &&
        item.usuario === progresso.usuario &&
        item.curso === progresso.curso &&
        item.aula === progresso.aula &&
        item.concluida &&
        progresso.concluida,
    );

    return aulaJaConcluida ? { aula: "Esta aula ja foi marcada como concluida para este usuario" } : {};
  },
  afterSave: (_progresso, progressos) => atualizarStatusMatriculas(progressos),
  fields: [
    {
      name: "usuario",
      label: "Usuario",
      type: "select",
      options: () => getOptions("usuarios", "nome"),
      renderValue: (progresso) => getOptionLabel("usuarios", progresso.usuario, "nome"),
    },
    {
      name: "curso",
      label: "Curso",
      type: "select",
      options: () => getOptions("cursos", "titulo"),
      renderValue: (progresso) => getOptionLabel("cursos", progresso.curso, "titulo"),
    },
    {
      name: "aula",
      label: "Aula",
      type: "select",
      options: (progresso) => getAulaOptions(progresso.curso),
      renderValue: (progresso) => getAulaLabel(progresso.aula),
    },
    {
      name: "concluida",
      label: "Concluida",
      type: "checkbox",
      renderValue: (progresso) => (progresso.concluida ? "Sim" : "Nao"),
    },
  ],
});

export const ProgressoPages = () => <ResourcePage config={progressosConfig()} />;
