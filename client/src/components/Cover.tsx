import { Container } from "@mui/material";
import { styled } from "@mui/system";
import CoverImage from "../images/cover.jpg";
import InnerCard from "./Card";

const CoverBack = styled("header")({
  padding: "5rem 0",
  height: "55vh",
  backgroundImage: `url(${CoverImage})`,
  backgroundSize: "cover",
});

const Cover = () => {
  return (
    <CoverBack>
      <Container>
        <InnerCard />
      </Container>
    </CoverBack>
  );
};

export default Cover;
