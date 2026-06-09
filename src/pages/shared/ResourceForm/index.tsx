import { useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import type { FieldConfig, IResource } from "../../../models/resource.model";

interface ResourceFormProps<T extends IResource> {
  item: T | null;
  initialItem: T;
  fields: FieldConfig<T>[];
  title: string;
  onSave: (item: T) => void;
  onCancel: () => void;
  errors?: Record<string, string>;
}

export const ResourceForm = <T extends IResource>({
  item,
  initialItem,
  fields,
  title,
  onSave,
  onCancel,
  errors = {},
}: ResourceFormProps<T>) => {
  const [itemState, setItemState] = useState<T>(item || initialItem);

  const updateField = (name: FieldConfig<T>["name"], value: string | boolean) => {
    setItemState({ ...itemState, [name]: value });
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="card shadow">
          <div className="card-body bg-light">
            <h5 className="card-title">Formulario de {title}</h5>
            <hr />
            <div className="container">
              <form>
                {fields
                  .filter((field) => !field.visibleWhen || field.visibleWhen(itemState))
                  .map((field) => {
                    const options =
                      typeof field.options === "function" ? field.options(itemState) : (field.options ?? []);
                    const fieldType = typeof field.type === "function" ? field.type(itemState) : field.type;

                    return (
                      <div className="mb-2" key={field.name}>
                        {fieldType === "textarea" ? (
                          <>
                            <label htmlFor={field.name} className="form-label">
                              {field.label}
                            </label>
                            <textarea
                              id={field.name}
                              className={`form-control ${errors[field.name] ? "is-invalid" : ""}`}
                              placeholder={field.placeholder}
                              rows={3}
                              value={String(itemState[field.name] ?? "")}
                              onChange={(event) => updateField(field.name, event.target.value)}
                            ></textarea>
                            {errors[field.name] && (
                              <div className="invalid-feedback d-block">{errors[field.name]}</div>
                            )}
                          </>
                        ) : fieldType === "select" ? (
                          <>
                            <label htmlFor={field.name} className="form-label">
                              {field.label}
                            </label>
                            <select
                              id={field.name}
                              className={`form-select ${errors[field.name] ? "is-invalid" : ""}`}
                              value={String(itemState[field.name] ?? "")}
                              onChange={(event) => updateField(field.name, event.target.value)}
                            >
                              <option value="">Selecione</option>
                              {options.map((option) => (
                                <option value={option.value} key={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            {errors[field.name] && (
                              <div className="invalid-feedback d-block">{errors[field.name]}</div>
                            )}
                          </>
                        ) : fieldType === "checkbox" ? (
                          <>
                            <div className="form-check text-start">
                              <input
                                id={field.name}
                                className={`form-check-input ${errors[field.name] ? "is-invalid" : ""}`}
                                type="checkbox"
                                checked={Boolean(itemState[field.name])}
                                onChange={(event) => updateField(field.name, event.target.checked)}
                              />
                              <label htmlFor={field.name} className="form-check-label">
                                {field.label}
                              </label>
                            </div>
                            {errors[field.name] && (
                              <div className="invalid-feedback d-block">{errors[field.name]}</div>
                            )}
                          </>
                        ) : (
                          <Input
                            label={field.label}
                            id={field.name}
                            visible="true"
                            type={fieldType ?? "text"}
                            placeholder={field.placeholder}
                            min={field.min}
                            max={field.max}
                            step={field.step}
                            value={String(itemState[field.name] ?? "")}
                            onChange={(value) => updateField(field.name, value)}
                            error={errors[field.name]}
                          />
                        )}
                      </div>
                    );
                  })}
              </form>
            </div>
          </div>
          <div className="card-footer">
            <div className="row m-2">
              <div className="col-6">
                <Button value="Cancelar" variant="secondary" type="button" onClick={onCancel} />
              </div>
              <div className="col-6">
                <Button
                  value={itemState.id ? "Atualizar" : "Salvar"}
                  variant={itemState.id ? "warning" : "primary"}
                  type="button"
                  onClick={() => onSave(itemState)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
