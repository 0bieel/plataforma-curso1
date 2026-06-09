import { useEffect, useState } from "react";
import type { IResource } from "../../../models/resource.model";
import { ResourceForm } from "../ResourceForm";
import { ResourceTable } from "../ResourceTable";
import type { ResourcePageConfig } from "../resource-page.types";

interface ResourcePageProps<T extends IResource> {
  config: ResourcePageConfig<T>;
}

export const ResourcePage = <T extends IResource>({ config }: ResourcePageProps<T>) => {
  const [item, setItem] = useState<T | null>(null);
  const [listaItems, setListaItems] = useState<T[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [keyReiniciar, setKeyReiniciar] = useState(0);

  const carregarItems = async () => {
    try {
      const items = await config.service.findAll();
      setListaItems(items);
    } catch (error) {
      console.error(`Erro ao carregar ${config.title}:`, error);
    }
  };

  useEffect(() => {
    carregarItems();
  }, []);

  const validarItem = (itemParaValidar: T): T | null => {
    setErrors({});

    const result = config.schema.safeParse(itemParaValidar);
    const errosFormatados: Record<string, string> = {};

    if (!result.success) {
      result.error.issues.forEach((error) => {
        if (error.path[0]) {
          errosFormatados[error.path[0] as string] = error.message;
        }
      });
    }

    const customErrors = config.validateItem?.(itemParaValidar, listaItems) ?? {};
    const allErrors = Object.fromEntries(
      Object.entries({ ...errosFormatados, ...customErrors }).filter(([, message]) => Boolean(message)),
    ) as Record<string, string>;

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      return null;
    }

    return result.success ? result.data : null;
  };

  const isEdicao = (itemParaVerificar: T): boolean => {
    return Boolean(itemParaVerificar.id && itemParaVerificar.id.trim() !== "");
  };

  const limparFormulario = () => {
    setItem(null);
    setErrors({});
    setKeyReiniciar((prev) => prev + 1);
  };

  const handleCreate = async (novoItem: T) => {
    try {
      const { id, ...dadosNovoItem } = novoItem;
      void id;
      const itemCriado = await config.service.create(dadosNovoItem as Omit<T, "id">);
      const itemsAtualizados = [...listaItems, itemCriado];
      setListaItems(itemsAtualizados);
      config.afterSave?.(itemCriado, itemsAtualizados);
      limparFormulario();
    } catch (error) {
      console.error(`Erro ao criar ${config.title}:`, error);
    }
  };

  const handleUpdate = async (itemAtualizado: T) => {
    try {
      await config.service.update(itemAtualizado.id!, itemAtualizado);
      const itemsAtualizados = listaItems.map((itemLista) =>
        itemLista.id === itemAtualizado.id ? itemAtualizado : itemLista,
      );
      setListaItems(itemsAtualizados);
      config.afterSave?.(itemAtualizado, itemsAtualizados);
      limparFormulario();
    } catch (error) {
      console.error(`Erro ao atualizar ${config.title}:`, error);
    }
  };

  const handleSave = (itemParaSalvar: T) => {
    const itemPreparado = config.prepareItem?.(itemParaSalvar, listaItems) ?? itemParaSalvar;
    const itemValidado = validarItem(itemPreparado);

    if (!itemValidado) {
      return;
    }

    if (isEdicao(itemValidado)) {
      handleUpdate(itemValidado);
    } else {
      handleCreate(itemValidado);
    }
  };

  const handleEdit = (itemParaEditar: T) => {
    setItem(itemParaEditar);
    setErrors({});
  };

  const handleDelete = async (itemId: string) => {
    try {
      await config.service.delete(itemId);
      setListaItems((listaAtual) => listaAtual.filter((itemLista) => itemLista.id !== itemId));
    } catch (error) {
      console.error(`Erro ao excluir ${config.title}:`, error);
    }
  };

  return (
    <>
      <div className="row m-4 border-bottom">
        <h4>{config.title}</h4>
      </div>

      <div className="container row m-4">
        <div className="col-12 col-md-6 col-lg-6">
          <ResourceForm
            key={item ? item.id : `new-${keyReiniciar}`}
            item={item}
            initialItem={config.initialItem}
            fields={config.fields}
            title={config.title}
            onSave={handleSave}
            onCancel={limparFormulario}
            errors={errors}
          />
        </div>

        <div className="col-12 col-md-6 col-lg-6">
          <hr />
          <ResourceTable
            items={config.getVisibleItems ? config.getVisibleItems(listaItems) : listaItems}
            fields={config.fields}
            onEdit={handleEdit}
            onDelete={handleDelete}
            itemEmEdicao={item}
          />
        </div>
      </div>
    </>
  );
};
