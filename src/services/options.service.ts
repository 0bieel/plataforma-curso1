export const getStoredItems = <T>(storageKey: string): T[] => {
  const storedItems = localStorage.getItem(storageKey);

  if (!storedItems) {
    return [];
  }

  try {
    return JSON.parse(storedItems) as T[];
  } catch {
    return [];
  }
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
