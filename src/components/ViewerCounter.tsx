
import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

const ViewerCounter = () => {
  const [viewCount, setViewCount] = useState(() => {
    // Initialize from localStorage or default to 1000000
    const savedCount = localStorage.getItem('viewerCount');
    return savedCount ? parseInt(savedCount, 10) : 1000000;
  });

  useEffect(() => {
    // Increment by 1 when component mounts (visitor visits the website)
    const newCount = viewCount + 1;
    setViewCount(newCount);
    localStorage.setItem('viewerCount', newCount.toString());

    // Increment viewer count every 3-5 seconds randomly for ongoing activity
    const interval = setInterval(() => {
      setViewCount(prev => {
        const updatedCount = prev + Math.floor(Math.random() * 3) + 1;
        localStorage.setItem('viewerCount', updatedCount.toString());
        return updatedCount;
      });
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
