const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getHomePage() {
  const res = await fetch(
    `${STRAPI_URL}/api/home-page?populate[testimonialsSection][populate][testimonials][populate]=*`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch homepage data");
  }

  return res.json();
}