import type { IUsuario } from "../models/usuario.model";
import { ApiService } from "./api.service";

export class UsuariosService extends ApiService<IUsuario> {
  constructor() {
    super("usuarios");
  }
}

export const usuariosService = new UsuariosService();
