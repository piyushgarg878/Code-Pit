export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            CodePit
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Master Your Coding Skills Through Competition
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
              Start Coding
            </button>
            <button className="border border-blue-600 hover:bg-blue-600/10 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
              View Contests
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-gray-800/50 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4 text-blue-400">Live Contests</h3>
            <p className="text-gray-300">
              Participate in real-time coding competitions and challenge yourself against programmers worldwide.
            </p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4 text-blue-400">Practice Problems</h3>
            <p className="text-gray-300">
              Access a vast library of coding problems across different difficulty levels and topics.
            </p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4 text-blue-400">Leaderboards</h3>
            <p className="text-gray-300">
              Track your progress and compete with others to climb the global rankings.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex justify-center gap-12 mt-16">
          <div className="text-center">
            <h4 className="text-3xl font-bold text-blue-400">1000+</h4>
            <p className="text-gray-400">Coding Problems</p>
          </div>
          <div className="text-center">
            <h4 className="text-3xl font-bold text-blue-400">50K+</h4>
            <p className="text-gray-400">Active Users</p>
          </div>
          <div className="text-center">
            <h4 className="text-3xl font-bold text-blue-400">100+</h4>
            <p className="text-gray-400">Daily Contests</p>
          </div>
        </div>
      </main>
    </div>
  );
}
