import type { IMatricula } from "../models/matricula.model";
import { LocalStorageService } from "./local-storage.service";

export class MatriculasService extends LocalStorageService<IMatricula> {
  constructor() {
    super("matriculas");
  }
}

export const matriculasService = new MatriculasService();
