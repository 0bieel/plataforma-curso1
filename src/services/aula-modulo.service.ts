import type { IAulaModulo } from "../models/aula-modulo.model";
import { ApiService } from "./api.service";

export class AulasModulosService extends ApiService<IAulaModulo> {
  constructor() {
    super("aulas-modulos");
  }
}

export const aulasModulosService = new AulasModulosService();
