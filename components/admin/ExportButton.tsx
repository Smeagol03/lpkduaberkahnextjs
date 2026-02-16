'use client';

import { saveAs } from 'file-saver';

interface ExportButtonProps {
  data: any[];
  filename: string;
  columns: { key: string; label: string }[];
  label?: string;
  className?: string;
}

export default function ExportButton({
  data,
  filename,
  columns,
  label = 'Export Excel',
  className = ''
}: ExportButtonProps) {
  const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : '';
    }, obj);
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID');
    } catch {
      return dateString;
    }
  };

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}/)) {
      return formatDate(value);
    }
    return String(value);
  };

  const exportToCSV = () => {
    // Create CSV header
    const headers = columns.map(col => col.label);
    
    // Create CSV rows
    const rows = data.map(item => {
      return columns.map(col => {
        const value = getNestedValue(item, col.key);
        let formattedValue = formatValue(value);
        // Escape quotes and wrap in quotes if contains comma or newline
        if (formattedValue.includes(',') || formattedValue.includes('\n') || formattedValue.includes('"')) {
          formattedValue = '"' + formattedValue.replace(/"/g, '""') + '"';
        }
        return formattedValue;
      }).join(',');
    });

    // Combine header and rows
    const csv = [headers.join(','), ...rows].join('\n');
    
    // Add BOM for UTF-8 to ensure Excel displays Indonesian characters correctly
    const bom = '\uFEFF';
    const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8' });
    
    // Save file
    saveAs(blob, `${filename}.csv`);
  };

  return (
    <button
      onClick={exportToCSV}
      className={`flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors shadow-sm ${className}`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">Export</span>
    </button>
  );
}
