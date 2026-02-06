// components/admin/DataTable.tsx
import React from 'react';

interface BaseColumn<T> {
  key: keyof T;
  title: string;
  render?: (value: any, record: T) => React.ReactNode;
}

interface ActionColumn {
  key: string;
  title: string;
  render: (value: any, record: any) => React.ReactNode;
}

type Column<T> = BaseColumn<T> | ActionColumn;

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (record: T) => void;
}

export default function DataTable<T>({ columns, data, onRowClick }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((record, rowIndex) => (
            <tr 
              key={rowIndex} 
              className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${
                onRowClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700' : ''
              }`}
              onClick={() => onRowClick && onRowClick(record)}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  {'render' in column 
                    ? column.render && column.render((record as any)[(column as any).key], record) 
                    : (record as any)[(column as BaseColumn<T>).key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}