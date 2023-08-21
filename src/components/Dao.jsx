import React, { useState } from "react";
import {
  Box,
  Card,
  Grid,
  Stack,
  Typography,
  styled,
  Button,
} from "@mui/material";
import { HiUsers } from "react-icons/hi";

const BoxWrapper = styled(Box)({
  padding: "0px 8rem",
  ".nation-title": {
    fontSize: "40px",
    color: "#323F4B",
    fontWeight: 700,
    background: "linear-gradient(to right, #ffefba, #ffffff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  ".nation-card": {
    border: "2px solid #f5274e",
    borderRadius: "12px",
  },
  ".link": {
    background: "linear-gradient(to right, #ee0979, #ff6a00)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "18px",
    fontWeight: 600,
    padding: "10px 0px",
  },
  ".sub-link": {
    color: "#f5274e",
    fontWeight: 600,
  },
  ".description": {
    fontSize: "18px",
    fontWeight: 500,
    color: "white",
    padding: "10px 0px",
  },
  ".user-img": {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
  },
  ".user-grid": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ".stack-title": {
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    color: "white",
  },
  ".like-tile": {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  ".like-btn": {
    background: "#F7F4FA",
    padding: "10px",
  },
});

const Dao = ({ val }) => {
  return (
    <>
      <BoxWrapper>
        <Box style={{ background: "#0C0F1A" }} sx={{ padding: "48px" }}>
          <Grid container spacing={0}>
            <Grid item xs={12} md={10} xl={10}>
              <Typography className="nation-title">{val.name}</Typography>
              <Typography className="link">{val.address}</Typography>
              <div>
                {val.links.map((v, index) => {
                  return (
                    <Typography key={index} className="sub-link">
                      {v.link}
                    </Typography>
                  );
                })}
              </div>
              <Typography
                className="description"
                sx={{ wordWrap: "break-word" }}
              >
                {val.description}
              </Typography>
            </Grid>
          </Grid>

          <Box
            sx={{
              paddingTop: "25px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Stack
              sx={{ display: "flex", alignItems: "center" }}
              direction="row"
              spacing={2}
            >
              <Typography className="stack-title">
                {" "}
                <HiUsers
                  fontSize={"18px"}
                  style={{ paddingRight: "10px", color: "#f5274e" }}
                />{" "}
                Token-based{" "}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </BoxWrapper>
    </>
  );
};

export default Dao;
