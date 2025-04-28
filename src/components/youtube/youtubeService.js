// services/youtubeService.js
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const PLAYLIST_ID = process.env.NEXT_PUBLIC_PLAYLIST_ID;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const fetchPlaylistVideos = async (maxResults = 50) => {
  const url = `${BASE_URL}/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${PLAYLIST_ID}&key=${YOUTUBE_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.items;
};

export { fetchPlaylistVideos };

// Add default export
export default { fetchPlaylistVideos };
