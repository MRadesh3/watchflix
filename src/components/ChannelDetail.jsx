import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Videos, ChannelCard } from "./";

// APIs
import { fetchVideos } from "../Apis/YouTube/YouTubeApis";

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState({});
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos(`channels?part=snippet%2CbrandingSettings&id=${id}`).then(
      (data) => {
        console.log(data);
        setChannelDetail(data.items[0]);
      }
    );

    fetchVideos(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => {
        console.log(data);
        setVideos(data.items);
      }
    );
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background: `${
              channelDetail?.brandingSettings?.image?.bannerExternalUrl
                ? `url(${channelDetail?.brandingSettings?.image?.bannerExternalUrl}) no-repeat center center`
                : "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)"
            }`,
            backgroundSize: "cover",
            backgroundSize: "100% ",
            height: "300px",
            zIndex: 10,
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>
      <Box
        sx={{
          margin: { sm: "0", md: "0 5%" },
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
          textAlign="center"
          marginBottom="50px"
        >
          {channelDetail?.snippet?.title}{" "}
          <span style={{ color: "rgb(193,40,45)" }}>Videos</span>
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
