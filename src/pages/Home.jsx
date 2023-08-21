import React, { useState } from "react";
import { Box, Button, Grid, Typography, styled } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import Navbar from "../components/Navbar";
import daomain from "./../assets/images/daomain.png";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { XummPkce } from "xumm-oauth2-pkce";
import Modal from "react-modal";
import { GrClose } from "react-icons/gr";
import { Wallet } from "@transia/xrpl";

const BoxWrapper = styled(Box)({
  ".launch-btn": {
    background: "#f5274e",
    textTransform: "capitalize",
    fontSize: "16px",
    fontWeight: 500,
    borderRadius: "12px",
    padding: "6px 15px",
  },
  ".launch-btn:hover": {
    background: "#f5274e",
  },
  ".dao-btn": {
    border: "2px solid #f5274e",
    background: "#fff",
    color: "#f5274e",
    textTransform: "capitalize",
    fontSize: "16px",
    fontWeight: 500,
    borderRadius: "12px",
    padding: "6px 15px",
  },
  ".learn-btn": {
    border: "2px solid #f5274e",
    background: "#fff",
    color: "#f5274e",
    textTransform: "none",
    fontSize: "16px",
    fontWeight: 500,
    marginTop: "20px",
    borderRadius: "12px",
    padding: "6px 15px",
  },
  ".parent-btn-box": {
    paddingTop: "20px",
    display: "flex",
    gap: "10px",
  },
  ".parent-img": {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  },
  ".parent-title": {
    padding: "13px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  ".argon-title": {
    fontSize: "32px",
    fontWeight: 500,
    lineHeight: "42px",
    color: "#f5274e",
  },
  ".argon-description": {
    fontSize: "46px",
    fontWeight: 300,
    color: "#f5274e",
    lineHeight: "50px",
    marginTop: "15px",
  },
  ".parent-voting": {
    display: "flex",
    gap: "24px",
    padding: "2rem 8rem",
  },
  ".leading-title": {
    fontSize: "44px",
    lineHeight: "50px",
    textAlign: "center",
    color: "#f5274e",
  },
  ".leading-description": {
    fontSize: "16px",
    lineHeight: "15px",
    color: "#f5274e",
    textAlign: "center",
    padding: "10px",
  },
});

