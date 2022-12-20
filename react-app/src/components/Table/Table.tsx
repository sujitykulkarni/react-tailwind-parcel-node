import React, { useMemo } from "react";
import { useBlockLayout, useFilters, useSortBy, useTable } from "react-table";
import { TableComponentProps } from "./table.interface";
import { FixedSizeList } from "react-window";
import Select from "../Select/Select";

export const filterGreaterThan = (
  rows: any[],
  id: any,
  filterValue: number
) => {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
};

filterGreaterThan.autoRemove = (val: any) => typeof val !== "number";

export const SliderColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}: any) => {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 align-middle">
        <span className="align-middle">{filterValue || min}</span>
        <input
          type="range"
          min={min}
          max={max}
          value={filterValue || min}
          onChange={(e) => {
            setFilter(parseInt(e.target.value, 10));
          }}
          onClick={(e) => e.stopPropagation()}
          className="w-full h-7 text-sm align-middle appearance-none rounded-full bg-slate-100 border-gray-50 border-4 rounded-full-thumb rounded-full-track text-blue-700"
        />
      </div>
      <button onClick={() => setFilter(undefined)}>↩</button>
    </div>
  );
};

export const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}: any) => {
  const options = useMemo(() => {
    const list: string[] = [];
    preFilteredRows.forEach((row: { values: { [x: string]: any } }) => {
      if (!list.includes(row.values[id])) list.push(row.values[id]);
    });
    return list;
  }, [id, preFilteredRows]);
  return (
    <Select
      options={options.map((option, index) => ({
        key: index,
        value: option,
        text: option,
      }))}
      onSelect={setFilter}
    />
  );
};

const DefaultColumnFilter = ({
  column: { filterValue, setFilter },
}: any): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setFilter(event.target.value || undefined);
  };
  return (
    <input
      value={filterValue || ""}
      onChange={handleChange}
      className="w-full inline hover:border"
      placeholder="search"
    />
  );
};
const Table = <T extends object>({
  columns,
  data,
  ...rest
}: TableComponentProps<T>) => {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );
  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetSortBy: false,
      autoResetFilters: false,
      ...rest,
    },
    useFilters,
    useSortBy,
    useBlockLayout
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    totalColumnsWidth,
  } = tableInstance;

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div {...row.getRowProps({ style })} className="tr hover:bg-stone-100">
          {
            // Loop over the rows cells
            row.cells.map((cell) => {
              // Apply the cell props
              return (
                <div
                  {...cell.getCellProps()}
                  className="td p-2 m-0 text-slate-700 border-slate-100 border-l border-t-0 border-b border-r text-left last:border-b whitespace-normal break-words antialiased"
                >
                  {
                    // Render the cell contents
                    cell.render("Cell")
                  }
                </div>
              );
            })
          }
        </div>
      );
    },
    [prepareRow, rows]
  );

  return (
    // apply the table props

    <div {...getTableProps()} className="">
      <div>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <div
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="th p-2 m-0 border-slate-100 border-l border-t border-b border-r text-center last:border-b"
                  >
                    <span className="whitespace-normal antialiased text-stone-700 font-bold">
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </span>
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                    <div onClick={(e) => e.stopPropagation()}>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
      {/* Apply the table body props */}
      <div {...getTableBodyProps()}>
        <FixedSizeList
          height={375}
          itemCount={rows.length}
          itemSize={40}
          width={totalColumnsWidth + 17}
        >
          {RenderRow}
        </FixedSizeList>
      </div>
    </div>
  );
};

export default Table;
