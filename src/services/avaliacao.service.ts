import type { IAvaliacao } from "../models/avaliacao.model";
import { LocalStorageService } from "./local-storage.service";

export class AvaliacoesService extends LocalStorageService<IAvaliacao> {
  constructor() {
    super("avaliacoes");
  }
}

export const avaliacoesService = new AvaliacoesService();
