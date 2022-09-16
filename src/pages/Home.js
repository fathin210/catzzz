import styled from "@emotion/styled";
import { Close, Search } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Grid,
  InputBase,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { Container } from "@mui/system";
import debounce from "lodash.debounce";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ToastContainer } from "react-toastify";
import CCard from "../components/CCard";
import { fetchData, fetchFavorite, searchCat } from "../services/api";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Home() {
  const [data, setData] = useState([]);
  const [favoriteData, setFavoriteData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [page, setPage] = useState(1);
  const [paginationCount, setPaginationCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const numPage = Math.floor(paginationCount / 10) | 0;

  const debounced = useCallback(
    debounce((value) => searchCat(value, setSearchData), 500),
    []
  );

  const search = (e) => {
    debounced(e.target.value);
  };

  useEffect(() => {
    fetchData(setPaginationCount, setData, setPage, setHasMore, page, numPage);
    fetchFavorite(setFavoriteData);
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#f3ddc6",
        minHeight: "100vh",
      }}
    >
      <AppBar position="static" elevation={5}>
        <Toolbar>
          <Typography
            fontWeight={500}
            fontSize={24}
            sx={{ flexGrow: 1, marginRight: 5 }}
          >
            Catzzz
          </Typography>
          <Paper
            elevation={5}
            sx={{
              display: "flex",
              backgroundColor: "#f3ddc6",
              borderRadius: 10,
              paddingX: "1em",
              alignItems: "center",
              color: "#904617",
            }}
          >
            <Search />
            <StyledInputBase onChange={search} placeholder="Search..." />
          </Paper>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container maxWidth="xl">
        <Typography fontSize={32} fontWeight={500} marginBottom={3}>
          Here's your{" "}
          <Typography variant="span" color={red[500]}>
            FAVORITE
          </Typography>{" "}
          Cat 💕💕
        </Typography>
        <div
          style={{
            display: "flex",
            overflowX: "scroll",
            overflowY: "hidden",
            padding: "20px",
          }}
        >
          {favoriteData?.map((item, index) => {
            return (
              <img
                key={index}
                src={item.image?.url}
                alt="Favourite Cat"
                height={400}
                width={500}
                style={{
                  marginRight: "10px",
                }}
              />
            );
          })}
        </div>
        <Typography fontSize={32} fontWeight={500} marginBottom={3}>
          Here's some cat that maybe you will{" "}
          <Typography variant="span" color={red[500]}>
            LOVE
          </Typography>{" "}
          it 💕💕
        </Typography>
        {searchData.length === 0 ? (
          <InfiniteScroll
            dataLength={page * 10}
            next={() =>
              fetchData(
                setPaginationCount,
                setData,
                setPage,
                setHasMore,
                page,
                numPage
              )
            }
            hasMore={hasMore}
            scrollThreshold={0.9}
            loader={
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 5,
                  }}
                >
                  <CircularProgress />
                </Box>
              </Grid>
            }
          >
            <Grid spacing={4} container>
              {data?.map((item, index) => (
                <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
                  <CCard
                    name={item.name}
                    description={item.description}
                    imageUrl={item.image?.url || item?.url}
                    alt={item?.alt_names}
                    origin={item.origin}
                    lifeSpan={item.life_span}
                    temperament={item.temperament}
                    imageId={item?.image?.id}
                  />
                </Grid>
              ))}
            </Grid>
          </InfiniteScroll>
        ) : (
          <Grid spacing={4} container>
            {searchData?.map((item, index) => (
              <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
                <CCard
                  name={item.name}
                  description={item.description}
                  imageUrl={
                    `https://cdn2.thecatapi.com/images/${item?.reference_image_id}.png` ||
                    item?.url
                  }
                  alt={item?.alt_names || item?.name}
                  origin={item.origin}
                  lifeSpan={item.life_span}
                  temperament={item.temperament}
                />
              </Grid>
            ))}
          </Grid>
        )}

        <Toolbar />
      </Container>
      <ToastContainer />
    </Box>
  );
}

export default Home;
