import { CustomTableProps, DataElement } from "@common/interfaces";
import useCustomTable from "./hooks/UseCustomTable";
import "./style.scss";

export default function CustomTable<TValue extends { id: number }>({
  data,
  schema,
  sortBy,
  sortDirection,
  onSort,
}: Readonly<CustomTableProps<TValue>>) {
  const { rows } = useCustomTable<TValue>({ data, schema });

  return (
    <div className="custom-table">
      <table className="custom-table__table">
        <thead>
          <tr>
            {schema.map((column) => {
              const sortKey = column.sortKey ?? column.attribute;
              const isSorted = sortBy === sortKey;
              const indicator = isSorted
                ? sortDirection === "asc"
                  ? " ↑"
                  : " ↓"
                : "";
              return (
                <th
                  key={column.attribute}
                  className="custom-table__header"
                  onClick={() => onSort?.(sortKey)}
                >
                  {column.name}
                  {indicator}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            return (
              <tr key={row.id} className="custom-table__row">
                {schema.map((column) => {
                  const element = row[column.attribute as keyof TValue] as
                    | DataElement
                    | undefined;
                  return (
                    <td
                      key={`${row.id}-${column.attribute}`}
                      className="custom-table__cell"
                    >
                      {element ? `${element.adornment}${element.value}` : null}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
