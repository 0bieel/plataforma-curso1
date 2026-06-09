import { categoriaSchema, type ICategoria } from "../../models/categoria.model";
import { categoriasService } from "../../services/categoria.service";
import { ResourcePage } from "../shared/ResourcePage";
import type { ResourcePageConfig } from "../shared/resource-page.types";

const normalize = (value: string) => value.trim().replace(/\s+/g, " ").toLowerCase();

const categoriasConfig: ResourcePageConfig<ICategoria> = {
  title: "Categorias",
  initialItem: { id: "", nome: "", descricao: "" },
  schema: categoriaSchema,
  service: categoriasService,
  validateItem: (categoria, categorias) => {
    const categoriaDuplicada = categorias.some(
      (item) => item.id !== categoria.id && normalize(item.nome) === normalize(categoria.nome),
    );

    return categoriaDuplicada ? { nome: "Ja existe uma categoria com este nome" } : {};
  },
  fields: [
    { name: "nome", label: "Nome", type: "text", placeholder: "Digite o nome" },
    { name: "descricao", label: "Descricao", type: "textarea" },
  ],
};

export const CategoriasPages = () => <ResourcePage config={categoriasConfig} />;
