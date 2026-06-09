import type { ZodType } from "zod";
import type { FieldConfig, IResource } from "../../models/resource.model";
import type { LocalStorageService } from "../../services/local-storage.service";

export interface ResourcePageConfig<T extends IResource> {
  title: string;
  initialItem: T;
  fields: FieldConfig<T>[];
  schema: ZodType<T>;
  service: LocalStorageService<T>;
  getVisibleItems?: (items: T[]) => T[];
  prepareItem?: (item: T, items: T[]) => T;
  validateItem?: (item: T, items: T[]) => Partial<Record<string, string>>;
  afterSave?: (item: T, items: T[]) => void;
}
