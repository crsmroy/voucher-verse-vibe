
import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

const ViewerCounter = () => {
  const [viewCount, setViewCount] = useState(1000000);

  useEffect(() => {
    // Increment by 1 when component mounts (visitor visits the website)
    setViewCount(prev => prev + 1);

    // Increment viewer count every 3-5 seconds randomly for ongoing activity
    const interval = setInterval(() => {
      setViewCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, Math.random() * 2000 + 3000); // Random interval between 3-5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-2 text-gray-400">
      <Eye size={16} />
      <span className="text-sm">
        <span className="font-semibold text-white">{viewCount.toLocaleString()}</span> viewers
      </span>
    </div>
  );
};

export default ViewerCounter;
