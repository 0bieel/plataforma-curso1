import type { IAvaliacao } from "../models/avaliacao.model";
import { ApiService } from "./api.service";

export class AvaliacoesService extends ApiService<IAvaliacao> {
  constructor() {
    super("avaliacoes");
  }
}

export const avaliacoesService = new AvaliacoesService();
