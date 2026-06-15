import type { IProgresso } from "../models/progresso.model";
import { ApiService } from "./api.service";

export class ProgressosService extends ApiService<IProgresso> {
  constructor() {
    super("progressos");
  }
}

export const progressosService = new ProgressosService();
