'use client';

import { useState } from 'react';

export default function LinkForm({ onCreate }) {
  const [targetUrl, setTargetUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUrl,
          customCode: customCode.trim() || undefined
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong');
      } else {
        setSuccessMsg('Short link created successfully!');
        setTargetUrl('');
        setCustomCode('');
        if (onCreate) onCreate(data); // parent refresh handler
      }
    } catch (err) {
      setErrorMsg(err.message);
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 space-y-4 border"
    >
      <div>
        <label className="block text-sm font-medium">
          Long URL <span className="text-red-500">*</span>
        </label>
        <input
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
          placeholder="https://example.com/some-page"
          className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Custom Code (optional)
        </label>
        <input
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          placeholder="6-8 chars [A-Za-z0-9]"
          className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded">
          {errorMsg}
        </div>
      )}

      {/* Success Message */}
      {successMsg && (
        <div className="text-sm text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded">
          {successMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md transition disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Short Link'}
      </button>
    </form>
  );
}
