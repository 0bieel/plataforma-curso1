import type { ITrilha } from "../models/trilha.model";
import { ApiService } from "./api.service";

export class TrilhasService extends ApiService<ITrilha> {
  constructor() {
    super("trilhas");
  }
}

export const trilhasService = new TrilhasService();