const Home = () => {
  const navigate = useNavigate();
  const [isProgress, setProgress] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [seed, setSeed] = useState("");
  const [isOldSeed, setOldSeed] = useState(false);

  useState(() => {
    const seed_ = localStorage.getItem("seed");
    if (seed_) {
      setOldSeed(true);
    }
    // const walllet = Wallet.fromSeed(seed)
  }, []);

  const signedInHandler = (seed_) => {
    const walllet = Wallet.fromSeed(seed_);
    localStorage.setItem("seed", seed_);
    window.wallet_address = walllet.address;
    setProgress(false);
    navigate("/dashboard");
  };

  return (
    <React.Fragment>
      <Modal
        isOpen={showModal}
        onRequestClose={() => {
          setProgress(false);
          setShowModal(false);
        }}
        className="modal"
        overlayClassName="overlay"
        contentLabel="Enter new title"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "30%",
            backgroundColor: "white",
            borderRadius: "4px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <div className="flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
          <h3 className="text-lg font-semibold">Login</h3>
          <GrClose
            className="text-gray-400 hover:text-gray-500 cursor-pointer"
            onClick={() => {
              setShowModal(false);
              setProgress(false);
            }}
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <input
            label="Seed"
            className="p-3 w-4/5"
            placeholder="Seed value"
            value={seed}
            onChange={(event) => {
              setSeed(event.target.value);
            }}
          />
        </div>

        <div className="p-4">
          <div className="flex justify-end">
            <Box className="parent-btn-box">
              <Button
                onClick={async () => {
                  signedInHandler(seed);
                }}
                variant="contained"
                style={{
                  background: "#f5274e",
                  textTransform: "capitalize",
                  fontSize: "16px",
                  fontWeight: 500,
                  borderRadius: "12px",
                  padding: "6px 15px",
                }}
              >
                Import Seed
              </Button>
              {isOldSeed && (
                <Button
                  onClick={async () => {
                    const seed_ = localStorage.getItem("seed");
                    signedInHandler(seed_);
                  }}
                  variant="contained"
                  style={{
                    background: "#f5274e",
                    textTransform: "capitalize",
                    fontSize: "16px",
                    fontWeight: 500,
                    borderRadius: "12px",
                    padding: "6px 15px",
                    marginLeft: "5px",
                  }}
                >
                  Continue (Old Seed)
                </Button>
              )}
            </Box>
          </div>
        </div>
      </Modal>
      <Box>
        <Navbar />
      </Box>
      <BoxWrapper>
        <Box>
          <Grid container spacing={0} sx={{ padding: "0px 8rem" }}>
            <Grid item xs={6} md={7} xl={7} className="parent-title">
              <Typography
                sx={{
                  fontSize: "90px",
                  fontFamily: "Syne",
                  lineHeight: "90px",
                }}
                style={{
                  fontWeight: 700,
                  background: "linear-gradient(to right, #ee0979, #ff6a00)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                DAO on XRP
              </Typography>
              <Typography
                sx={{
                  fontSize: "23px",
                  lineHeight: "32px",
                  marginTop: "19px",
                  color: "#f5274e",
                }}
              >
                Introducing a Revolutionary DAO: Unmatched Scalability, Blazing
                Fast Speed, and Uncompromising Security. Crafted using the
                cutting-edge hooks feature of XRPL, this innovation seamlessly
                accommodates a diverse array of XRPL transaction types, all
                conveniently attached to your proposals
              </Typography>
              <Box className="parent-btn-box">
                <Button
                  onClick={async () => {
                    setProgress(true);
                    setShowModal(true);
                  }}
                  variant="contained"
                  className="launch-btn"
                >
                  {" "}
                  {isProgress && <Spinner />}{" "}
                  {!isProgress && (
                    <>
                      <RocketLaunchIcon
                        style={{ fontSize: "large", paddingRight: "8px" }}
                      />{" "}
                      Launch App
                    </>
                  )}
                </Button>
              </Box>
            </Grid>

            <Grid item xs={6} md={5} xl={5} className="parent-img">
              <img src={daomain} alt="dao-main" width={"100%"} />
            </Grid>
          </Grid>
          <Box sx={{ padding: "0px 8rem" }}>
            <Typography
              sx={{
                fontSize: "45px",
                fontFamily: "Syne",
                lineHeight: "45px",
                color: "#f5274e",
              }}
            >
              How?
            </Typography>
            <Box>
              <Grid sx={{ marginTop: "30px" }} container spacing={0}>
                <Grid item xs={12} md={6} xl={6}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      style={{ objectFit: "crop", height: 250 }}
                      src="/images/6.png"
                    />
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  xl={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "32px",
                      fontFamily: "Syne",
                      lineHeight: "22px",
                      color: "#f5274e",
                    }}
                    style={{
                      fontWeight: 700,
                      background: "linear-gradient(to right, #ee0979, #ff6a00)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    1.Create DAO.
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "23px",
                      lineHeight: "32px",
                      marginTop: "19px",
                      color: "#f5274e",
                    }}
                  >
                    Provide essential information such as name, description, and
                    logo, and swiftly set up governance to create a DAO with
                    lightning-fast hooks.
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                sx={{ marginTop: "60px", marginBottom: "60px" }}
                container
                spacing={0}
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                  xl={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "32px",
                      fontFamily: "Syne",
                      lineHeight: "22px",
                      color: "#f5274e",
                    }}
                    style={{
                      fontWeight: 700,
                      background: "linear-gradient(to right, #ee0979, #ff6a00)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    2.Create a Proposal.
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "23px",
                      lineHeight: "32px",
                      marginTop: "19px",
                      color: "#f5274e",
                    }}
                  >
                    Effortlessly generate proposals featuring either a
                    straightforward direct payment condition or a condition
                    involving any XRPL supported payment types{" "}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      style={{ objectFit: "crop", height: 100 }}
                      src="/images/9.png"
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid sx={{ marginTop: "60px", marginBottom: "60px" }}  container spacing={0}>
                <Grid item xs={12} md={6} xl={6}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      style={{ objectFit: "crop", height: 100 }}
                      src="/hooks-logo.svg"
                    />
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  xl={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "32px",
                      fontFamily: "Syne",
                      lineHeight: "22px",
                      color: "#f5274e",
                    }}
                    style={{
                      fontWeight: 700,
                      background: "linear-gradient(to right, #ee0979, #ff6a00)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    3.Auto execution
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "23px",
                      lineHeight: "32px",
                      marginTop: "19px",
                      color: "#f5274e",
                    }}
                  >
                    Thanks to hooks, once the proposal is approved, the attached
                    transaction will execute automatically.{" "}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </BoxWrapper>
    </React.Fragment>
  );
};

export default Home;
