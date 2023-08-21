import React, { useEffect, useState } from "react";
import DaoNavbar from "../components/DaoNavbar";
import { Box, Grid, styled, Typography } from "@mui/material";
import DaoComponent from "../components/DaoComponent";
import Explore from "../components/Explore";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import "../DaoHome.css";
import { Wallet } from "@transia/xrpl";

const BoxWrapper = styled(Box)({
  marginTop: "4.7rem",
  padding: "0px 8rem",
  ".parent-image": {
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
  },
  ".parent-home-content": {
    display: "flex",
    flexDirection: "column",
    paddingTop: "85px",
    // justifyContent: 'center'
  },
  ".main-title": {
    fontSize: "55px",
    color: "#f5274e",
    lineHeight: "60px",
    fontFamily: "syne",
    fontWeight: 700,
  },
  ".description": {
    fontSize: "25px",
    color: "#000",
    lineHeight: "30px",
    fontWeight: 500,
    paddingTop: "10px",
  },
  ".explore-title": {
    fontSize: "28px",
    fontWeight: 700,
    color: "#323F4B",
    paddingTop: "40px",
  },
  ".dao-title": {
    fontSize: "28px",
    fontWeight: 700,
    background: "linear-gradient(to right, #ffefba, #ffffff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  ".creater-btn": {
    background: "#f5274e",
    textTransform: "capitalize",
    fontSize: "16px",
    fontWeight: 500,
    borderRadius: "12px",
    padding: "6px 15px",
  },
  ".creater-btn:hover": {
    background: "#f5274e",
  },
});

const DaoHome = () => {
  const navigate = useNavigate();

  const [mydaoList, setMyDaolist] = useState([]);
  const [loader1, setLoader1] = useState(false);

  useEffect(() => {
    setLoader1(true);
    const seed = localStorage.getItem('seed')
    const wallet = Wallet.fromSeed(seed)
    console.log(wallet.address)
    fetch(`${process.env.REACT_APP_API}/user/${wallet.address}`).then((res) => {
      return res.json()
    }).then((jsonRes) => {
      setMyDaolist(jsonRes.data.daolist)
      setLoader1(false)
    }).catch((e)=> console.error(e)).finally( )
  }, []);

  return (
    <React.Fragment>
      <BoxWrapper>
        <Box>
          <DaoNavbar />
        </Box>
        <Grid container spacing={0}>
          <Grid className="parent-home-content" item xs={12} md={6} xl={6}>
            <Typography className="main-title">
              Explore VoteX's endless innovation
            </Typography>
          </Grid>
          <Grid className="parent-image" item xs={12} md={6} xl={6}>
            <div
              style={{
                width: "80%",
                height: "100%",
                padding: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DaoComponent
                title="Create Your Smart DAO"
                description="Set governance parameters, transaction type and deploy your DAO on-chain in minutes with hooks on XRPL."
                btnTitle="Create a DAO"
                path="/create-dao"
              />
            </div>
          </Grid>
        </Grid>
        <Box sx={{ padding: "20px 0px" }}>
          <div className="tabs">
            <div className="selector"></div>
          <span  class="mydao" className="active">
              My DAOs
            </span>
          </div>
          <div class="mydao1">
            {loader1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Spinner />
              </div>
            )}
            <Grid container columnSpacing={3.5}>
              {mydaoList.map((val, index) => (
                <Grid
                  onClick={() => {
                    navigate(`/dao`, {
                      state: {
                        val,
                      },
                    });
                  }}
                  key={index}
                  item
                  xs={12}
                  md={6}
                  xl={6}
                >
                  <Explore
                    title={val.name}
                    subTitle={val.address}
                    icon={val.icon}
                    count={val.users.length}
                    description={val.description}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </Box>
      </BoxWrapper>
    </React.Fragment>
  );
};

export default DaoHome;
