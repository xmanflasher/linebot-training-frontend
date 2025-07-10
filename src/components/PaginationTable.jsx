// src/components/PaginationTable.jsx
import React, { useState } from 'react';

export default function PaginationTable({ data, columns, pageSize = 5 }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / pageSize);
  const currentData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="overflow-x-auto border border-green-200 bg-green-50 rounded-xl shadow p-4">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-4 py-2 text-left font-semibold text-green-800">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, i) => (
            <tr key={i} className="border-t border-green-200">
              {columns.map((col, idx) => (
                <td key={idx} className="px-4 py-2 text-green-900">
                  {typeof col.accessor === 'function' ? col.accessor(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-md border ${currentPage === i + 1
                ? 'bg-green-600 text-white'
                : 'bg-white text-green-700 border-green-300'
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}