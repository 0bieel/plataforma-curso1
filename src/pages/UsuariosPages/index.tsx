import { usuarioSchema, type IUsuario } from "../../models/usuario.model";
import { usuariosService } from "../../services/usuario.service";
import { ResourcePage } from "../shared/ResourcePage";
import type { ResourcePageConfig } from "../shared/resource-page.types";

const normalize = (value: string) => value.trim().toLowerCase();

const usuariosConfig: ResourcePageConfig<IUsuario> = {
  title: "Usuarios",
  initialItem: { id: "", nome: "", email: "", perfil: "" },
  schema: usuarioSchema,
  service: usuariosService,
  validateItem: (usuario, usuarios) => {
    const emailDuplicado = usuarios.some(
      (item) => item.id !== usuario.id && normalize(item.email) === normalize(usuario.email),
    );

    return emailDuplicado ? { email: "Ja existe um usuario com este email" } : {};
  },
  fields: [
    { name: "nome", label: "Nome", type: "text", placeholder: "Digite o nome" },
    { name: "email", label: "E-mail", type: "email", placeholder: "Digite o email" },
    { name: "perfil", label: "Perfil", type: "text", placeholder: "Aluno, professor..." },
  ],
};

export const UsuariosPages = () => <ResourcePage config={usuariosConfig} />;
