// /** @type {import('next').NextConfig} */
// const nextConfig = {
    
//     reactStrictMode:false,
//     async rewrites() {
//         return [
//           {
//             source: '/sitemap.xml',
//             destination: '/site/sitemap', // Adjust to the path of the API route
//           },
//         ];
//       },
//     swcMinify: true,
//     images:{
//         domains:['res.cloudinary.com','lh3.googleusercontent.com']
//     }
    
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable strict mode if not needed
  swcMinify: true, // Enable SWC minification
  images: {
    domains: ['res.cloudinary.com', 'lh3.googleusercontent.com'], // List of allowed image domains
  },
};

export default nextConfig;
