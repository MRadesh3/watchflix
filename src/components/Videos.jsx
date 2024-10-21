import { Grid } from "@mui/material";
import { VideoCard, ChannelCard } from "./";

const Videos = ({ videos, xs, sm, md }) => {
  console.log(videos);

  return (
    <Grid container spacing={2}>
      {videos?.map((video, index) => (
        <Grid item xs={xs || 12} sm={sm || 6} md={md || 4} key={index}>
          {video?.id?.videoId && <VideoCard video={video} />}
          {video?.id?.playlistId && <VideoCard video={video} />}
          {video?.id?.channelId && <ChannelCard channelDetail={video} />}
        </Grid>
      ))}
    </Grid>
  );
};

export default Videos;
