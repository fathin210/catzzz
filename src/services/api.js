import axios from "axios";

const CatAPIClient = axios.create({
  baseURL: "https://api.thecatapi.com/v1/",
  timeout: 1000,
  headers: {
    "x-api-key":
      "live_nG8EdiH5Emy2wTHLewNlXGBBad7zfWhYIeUvbPTZBIjjMnUxVZfKYtR52h97con2",
  },
});

export const fetchData = (
  setPaginationCount,
  setData,
  setPage,
  setHasMore,
  page,
  numPage
) => {
  CatAPIClient.get(`breeds?limit=10&page=${page}&order=asc`)
    .then((res) => {
      setPaginationCount(res.headers["pagination-count"]);
      setTimeout(() => {
        setData((prev) => [...prev, ...res.data]);
      }, 500);
    })
    .then(() => setPage((prevState) => prevState + 1))
    .then(() => {
      if (page == numPage) setHasMore(false);
    })
    .catch((e) => console.log(e));
};

export const searchCat = (query, setSearchData) => {
  CatAPIClient.get(`breeds/search?q=${query}`)
    .then((res) => {
      setSearchData(res.data);
    })
    .catch((e) => console.log(e));
};

export const postFavorite = (imageId) => {
  return CatAPIClient.post("/favourites", {
    image_id: imageId,
  });
};

export const fetchFavorite = (setFavoriteData) => {
  CatAPIClient.get("favourites")
    .then((res) => setFavoriteData((prevState) => [...prevState, ...res.data]))
    .catch((e) => console.log(e));
};
