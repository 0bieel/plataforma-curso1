import type { IPlano } from "../models/plano.model";
import { LocalStorageService } from "./local-storage.service";

export class PlanosService extends LocalStorageService<IPlano> {
  constructor() {
    super("planos");
  }
}

export const planosService = new PlanosService();
