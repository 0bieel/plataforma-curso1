import type { ICategoria } from "../models/categoria.model";
import { ApiService } from "./api.service";

export class CategoriasService extends ApiService<ICategoria> {
  constructor() {
    super("categorias");
  }
}

export const categoriasService = new CategoriasService();
