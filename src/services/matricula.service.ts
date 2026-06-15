import type { IMatricula } from "../models/matricula.model";
import { ApiService } from "./api.service";

export class MatriculasService extends ApiService<IMatricula> {
  constructor() {
    super("matriculas");
  }
}

export const matriculasService = new MatriculasService();
