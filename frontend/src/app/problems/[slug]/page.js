'use client';

import { useState, useEffect } from 'react';
import CodeEditor from '@/components/CodeEditor';

export default function ProblemDetail({ params }) {
  const { slug } = params;
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [code, setCode] = useState('// Write your code here');
  const [language, setLanguage] = useState('javascript');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await fetch(`http://localhost:3001/problems/slug/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch problem');
        }
        const data = await response.json();
        setProblem(data);
      } catch (err) {
        console.error('Error fetching problem:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [slug]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setResult(null);
    
    try {
      const response = await fetch('http://localhost:3001/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          problemId: problem.id,
          code,
          language
        }),
      });
      
      if (!response.ok) {
        throw new Error('Submission failed');
      }
      
      const data = await response.json();
      
      // Poll for results
      if (data.token) {
        checkSubmissionStatus(data.token);
      }
    } catch (err) {
      console.error('Error submitting code:', err);
      setError(err.message);
      setSubmitting(false);
    }
  };

  const checkSubmissionStatus = async (token) => {
    try {
      const response = await fetch(`http://localhost:3001/submissions/${token}`);
      if (!response.ok) {
        throw new Error('Failed to fetch submission status');
      }
      
      const data = await response.json();
      
      if (data.status === 'completed') {
        setResult(data);
        setSubmitting(false);
      } else if (data.status === 'processing') {
        // Poll again after a delay
        setTimeout(() => checkSubmissionStatus(token), 1000);
      } else {
        throw new Error('Submission processing failed');
      }
    } catch (err) {
      console.error('Error checking submission status:', err);
      setError(err.message);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="bg-yellow-500/20 border border-yellow-500 text-yellow-300 p-4 rounded">
          Problem not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        {/* Problem Description */}
        <div className="p-6 overflow-y-auto border-r border-gray-700">
          <h1 className="text-2xl font-bold mb-2">{problem.title}</h1>
          
          <div className="flex gap-2 mb-4">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
              problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {problem.difficulty}
            </span>
            
            {problem.tags && problem.tags.map((tag, index) => (
              <span key={index} className="bg-gray-700 px-2 py-1 rounded text-xs">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="prose prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: problem.description }} />
            
            {problem.examples && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3">Examples</h3>
                {problem.examples.map((example, index) => (
                  <div key={index} className="mb-4 bg-gray-800 p-4 rounded">
                    <p><strong>Input:</strong> {example.input}</p>
                    <p><strong>Output:</strong> {example.output}</p>
                    {example.explanation && (
                      <p><strong>Explanation:</strong> {example.explanation}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {problem.constraints && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3">Constraints</h3>
                <ul className="list-disc pl-5">
                  {problem.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {/* Code Editor */}
        <div className="flex flex-col h-full">
          <div className="p-4 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
            
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
          
          <div className="flex-grow">
            <CodeEditor
              value={code}
              onChange={setCode}
              language={language}
            />
          </div>
          
          {/* Results Panel */}
          {result && (
            <div className="p-4 bg-gray-800 border-t border-gray-700">
              <h3 className="font-semibold mb-2">Results</h3>
              <div className={`p-3 rounded ${
                result.status === 'Accepted' ? 'bg-green-500/20 text-green-300' :
                'bg-red-500/20 text-red-300'
              }`}>
                <div className="font-bold">{result.status}</div>
                {result.runtime && <div>Runtime: {result.runtime}</div>}
                {result.memory && <div>Memory: {result.memory}</div>}
                {result.error && <pre className="mt-2 p-2 bg-gray-900 rounded overflow-x-auto">{result.error}</pre>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}