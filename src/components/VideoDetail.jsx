import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, IconButton, Collapse } from "@mui/material";
import { CheckCircle, ExpandMore, ExpandLess } from "@mui/icons-material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Videos } from "./";

// APIs
import { fetchVideos, fetchRelatedVideos } from "../Apis/YouTube/YouTubeApis";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState(null);
  const [comments, setComments] = useState(null);
  const { id } = useParams();
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    fetchVideos(`videos?part=snippet,statistics,contentDetails&id=${id}`).then(
      (data) => {
        setVideoDetail(data?.items[0]);
      }
    );

    fetchVideos(`commentThreads?part=snippet&videoId=${id}`)
      .then((data) => {
        setComments(data?.items);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setComments([]);
      });

    fetchRelatedVideos("search", id).then((data) => {
      setRelatedVideos(data?.items);
    });
  }, [id]);

  if (!videoDetail?.snippet) return <div>Loading...</div>;

  const {
    snippet: { title, channelId, channelTitle, description },
    statistics: { viewCount, likeCount },
  } = videoDetail || {};

  return (
    <Box minHeight="95vh" px={2}>
      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: { md: "1.4fr 0.6fr", xs: "1fr" },
          gap: "20px",
        }}
      >
        <Box flex={1}>
          <Box sx={{ width: "100%", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography variant="h5" fontWeight="bold" p={2} color="#fff">
              {title}
            </Typography>
            <Stack
              direction={{ sm: "column", md: "row" }}
              gap={2}
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="#fff"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                  }}
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: 18, color: "green", marginLeft: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    opacity: 0.7,
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <ThumbUpIcon fontSize="small" />{" "}
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>

            <Typography
              variant="body1"
              sx={{ opacity: 0.7, display: { xs: "none", sm: "block" } }}
              color="#fff"
              px={2}
            >
              {description}
            </Typography>
          </Box>

          <hr
            style={{
              opacity: 0.7,
              margin: "20px 0",
            }}
          />

          <Box sx={{ px: 2 }}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: "#fff" }}>
                Comments
              </Typography>
              <IconButton
                onClick={() => setShowComments(!showComments)}
                sx={{ color: "#fff" }}
              >
                {showComments ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Stack>
            <Collapse in={showComments} timeout="auto" unmountOnExit>
              <Stack spacing={2}>
                {comments && comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <Box key={index} sx={{ color: "#fff" }}>
                      <Stack
                        direction="row"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <img
                          src={
                            comment?.snippet?.topLevelComment?.snippet
                              ?.authorProfileImageUrl
                          }
                          alt="avatar"
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                          }}
                        />
                        <Typography variant="body1" fontWeight="bold" p={2}>
                          {
                            comment?.snippet?.topLevelComment?.snippet
                              ?.authorDisplayName
                          }
                        </Typography>
                      </Stack>

                      <Typography variant="body2" p={2}>
                        {
                          comment?.snippet?.topLevelComment?.snippet
                            ?.textDisplay
                        }
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" sx={{ color: "#fff" }}>
                    Comments are disabled for this video.
                  </Typography>
                )}
              </Stack>
            </Collapse>
          </Box>
        </Box>

        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={relatedVideos} xs={12} sm={12} md={12} />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
