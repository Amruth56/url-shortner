'use client';

import { useState } from 'react';

export default function LinkTable({ initialLinks }) {
  const [links, setLinks] = useState(initialLinks);
  const [filter, setFilter] = useState('');
  const [deleting, setDeleting] = useState('');

  function filteredLinks() {
    if (!filter) return links;
    const q = filter.toLowerCase();
    return links.filter(
      (l) =>
        l.code.toLowerCase().includes(q) ||
        l.targetUrl.toLowerCase().includes(q)
    );
  }

  async function handleDelete(code) {
    if (!confirm('Are you sure you want to delete this link?')) return;

    setDeleting(code);

    try {
      const res = await fetch(`/api/links/${code}`, { method: 'DELETE' });

      if (res.status === 204) {
        setLinks((prev) => prev.filter((l) => l.code !== code));
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to delete.');
      }
    } catch (e) {
      alert(e.message);
    }

    setDeleting('');
  }

  const data = filteredLinks();

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <input
          placeholder="Search by code or URL..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-1/2 border px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-gray-700 border-b">
            <tr>
              <th className="py-2">Code</th>
              <th className="py-2">Target URL</th>
              <th className="py-2">Clicks</th>
              <th className="py-2">Last Clicked</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <tr key={row.code} className="border-b">
                <td className="py-2 font-mono">{row.code}</td>

                <td className="py-2 max-w-xs truncate">
                  <a
                    href={row.targetUrl}
                    className="text-indigo-600 hover:underline"
                    title={row.targetUrl}
                  >
                    {row.targetUrl}
                  </a>
                </td>

                <td className="py-2">{row.clicks}</td>

                <td className="py-2">
                  {row.lastClicked
                    ? new Date(row.lastClicked).toLocaleString()
                    : 'Never'}
                </td>

                <td className="py-2">
                  <a
                    href={`/code/${row.code}`}
                    className="text-blue-600 mr-4 hover:underline"
                  >
                    Stats
                  </a>

                  <button
                    onClick={() => handleDelete(row.code)}
                    disabled={deleting === row.code}
                    className="text-red-600 hover:underline disabled:opacity-50"
                  >
                    {deleting === row.code ? 'Deleting…' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td className="py-6 text-center text-gray-500" colSpan={5}>
                  No links found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
