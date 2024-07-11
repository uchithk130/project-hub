import React from 'react';

const SkeletonView = () => {
  return (
    <div className="py-3 px-1 md:p-6 space-y-6 animate-pulse">
      {/* Banner with semicircle profile image */}
      <div className="relative bg-gray-200 h-48">
        <div className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full overflow-hidden border-4 border-white md:right-[25%] md:translate-x-0 bg-gray-300" />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-justify">
        {/* Right Column: Project Details */}
        <div className="bg-white p-4 rounded shadow md:col-span-2 order-1">
          <div className="h-8 bg-gray-300 mb-4"></div>
          <div className="space-y-4">
            <div>
              <div className="h-5 bg-gray-300 mb-1 w-40"></div>
              <div className="h-5 bg-gray-200"></div>
            </div>
            <div>
              <div className="h-5 bg-gray-300 mb-1 w-32"></div>
              <div className="h-5 bg-gray-200"></div>
            </div>
          </div>
          <div className="flex flex-col space-y-4 mt-6">
            <div className="flex items-center">
              <div className="h-6 w-6 bg-gray-300 mr-2"></div>
              <div className="h-5 bg-gray-200 w-24"></div>
            </div>
            <div className="flex items-center">
              <div className="h-6 w-6 bg-gray-300 mr-2"></div>
              <div className="h-5 bg-gray-200 w-20"></div>
            </div>
            <div className="flex items-center">
              <div className="h-6 w-6 bg-gray-300 mr-2"></div>
              <div className="h-5 bg-gray-200 w-28"></div>
            </div>
          </div>
        </div>

        {/* Left Column: Technologies and Images */}
        <div className="bg-white p-4 rounded shadow md:col-span-1 order-2 md:order-1 md:mt-6 mt-6">
          <div className="h-8 bg-gray-300 mb-4"></div>
          <ul className="flex flex-wrap gap-2 mb-4">
            {[...Array(3)].map((_, index) => (
              <li key={index} className="bg-gray-200 px-3 py-1 rounded-full w-20 h-8"></li>
            ))}
          </ul>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="relative w-full h-40 p-2 border rounded-lg overflow-hidden bg-gray-200" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonView;
