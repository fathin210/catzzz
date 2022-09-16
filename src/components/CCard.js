import styled from "@emotion/styled";
import {
  ExpandMore as ExpandMoreIcon,
  Favorite,
  Share,
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CardHeader,
  IconButton,
  Collapse,
  CardActions,
  Divider,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { fetchFavorite, postFavorite } from "../services/api";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function CCard({
  alt,
  description,
  imageId,
  imageUrl,
  lifeSpan,
  name,
  origin,
  temperament,
}) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      elevation={5}
      // sx={{
      //   transition: "all ease-out 300ms",
      //   "&:hover": {
      //     transition: "all ease-in 300ms",
      //     backgroundColor: orange[700],
      //     color: "white",
      //     cursor: "pointer",
      //   },
      // }}
    >
      <CardHeader
        title={name}
        action={
          <IconButton aria-label="country_flag">
            <img
              src={`https://countryflagsapi.com/png/${origin}`}
              alt={origin}
              width={30}
              height={20}
              style={{
                fontSize: 12,
              }}
            />
          </IconButton>
        }
      />
      <CardMedia
        component="img"
        height="500"
        image={imageUrl}
        alt={alt}
        sx={{
          objectPosition: "60% 20%",
        }}
      />
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => {
            postFavorite(imageId)
              .then((_) => toast.success("Success put into favorite"))
              .catch(() => toast.error("Error while put into favorite"));
          }}
        >
          <Favorite />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded}>
        <CardContent>
          <Typography>Nationality : {origin}</Typography>
          <Typography>Life span : {lifeSpan}</Typography>
          <Typography>Temperament: {temperament}</Typography>
          <Divider
            sx={{
              marginY: 2,
            }}
          />
          <Typography>{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default CCard;
