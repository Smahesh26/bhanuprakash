'use client';
import { useEffect, useState } from "react";

interface YouTubeVideo {
  title: string;
  videoId: string;
  thumbnail: string;
}

const CourseDetailsArea = ({ playlistId }: { playlistId: string }) => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${playlistId}&key=${apiKey}`
        );
        const data = await res.json();
        if (!data.items) {
          setError("No videos found or API error.");
          setVideos([]);
          setLoading(false);
          return;
        }
        const formatted = data.items.map((item: any) => ({
          title: item.snippet.title,
          videoId: item.snippet.resourceId.videoId,
          thumbnail: item.snippet.thumbnails?.medium?.url || "",
        }));
        setVideos(formatted);
        setSelectedVideo(formatted[0]?.videoId || "");
      } catch (e) {
        setError("Failed to load playlist.");
        setVideos([]);
      }
      setLoading(false);
    };

    fetchPlaylist();
  }, [playlistId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="row">
      {/* Chapters/Sidebar */}
      <div className="col-lg-4">
        <ul className="list-group">
          {videos.map((video, i) => (
            <li
              key={i}
              className={`list-group-item ${video.videoId === selectedVideo ? "active" : ""}`}
              onClick={() => setSelectedVideo(video.videoId)}
              style={{ cursor: "pointer" }}
            >
              {video.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Video Player */}
      <div className="col-lg-8">
        {selectedVideo && (
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${selectedVideo}`}
            title="YouTube video player"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default CourseDetailsArea;
