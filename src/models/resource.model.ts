export interface IResource {
  id?: string;
}

type FieldType = "text" | "number" | "email" | "date" | "textarea" | "select" | "checkbox";

export interface FieldConfig<T extends IResource> {
  name: Extract<keyof T, string>;
  label: string;
  type?: FieldType | ((item: T) => FieldType);
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: Array<{ value: string; label: string }> | ((item: T) => Array<{ value: string; label: string }>);
  visibleWhen?: (item: T) => boolean;
  renderValue?: (item: T) => string;
}
