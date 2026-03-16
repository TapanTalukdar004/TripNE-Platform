const CLOUD_NAME = "dbs5vefzk";

/**
 * Returns an optimized Cloudinary URL for images uploaded under the `tripne/` folder.
 * Applies `f_auto` (WebP/AVIF auto-negotiation) and `q_auto` (smart compression).
 *
 * @param filename - The original filename with extension (e.g., "assam-hero1.jpg")
 * @returns Full Cloudinary delivery URL with auto-optimization transformations
 */
export function cloudinaryUrl(filename: string): string {
  // Strip the file extension to get the public_id
  const publicId = filename.replace(/\.[^.]+$/, "");
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto/tripne/${publicId}`;
}
