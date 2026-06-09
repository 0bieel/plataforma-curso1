import { Button } from "../../../components/Button";
import type { FieldConfig, IResource } from "../../../models/resource.model";

interface ResourceTableProps<T extends IResource> {
  items: T[];
  fields: FieldConfig<T>[];
  onEdit: (item: T) => void;
  onDelete: (itemId: string) => void;
  itemEmEdicao: T | null;
}

export const ResourceTable = <T extends IResource>({
  items,
  fields,
  onEdit,
  onDelete,
  itemEmEdicao,
}: ResourceTableProps<T>) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {fields.map((field) => (
            <th key={field.name}>{field.label.toUpperCase()}</th>
          ))}
          <th>ACOES</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          const desabilitado = !!itemEmEdicao;

          return (
            <tr key={item.id}>
              {fields.map((field) => (
                <td key={field.name}>
                  {field.renderValue ? field.renderValue(item) : String(item[field.name] ?? "")}
                </td>
              ))}
              <td className="d-flex gap-2">
                <Button
                  variant="warning"
                  value="Editar"
                  onClick={() => onEdit(item)}
                  disabled={desabilitado}
                />
                <Button
                  value="Excluir"
                  variant="danger"
                  onClick={() => onDelete(item.id || "")}
                  disabled={desabilitado}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
