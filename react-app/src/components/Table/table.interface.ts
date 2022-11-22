import { Column, SortingRule, TableOptions } from "react-table";

export interface TableComponentProps<T extends object>
  extends Partial<TableOptions<T>> {
  data: Array<T>;
  columns: ReadonlyArray<Column<T>>;
  // initialSortBy?: Array<SortingRule<T>>;
}
