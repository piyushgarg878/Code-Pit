'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch('http://localhost:3001/problems');
        if (!response.ok) {
          throw new Error('Failed to fetch problems');
        }
        const data = await response.json();
        // Ensure problems is always an array
        setProblems(Array.isArray(data) ? data : data.problems || []);
      } catch (err) {
        console.error('Error fetching problems:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">Coding Problems</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-left">
              <th className="p-4 border-b border-gray-700">Title</th>
              <th className="p-4 border-b border-gray-700">Difficulty</th>
              <th className="p-4 border-b border-gray-700">Acceptance Rate</th>
              <th className="p-4 border-b border-gray-700">Tags</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr key={problem.id} className="hover:bg-gray-800/50">
                <td className="p-4 border-b border-gray-700">
                  <Link 
                    href={`/problems/${problem.slug}`}
                    className="text-blue-400 hover:text-blue-300 font-medium"
                  >
                    {problem.title}
                  </Link>
                </td>
                <td className="p-4 border-b border-gray-700">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                    problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {problem.difficulty}
                  </span>
                </td>
                <td className="p-4 border-b border-gray-700">
                  {problem.acceptanceRate || 'N/A'}
                </td>
                <td className="p-4 border-b border-gray-700">
                  <div className="flex flex-wrap gap-1">
                    {problem.tags && problem.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-700 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}