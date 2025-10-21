'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-800 text-gray-400">
      Loading editor...
    </div>
  ),
});

export default function CodeEditor({ value, onChange, language }) {
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEditorChange = (value) => {
    onChange(value);
  };

  // Editor options
  const options = {
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
    fontFamily: 'JetBrains Mono, Menlo, Monaco, Consolas, monospace',
    automaticLayout: true,
    tabSize: 2,
    wordWrap: 'on',
    theme: 'vs-dark',
  };

  if (!mounted) return null;

  return (
    <div className="h-full w-full">
      <MonacoEditor
        height="100%"
        language={language}
        value={value}
        onChange={handleEditorChange}
        options={options}
        theme="vs-dark"
      />
    </div>
  );
}