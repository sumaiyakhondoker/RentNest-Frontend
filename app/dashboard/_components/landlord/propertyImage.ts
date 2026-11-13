export function propertyImage(picture: string | null) {
  if (!picture) return "/property-placeholder.png";

  try {
    const url = new URL(picture);
    if (url.protocol === "http:" || url.protocol === "https:") return picture;
  } catch {
   
  }

  return "/property-placeholder.png";
}
