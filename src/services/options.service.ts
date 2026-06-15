const API_URL = "http://localhost:3000";

const resourceCache = new Map<string, unknown[]>();

export const setCachedItems = <T>(resourceName: string, items: T[]) => {
  resourceCache.set(resourceName, items);
};

export const getStoredItems = <T>(resourceName: string): T[] => (resourceCache.get(resourceName) ?? []) as T[];

export const loadCachedItems = async <T>(resourceName: string): Promise<T[]> => {
  const response = await fetch(`${API_URL}/${resourceName}`);

  if (!response.ok) {
    throw new Error(`Erro ao carregar ${resourceName}.`);
  }

  const items = (await response.json()) as T[];
  setCachedItems(resourceName, items);
  return items;
};

export const hydrateOptionCache = async () => {
  await Promise.all(
    ["categorias", "cursos", "usuarios", "aulas-modulos", "matriculas", "progressos", "trilhas", "planos"].map(
      (resourceName) => loadCachedItems(resourceName),
    ),
  );
};

export const getOptions = (storageKey: string, labelFieldName: string, valueFieldName = "id") =>
  getStoredItems<Record<string, string>>(storageKey).map((item) => ({
    value: item[valueFieldName] ?? item[labelFieldName] ?? "",
    label: item[labelFieldName] ?? "",
  }));

export const getOptionLabel = (storageKey: string, id: string, labelFieldName: string) => {
  const item = getStoredItems<Record<string, string>>(storageKey).find((storedItem) => storedItem.id === id);
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  return item?.[labelFieldName] ?? (uuidPattern.test(id) ? "" : id);
};
