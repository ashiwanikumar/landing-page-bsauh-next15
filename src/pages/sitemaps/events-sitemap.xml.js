import axios from "axios";

// Define the URL to fetch approved events from the backend API
const EXTERNAL_DATA_URL = `${process.env.NEXT_PUBLIC_BACKEND_API}/events-approved`;

/**
 * Generates an XML sitemap from a list of events
 * @param {Array} events - Array of events with _id, title, and updatedAt fields
 * @param {string} domain - The domain to prepend to event URLs
 * @returns {string} XML sitemap content
 */
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function generateSiteMap(events, domain) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${events
      .map(({ _id, title, updatedAt }) => {
        const formattedName = createSlug(title);

        return `
      <url>
        <loc>${`${domain}/events/${_id}/${formattedName}`}</loc>
        <lastmod>${new Date(updatedAt).toISOString()}</lastmod>
      </url>
    `;
      })
      .join("")}
</urlset>
  `;
}

/**
 * Sitemap page component, doesn't render anything to the browser as it only sends XML sitemap.
 */
function SiteMap() {
  return null; // No need to render anything for sitemap generation
}

/**
 * getServerSideProps fetches the necessary data for sitemap generation and returns it as server-side props.
 * @param {Object} context - The context object containing response (res) information
 * @returns {Object} Props for the component, although it does not use any.
 */
export async function getServerSideProps({ res }) {
  try {
    // Fetch event data from the external API
    const request = await axios.get(EXTERNAL_DATA_URL);
    const events = request.data; // Make sure to adapt this according to the actual response structure

    // Generate the XML sitemap
    const sitemap = generateSiteMap(
      events,
      process.env.NEXT_PUBLIC_FRONTEND_URL
    );

    // Set the response header to 'text/xml'
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error("Failed to generate sitemap:", error);
    res.status(500).send("Internal Server Error");
  }

  return {
    props: {}, // No props needed as this doesn't render content
  };
}

export default SiteMap;
