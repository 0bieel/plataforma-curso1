import type { ITrilha } from "../models/trilha.model";
import { LocalStorageService } from "./local-storage.service";

export class TrilhasService extends LocalStorageService<ITrilha> {
  constructor() {
    super("trilhas");
  }
}

export const trilhasService = new TrilhasService();
