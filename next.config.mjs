/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "media.istockphoto.com" },
      { protocol: "https", hostname: "www.shutterstock.com" },
      { protocol: "https", hostname: "images.samsung.com" },
      { protocol: "https", hostname: "logodownload.org" },
      { protocol: "https", hostname: "img.redbull.com" },
    ],
  },
};

export default nextConfig;
