import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { demoProfilePicture } from "../utils/constants";

const ChannelCard = ({ channelDetail, marginTop }) => {
  console.log(channelDetail);
  return (
    <Box
      sx={{
        boxShadow: "none",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        marginTop,
      }}
    >
      <Link to={`/channel/${channelDetail?.id?.channelId}`}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <CardMedia
            image={
              channelDetail?.snippet?.thumbnails?.high?.url ||
              demoProfilePicture
            }
            alt={channelDetail?.snippet?.title}
            sx={{
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              mb: 2,
              border: "1px solid #e3e3e3",
            }}
          />
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {channelDetail?.snippet?.title}
            <CheckCircle sx={{ fontSize: 18, color: "green", ml: "5px" }} />
          </Typography>
          {channelDetail?.statistics?.subscriberCount && (
            <div style={{ marginBottom: "30px" }}>
              <Typography>
                <span
                  style={{
                    color: "gray",
                    fontWeight: "bold",
                  }}
                >
                  Subscribers Count :
                </span>{" "}
                {parseInt(
                  channelDetail?.statistics?.subscriberCount
                ).toLocaleString()}{" "}
              </Typography>

              <Typography>
                <span
                  style={{
                    color: "gray",
                    fontWeight: "bold",
                  }}
                >
                  Videos Count :
                </span>{" "}
                {parseInt(
                  channelDetail?.statistics?.videoCount
                ).toLocaleString()}{" "}
              </Typography>
              <Typography>
                <span
                  style={{
                    color: "gray",
                    fontWeight: "bold",
                  }}
                >
                  Views Count :
                </span>{" "}
                {parseInt(
                  channelDetail?.statistics?.viewCount
                ).toLocaleString()}{" "}
              </Typography>
              <hr style={{ color: "gray", margin: "20px 0" }} />
            </div>
          )}
        </CardContent>
      </Link>
    </Box>
  );
};

export default ChannelCard;
