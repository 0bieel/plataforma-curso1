import type { ICategoria } from "../models/categoria.model";
import { LocalStorageService } from "./local-storage.service";

export class CategoriasService extends LocalStorageService<ICategoria> {
  constructor() {
    super("categorias");
  }
}

export const categoriasService = new CategoriasService();
