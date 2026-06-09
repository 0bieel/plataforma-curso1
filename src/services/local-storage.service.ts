import type { IResource } from "../models/resource.model";

export class LocalStorageService<T extends IResource> {
  private readonly storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  async findAll(): Promise<T[]> {
    const storedItems = localStorage.getItem(this.storageKey);

    if (!storedItems) {
      return [];
    }

    try {
      return JSON.parse(storedItems) as T[];
    } catch {
      localStorage.removeItem(this.storageKey);
      return [];
    }
  }

  async findById(id: number | string): Promise<T> {
    this.validateId(id);
    const items = await this.findAll();
    const item = items.find((currentItem) => currentItem.id === String(id));

    if (!item) {
      throw new Error("Registro nao encontrado.");
    }

    return item;
  }

  async create(item: Omit<T, "id">): Promise<T> {
    const items = await this.findAll();
    const newItem = { ...item, id: crypto.randomUUID() } as T;

    this.save([...items, newItem]);
    return newItem;
  }

  async update(id: number | string, item: Partial<T>): Promise<T> {
    this.validateId(id);
    const items = await this.findAll();
    const currentItem = items.find((savedItem) => savedItem.id === String(id));

    if (!currentItem) {
      throw new Error("Registro nao encontrado.");
    }

    const updatedItem = { ...currentItem, ...item, id: String(id) };
    this.save(items.map((savedItem) => (savedItem.id === String(id) ? updatedItem : savedItem)));
    return updatedItem;
  }

  async delete(id: number | string): Promise<void> {
    this.validateId(id);
    const items = await this.findAll();
    this.save(items.filter((item) => item.id !== String(id)));
  }

  protected validateId(id: number | string): void {
    if (!id) {
      throw new Error("O ID e obrigatorio e invalido.");
    }
  }

  private save(items: T[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
}
