import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ModalComponent from "./Modal";

const InnerCard = () => {
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardContent sx={{ minHeight: 300 }}>
        <Typography variant="h3" component="div" gutterBottom>
          Feed your mind with the best
        </Typography>
        <Typography variant="h6" gutterBottom>
          Grow, learn, and become more successful by reading some of the top
          article by highly reputatble individuals
        </Typography>
      </CardContent>
      <CardActions>
        <ModalComponent text="Signup" isSignupFlow={true} />
        <ModalComponent text="Login" isSignupFlow={false} />
      </CardActions>
    </Card>
  );
};

export default InnerCard;
