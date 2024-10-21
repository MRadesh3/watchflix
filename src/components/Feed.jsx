import { useState, useEffect } from "react";
import { Box, Stack, Typography, Pagination } from "@mui/material";
import { SideBar, Videos } from "./";

// APIs
import { fetchVideos } from "../Apis/YouTube/YouTubeApis";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [prevPageToken, setPrevPageToken] = useState(null);

  const fetchCategoryVideos = async (token = null) => {
    const pageTokenParam = token ? `&pageToken=${token}` : "";
    const url = `search?part=snippet&q=${selectedCategory}${pageTokenParam}&regionCode=IN`;

    try {
      const data = await fetchVideos(url);
      setVideos(data?.items);
      setNextPageToken(data?.nextPageToken);
      setPrevPageToken(data?.prevPageToken);
      setTotalPages(
        Math.ceil(data?.pageInfo?.totalResults / data?.pageInfo?.resultsPerPage)
      );
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchCategoryVideos();
  }, [selectedCategory]);

  const handlePageChange = async (event, value) => {
    setPage(value);
    const token = value > page ? nextPageToken : prevPageToken;
    await fetchCategoryVideos(token);
  };

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sm: 0, md: 2 },
        }}
      >
        <SideBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright @{new Date().getFullYear()} WatchFlix
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory}{" "}
          <span style={{ color: "rgb(193,40,45)" }}>Videos</span>
        </Typography>
        <Videos videos={videos} />
        <Box
          sx={{ display: "flex", justifyContent: "center", margin: "40px 0" }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            siblingCount={9}
            boundaryCount={1}
            sx={{
              "& .MuiPaginationItem-root": {
                color: "white",
                borderColor: "white",
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "rgb(193, 40, 45) !important",
                color: "white !important",
                borderColor: "rgb(193, 40, 45) !important",
              },
              "& .MuiPaginationItem-ellipsis": {
                color: "white",
              },
            }}
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default Feed;
