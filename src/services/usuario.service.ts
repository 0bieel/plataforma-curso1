import type { IUsuario } from "../models/usuario.model";
import { LocalStorageService } from "./local-storage.service";

export class UsuariosService extends LocalStorageService<IUsuario> {
  constructor() {
    super("usuarios");
  }
}

export const usuariosService = new UsuariosService();
