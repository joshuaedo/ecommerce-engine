export type SiteConfig = typeof siteConfig

export const siteConfig = {
  title: "Admin",
  description:
    ".",
  headline: "",
  excerpt:
    "",
  url: "",
  creator: "",
  siteName: "",
  email: "",

  // Cloudinary
  images: [
    "https://res.cloudinary.com/sandraokpara/image/upload/v1705326539/blog/image/purple.jpg",
    "https://res.cloudinary.com/sandraokpara/image/upload/v1705326539/blog/image/green.jpg",
    "https://res.cloudinary.com/sandraokpara/image/upload/v1705326540/blog/image/red.jpg",
    "https://res.cloudinary.com/sandraokpara/image/upload/v1705326538/blog/image/logo.jpg",
    "https://res.cloudinary.com/sandraokpara/image/upload/v1705326541/blog/image/room.jpg",
  ],
  poster: {
    sm: "https://res.cloudinary.com/sandraokpara/image/upload/v1705326540/blog/image/poster-sm.png",
    md: "https://res.cloudinary.com/sandraokpara/image/upload/v1705326542/blog/image/poster-md.png",
  },
  videos: [
    "https://res.cloudinary.com/sandraokpara/video/upload/v1705326863/blog/video/v2/sm_03.mp4",
    "https://res.cloudinary.com/sandraokpara/video/upload/v1705326864/blog/video/v2/sm_02.webm",
    "https://res.cloudinary.com/sandraokpara/video/upload/v1705326866/blog/video/v2/sm_01.ogv",
  ],
}
