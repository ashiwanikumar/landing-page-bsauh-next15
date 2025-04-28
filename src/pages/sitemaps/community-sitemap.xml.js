import axios from "axios";

const EXTERNAL_DATA_URL = `${process.env.NEXT_PUBLIC_BACKEND_API}/community-members-approved`;

function createSlug(name) {
  return name
    ?.toLowerCase()
    .replace(/[^\w-]+/g, "")
    .replace(/\s+/g, "-");
}

function generateSiteMap(members) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${members
    .map((member) => {
      const slug = createSlug(member.name);
      return `
      <url>
        <loc>${`${process.env.NEXT_PUBLIC_FRONTEND_URL}/community/${member._id}/${slug}`}</loc>
        <lastmod>${new Date(member.updatedAt).toISOString()}</lastmod>
      </url>
    `;
    })
    .join("")}
</urlset>
  `;
}

export async function getServerSideProps({ res }) {
  try {
    const request = await axios.get(EXTERNAL_DATA_URL);
    const members = request.data;

    const sitemap = generateSiteMap(members);
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error("Failed to generate sitemap:", error);
    res.status(500).send("Internal Server Error");
  }

  return { props: {} };
}

export default function SiteMap() {
  return null;
}
