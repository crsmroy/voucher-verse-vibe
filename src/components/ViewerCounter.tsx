
import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

const ViewerCounter = () => {
  const [viewCount, setViewCount] = useState(() => {
    // Get initial count from localStorage or default to 7000
    const savedCount = localStorage.getItem('viewerCount');
    return savedCount ? parseInt(savedCount, 10) : 7000;
  });

  useEffect(() => {
    // Save count to localStorage whenever it changes
    localStorage.setItem('viewerCount', viewCount.toString());
  }, [viewCount]);

  useEffect(() => {
    // Increment viewer count every 4 minutes
    const interval = setInterval(() => {
      setViewCount(prev => {
        const newCount = prev + 1;
        localStorage.setItem('viewerCount', newCount.toString());
        return newCount;
      });
    }, 240000); // 4 minutes = 240,000 milliseconds

    return () => clearInterval(interval);
  }, []);

  const formatViewCount = (count: number) => {
    // Don't format numbers below 10,000 to avoid confusion
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    }
    if (count >= 10000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  return (
    <div className="flex items-center space-x-2 text-gray-400">
      <Eye size={16} />
      <span className="text-sm">
        <span className="font-semibold text-white">{formatViewCount(viewCount)}</span> Views counter
      </span>
    </div>
  );
};

export default ViewerCounter;
