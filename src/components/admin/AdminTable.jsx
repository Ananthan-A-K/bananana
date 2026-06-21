import React from 'react';

const AdminTable = ({ columns, data, isLoading, emptyMessage = 'No data found.' }) => {
  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-charcoal-900/60 rounded-[25px] border border-charcoal-900 relative overflow-hidden">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-acid-lime"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-charcoal-900/60 rounded-[25px] shadow-none border border-charcoal-900 relative overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-charcoal-900/40 border-b border-charcoal-900">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-4 text-[10px] font-bold tracking-[0.2em] text-warm-cream/60 uppercase"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-charcoal-900">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-charcoal-900/30 transition-colors">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 text-xs text-warm-cream whitespace-nowrap">
                    {column.cell ? column.cell(row) : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-12 text-center text-warm-cream/40 italic text-xs uppercase tracking-wider"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
