'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/auth/login');
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const parsedUser = JSON.parse(userData);
        
        const response = await fetch(`/users/profile/${parsedUser.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        
        const data = await response.json();
        setUser(data);
        
        // Fetch user submissions if available
        if (data.submissions) {
          setSubmissions(data.submissions);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

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
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold">{user?.name}'s Profile</h1>
          <p className="text-gray-400">{user?.email}</p>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 border-b border-gray-700">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Problems Solved</h3>
            <p className="text-3xl font-bold text-blue-400">{user?.problemsSolved || 0}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Total Submissions</h3>
            <p className="text-3xl font-bold text-blue-400">{submissions.length}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Acceptance Rate</h3>
            <p className="text-3xl font-bold text-blue-400">
              {submissions.length > 0 
                ? `${Math.round((submissions.filter(s => s.status === 'Accepted').length / submissions.length) * 100)}%` 
                : 'N/A'}
            </p>
          </div>
        </div>
        
        {/* Recent Submissions */}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Recent Submissions</h2>
          
          {submissions.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No submissions yet. Start solving problems!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-700 text-left">
                    <th className="p-3 border-b border-gray-600">Problem</th>
                    <th className="p-3 border-b border-gray-600">Language</th>
                    <th className="p-3 border-b border-gray-600">Status</th>
                    <th className="p-3 border-b border-gray-600">Runtime</th>
                    <th className="p-3 border-b border-gray-600">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission, index) => (
                    <tr key={index} className="hover:bg-gray-700/50">
                      <td className="p-3 border-b border-gray-600">
                        <a 
                          href={`/problems/${submission.problemSlug}`}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          {submission.problemTitle}
                        </a>
                      </td>
                      <td className="p-3 border-b border-gray-600">
                        {submission.language}
                      </td>
                      <td className="p-3 border-b border-gray-600">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          submission.status === 'Accepted' ? 'bg-green-500/20 text-green-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {submission.status}
                        </span>
                      </td>
                      <td className="p-3 border-b border-gray-600">
                        {submission.runtime || 'N/A'}
                      </td>
                      <td className="p-3 border-b border-gray-600">
                        {new Date(submission.submittedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}