import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  text: string;
  isSignupFlow: boolean;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalComponent = ({ text, isSignupFlow }: ModalProps) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setEmail("");
    setPassword("");
    setErrorMsg("");
    setOpen(false);
  };

  const handleClick = async () => {
    setIsLoading(true);
    setErrorMsg("");
    let data;
    if (isSignupFlow) {
      const { data: signupData } = await axios.post(
        "http://localhost:8080/auth/signup",
        {
          email,
          password,
        }
      );
      data = signupData;
    } else {
      const { data: loginData } = await axios.post(
        "http://localhost:8080/auth/login",
        {
          email,
          password,
        }
      );
      data = loginData;
    }

    if (data.errors.length) {
      setErrorMsg(data.errors[0].msg);
    } else {
      localStorage.setItem("token", data.data.token);
      navigate("/articles");
    }

    setIsLoading(false);
  };

  return (
    <div>
      <Button size="large" variant="contained" onClick={handleOpen}>
        {text}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            {text}
          </Typography>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            sx={{ m: 1 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            sx={{ m: 1 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              sx={{ mr: 2 }}
              onClick={handleClose}
              disabled={isLoading}
            >
              Close
            </Button>
            <Button
              variant="contained"
              onClick={handleClick}
              disabled={isLoading}
            >
              {text}
            </Button>
          </Box>
          {errorMsg && <p>{errorMsg}</p>}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalComponent;
