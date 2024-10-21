import { useState, useEffect } from "react";
import { Box, Typography, Pagination } from "@mui/material";
import { Videos } from "./";
import { useParams } from "react-router-dom";

// APIs
import { fetchVideos } from "../Apis/YouTube/YouTubeApis";

const SearchFeed = () => {
  const { searchTerm } = useParams();
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [prevPageToken, setPrevPageToken] = useState(null);

  const fetchCategoryVideos = async (token = null) => {
    const pageTokenParam = token ? `&pageToken=${token}` : "";
    const url = `search?part=snippet&q=${searchTerm}${pageTokenParam}`;

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
  }, [searchTerm]);

  const handlePageChange = async (event, value) => {
    setPage(value);
    const token = value > page ? nextPageToken : prevPageToken;
    await fetchCategoryVideos(token);
  };

  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={2}
        sx={{ color: "white", marginBottom: "40px" }}
      >
        Search Results For :{" "}
        <span style={{ color: "rgb(193,40,45)" }}>{searchTerm}</span> Videos
      </Typography>
      <Videos videos={videos} />
      <Box sx={{ display: "flex", justifyContent: "center", margin: "40px 0" }}>
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
  );
};

export default SearchFeed;
