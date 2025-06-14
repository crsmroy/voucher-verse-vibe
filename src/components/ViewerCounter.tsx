
import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

const ViewerCounter = () => {
  const [viewCount, setViewCount] = useState(100000);

  useEffect(() => {
    // Increment viewer count every 3-5 seconds randomly
    const interval = setInterval(() => {
      setViewCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, Math.random() * 2000 + 3000); // Random interval between 3-5 seconds

    return () => clearInterval(interval);
  }, []);

  const formatViewCount = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  return (
    <div className="flex items-center space-x-2 text-gray-400">
      <Eye size={16} />
      <span className="text-sm">
        <span className="font-semibold text-white">{formatViewCount(viewCount)}</span> viewers
      </span>
    </div>
  );
};

export default ViewerCounter;
