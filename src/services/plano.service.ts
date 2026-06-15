import type { IPlano } from "../models/plano.model";
import { ApiService } from "./api.service";

export class PlanosService extends ApiService<IPlano> {
  constructor() {
    super("planos");
  }
}

export const planosService = new PlanosService();
