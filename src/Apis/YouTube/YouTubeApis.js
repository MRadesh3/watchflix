import { useState, useEffect, useRef } from "react";
import axios from "axios";

const BASE_RAPID_URL = "https://youtube-v31.p.rapidapi.com";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export const fetchVideos = async (url, pageToken) => {
  const options = {
    params: {
      maxResults: 50, // Adjust as needed
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
      pageToken: pageToken, // Pass the pageToken here
    },
  };

  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};

export const fetchRelatedVideos = async (url, id) => {
  const options = {
    params: {
      part: "snippet",
      relatedToVideoId: id,
      type: "video",
      maxResults: 50,
    },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    },
  };

  const { data } = await axios.get(`${BASE_RAPID_URL}/${url}`, options);
  return data;
};
