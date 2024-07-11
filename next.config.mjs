// const nextConfig = {
//   images: {
//     domains: ['res.cloudinary.com'],
//     dangerouslyAllowSVG: true,
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'media.graphassets.com'
//       },
//     ],
    
//   }
// };

// export default nextConfig;
// const nextConfig = {
//   images: {
//     domains: ['res.cloudinary.com'],
//     dangerouslyAllowSVG: true,
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'media.graphassets.com'
//       },
//     ],
//     // Ensure this path is correct
//   }
// };

// export default nextConfig;
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com',  'img.clerk.com',], // Add Clerk's domain here
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.graphassets.com'
      },
    ],
    // Ensure this path is correct
  }
};

export default nextConfig;





