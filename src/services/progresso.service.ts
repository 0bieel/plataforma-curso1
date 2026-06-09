import type { IProgresso } from "../models/progresso.model";
import { LocalStorageService } from "./local-storage.service";

export class ProgressosService extends LocalStorageService<IProgresso> {
  constructor() {
    super("progresso");
  }
}

export const progressosService = new ProgressosService();
