import { Stack } from "@mui/material";
import { useEffect, useState } from "react";

// APIs
import { fetchVideos } from "../Apis/YouTube/YouTubeApis";

const SideBar = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const url = `videoCategories?part=snippet&regionCode=IN`;
    try {
      const data = await fetchVideos(url);
      setCategories(data?.items);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Stack
      direction="row"
      sx={{
        overflow: "auto",
        height: { sx: "auto", md: "95%" },
        flexDirection: { md: "column" },
      }}
    >
      {categories.map((category) => (
        <button
          className="category-btn"
          onClick={() => setSelectedCategory(category?.snippet?.title)}
          style={{
            background:
              category?.snippet?.title === selectedCategory && "rgb(193,40,45)",
            color: "white",
          }}
          key={category?.snippet?.title}
        >
          {/* <span
            style={{
              color:
                category.title === selectedCategory ? "white" : "rgb(193,40,45",
              marginRight: "15px",
            }}
          >
            {category.icon}
          </span> */}
          <span
            style={{
              opacity: category?.snippet?.title === selectedCategory ? 1 : 0.8,
            }}
          >
            {category?.snippet?.title}
          </span>
        </button>
      ))}
    </Stack>
  );
};

export default SideBar;
