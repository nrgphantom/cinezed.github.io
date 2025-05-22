
import React from "react";

const MediaCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-lg overflow-hidden">
      <div className="aspect-[2/3] bg-cinezed-card shimmer"></div>
      <div className="p-3 bg-cinezed-card">
        <div className="h-5 w-full bg-cinezed-darker/80 rounded shimmer mb-3"></div>
        <div className="flex gap-2">
          <div className="h-4 w-16 bg-cinezed-darker/80 rounded shimmer"></div>
          <div className="h-4 w-16 bg-cinezed-darker/80 rounded shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default MediaCardSkeleton;
