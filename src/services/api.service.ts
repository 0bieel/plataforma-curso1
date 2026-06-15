import type { IResource } from "../models/resource.model";
import { getStoredItems, setCachedItems } from "./options.service";

export class ApiService<T extends IResource> {
  private readonly apiUrl = "http://localhost:3000";
  private readonly resourceName: string;

  constructor(resourceName: string) {
    this.resourceName = resourceName;
  }

  async findAll(): Promise<T[]> {
    const response = await fetch(`${this.apiUrl}/${this.resourceName}`);
    return this.handleResponse<T[]>(response);
  }

  async findById(id: number | string): Promise<T> {
    this.validateId(id);
    const response = await fetch(`${this.apiUrl}/${this.resourceName}/${id}`);
    return this.handleResponse<T>(response);
  }

  async create(item: Omit<T, "id">): Promise<T> {
    const response = await fetch(`${this.apiUrl}/${this.resourceName}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    return this.handleResponse<T>(response);
  }

  async update(id: number | string, item: Partial<T>): Promise<T> {
    this.validateId(id);
    const response = await fetch(`${this.apiUrl}/${this.resourceName}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, id: String(id) }),
    });
    return this.handleResponse<T>(response);
  }

  async delete(id: number | string): Promise<void> {
    this.validateId(id);
    const response = await fetch(`${this.apiUrl}/${this.resourceName}/${id}`, {
      method: "DELETE",
    });
    await this.handleResponse<T>(response);
  }

  protected validateId(id: number | string): void {
    if (!id) {
      throw new Error("O ID e obrigatorio e invalido.");
    }
  }

  private async handleResponse<R>(response: Response): Promise<R> {
    if (!response.ok) {
      throw new Error(response.status === 404 ? "Registro nao encontrado." : "Erro ao consumir a API.");
    }

    const data = this.normalizeIds((await response.json()) as R);
    await this.refreshCache();
    return data;
  }

  private async refreshCache() {
    const response = await fetch(`${this.apiUrl}/${this.resourceName}`);

    if (response.ok) {
      setCachedItems(this.resourceName, this.normalizeIds((await response.json()) as T[]));
      return;
    }

    setCachedItems(this.resourceName, getStoredItems<T>(this.resourceName));
  }

  private normalizeIds<R>(data: R): R {
    if (Array.isArray(data)) {
      return data.map((item) => this.normalizeItemId(item)) as R;
    }

    return this.normalizeItemId(data) as R;
  }

  private normalizeItemId<R>(item: R): R {
    if (!item || typeof item !== "object" || !("id" in item)) {
      return item;
    }

    const resource = item as R & { id?: string | number };
    return {
      ...resource,
      id: resource.id === undefined || resource.id === null ? resource.id : String(resource.id),
    };
  }
}
