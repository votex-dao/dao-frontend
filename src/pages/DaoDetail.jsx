import React, { useEffect, useState } from "react";
import Dao from "../components/Dao";
import { Box, Grid, styled } from "@mui/material";
import Creater from "../components/Creater";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CreateDaoNavbar from "../components/CreateDaoNavbar";
import { KeyboardArrowRight } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { Client, dropsToXrp } from "@transia/xrpl";

const BoxWrapper = styled(Box)({
  margin: "0px 8rem",
  ".member-card": {
    border: "2px solid #f5274e",
    borderRadius: "12px",
    padding: "24px",
  },
  ".info-card": {
    border: "2px solid #f5274e",
    borderRadius: "12px",
    padding: "24px",
  },
  ".icon-btn": {
    background: "#F5F8FF",
    borderRadius: "12px",
    border: "1px solid #f5274e",
    color: "#f5274e",
  },
  ".name-btn": {
    background: "#f5274e",
    borderRadius: "12px",
    border: "1px solid #f5274e",
    color: "#fff",
    fontWeight: "700",
    textTransform: "none",
    fontSize: "16px",
  },
  ".parent-member": {
    display: "flex",
    justifyContent: "space-between",
  },
  ".member-title": {
    fontSize: "32px",
    fontWeight: 700,
    paddingTop: "35px",
    color: "#323F4B",
  },
  ".token": {
    fontSize: "16px",
    fontWeight: 500,
    color: "#616E7C",
  },
  ".detail-description": {
    fontSize: "14px",
    display: "flex",
    fontWeight: 500,
    color: "#616E7C",
  },
  ".text-token": {
    fontWeight: 700,
    color: "#52606D",
  },
  ".text-token:hover": {
    color: "#f5274e",
  },
  ".parent-stack": {
    display: "flex",
    justifyContent: "space-between",
  },
  ".see-btn": {
    color: "#52606D",
    fontWeight: 700,
    fontSize: "16px",
    background: "#fff",
    border: "2px solid #f5274e",
    borderRadius: "12px",
    textTransform: "none",
    marginTop: "16px",
  },
  ".share": {
    fontSize: "18px",
    paddingLeft: "10px",
  },
  ".share:hover": {
    color: "#f5274e",
  },
  ".see-btn:hover": {
    background: "#fff",
  },
  ".parent-grid-member": {
    padding: "30px 0px",
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

const ProposalView = ({ item, members, daoid }) => {
  const navigate = useNavigate()
  return (
    <Card
      style={{
        padding: 12,
        borderRadius: 10,
        background: "#0C0F1A",
        display: "flex",
        justifyContent: "space-between",
      }}
      variant="contained"
    >
      <Typography
        style={{
          fontWeight: "bold",
          fontSize: "26px",
          fontWeight: 700,
          background: "linear-gradient(to right, #ee0979, #ff6a00)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {item[Object.keys(item)[0]][0]}
      </Typography>
      <Button
        variant="contained"
        className="creater-btn"
        disableElevation
        style={{ marginLeft: "12px", fontWeight: "bold", fontSize: "32px" }}
        onClick={() => {
          const tObj = item[Object.keys(item)[0]]
          navigate('/vote', { state:{
            val: {
              address: daoid,
              desc: tObj[1],
              title: tObj[0],
              txData: tObj[2],
              owner: tObj[3],
              invoiceId: Object.keys(item)[0]
            },
            members: members
          }})
        }}
      >
        <KeyboardArrowRight style={{ paddingLeft: "5px" }} />
      </Button>
    </Card>
  );
};

const MembersView = ({ item }) => {

  return (
    <Card
      style={{
        padding: 12,
        borderRadius: 10,
        background: "#0C0F1A",
        display: "flex",
        justifyContent: "space-between",
      }}
      variant="contained"
    >
      <Typography
        style={{
          fontWeight: "bold",
          fontSize: "26px",
          fontWeight: 700,
          background: "linear-gradient(to right, #ee0979, #ff6a00)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {item.substr(0, 8) + "..." + item.substr(item.length-9, item.length)}
      </Typography>
      <Button
        variant="contained"
        className="creater-btn"
        disableElevation
        style={{ marginLeft: "12px", fontWeight: "bold", fontSize: "32px" }}
        onClick={() => {
          window.open(`https://hooks-testnet-v3-explorer.xrpl-labs.com/${item}`, "_blank");
        }}
      >
        <KeyboardArrowRight style={{ paddingLeft: "5px" }} />
      </Button>
    </Card>
  );
};

const Dashboard = () => {
  let [daoBalance,setDaoBalance] = useState(0)
  
  const location = useLocation();
  const [proposals, setProposal] = useState([]);
  const [members, setMembers] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate()
  
  useEffect( () => {
    const addr = location.state.val.address;
    const users = location.state.val.users;
    setLoader(true);
    (async ()=> {
      const client = new Client(
        "wss://hooks-testnet-v3.xrpl-labs.com/"
      );
      await client.connect();
      const response = await client.request({
        "id": 2,
        "command": "account_info",
        "account": addr,
        "ledger_index": "current",
        "queue": true
      });
     setDaoBalance(parseFloat(dropsToXrp(response.result.account_data.Balance)).toFixed(2))
     
      setProposal(location.state.val.proposals)
      setMembers(users);
      setLoader(false);
    })()
  }, []);
  return (
    <React.Fragment>
      <CreateDaoNavbar />
      <BoxWrapper sx={{ paddingTop: "20px", fontSize: "50px" }}>
        <Box>
          <Dao val={location.state.val} />
        </Box>
        <BoxWrapper>
          <Grid container columnSpacing={{ md: 4, xl: 3.9 }}>
          <Grid item>
              <Card
                sx={{
                  p: 3,
                  background: "#444f5e",
                  borderRadius: "12px",
                  userSelect: "none",
                  display: "flex",
                }}
              >
                <Typography className="dao-title">Create Proposal</Typography>
                <Button
                  variant="contained"
                  className="creater-btn"
                  disableElevation
                  style={{
                    marginLeft: "12px",
                    fontWeight: "bold",
                    fontSize: "32px",
                  }}
                  onClick={() => {
                    navigate('/proposal',{ state:{
                      address: location.state.val.address
                    }})
                  }}
                >
                  <KeyboardArrowRight style={{ paddingLeft: "5px" }} />
                </Button>
              </Card>
            </Grid>
            <Grid item>
              <Card
                sx={{
                  p: 3,
                  background: "#444f5e",
                  borderRadius: "12px",
                  userSelect: "none",
                  display: "flex",
                }}
              >
                <Typography className="dao-title">{daoBalance} XRP</Typography>
                <Button
                  variant="contained"
                  className="creater-btn"
                  disableElevation
                  style={{
                    marginLeft: "12px",
                    fontWeight: "bold",
                    fontSize: "32px",
                  }}
                  onClick={() => {
                    let url = "https://hooks-testnet-v3-explorer.xrpl-labs.com/"+location.state.val.address
                    window.open(url)
                  }}
                >
                  <KeyboardArrowRight style={{ paddingLeft: "5px" }} />
                </Button>
              </Card>
            </Grid>
          
          
          </Grid>
        </BoxWrapper>

        <Box
          sx={{ padding: "0px 8rem", marginTop: "30px", marginBottom: "30px" }}
        >
          {loader && (
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
          {!loader && (
            <Grid container columnSpacing={{ md: 4, xl: 3.9 }}>
              <Grid item xs={12} md={6} xl={6}>
                <Creater
                  title={"Proposals"}
                  data={proposals}
                  members={members}
                  daoid={location.state.val.address}
                  Childc={ProposalView}
                  filterCallback={(row, searchTerm)=>{
                    
                    return true //row[0].toLowerCase().includes(searchTerm.toLowerCase())
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <Creater
                  title={"Members"}
                  data={members}
                  Childc={MembersView}
                  filterCallback={(row, searchTerm)=>{
                    return row.toLowerCase().includes(searchTerm.toLowerCase())
                  }}
                />
              </Grid>
            </Grid>
          )}
        </Box>
      </BoxWrapper>
    </React.Fragment>
  );
};

export default Dashboard;
