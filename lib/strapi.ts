const API_URL = "http://localhost:1337"

export async function getHomePage() {
  const res = await fetch(
    `${API_URL}/api/home-page?populate[testimonialsSection][populate][testimonials]=*`,
    {
      cache: "no-store",
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch homepage data")
  }

  return res.json()
}