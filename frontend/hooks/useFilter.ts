import { useState, useMemo } from "react";

interface UseFilterOptions<T> {
  items: T[];
  filterFn: (items: T[], filter: string) => T[];
  initialFilter?: string;
}

interface UseFilterReturn<T> {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  filteredItems: T[];
  clearFilter: () => void;
}
export const useFilter = <T>({
  items,
  filterFn,
  initialFilter = ""
}: UseFilterOptions<T>): UseFilterReturn<T> => {
  const [filter, setFilter] = useState<string>(initialFilter);

  // Memoizar el resultado del filtrado para evitar recálculos innecesarios
  const filteredItems = useMemo(() => {
    return filterFn(items, filter);
  }, [items, filter, filterFn]);

  const clearFilter = () => {
    setFilter("");
  };

  return {
    filter,
    setFilter,
    filteredItems,
    clearFilter,
  };
};
