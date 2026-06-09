import type { IAulaModulo } from "../models/aula-modulo.model";
import { LocalStorageService } from "./local-storage.service";

export class AulasModulosService extends LocalStorageService<IAulaModulo> {
  constructor() {
    super("aulasModulos");
  }
}

export const aulasModulosService = new AulasModulosService();
