import React, { useEffect, useState } from "react";
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Tabs } from "@mui/base/Tabs";
import { TabsList } from "@mui/base/TabsList";
import {TabPanel} from "@mui/base/TabPanel";
import { buttonClasses } from "@mui/base/Button";
import  { tabClasses, Tab } from "@mui/base/Tab";
import MobileStepper from "@mui/material/MobileStepper";
import CreateDaoNavbar from "../components/CreateDaoNavbar";
import Spinner from "../components/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { Client, Wallet } from "@transia/xrpl";
import Modal from "react-modal";

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};


const StyledTabPanel = styled(TabPanel)(
  ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    padding: 25px;
   
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    border-radius: 12px;
    `
);


const BoxWrapper = styled(Box)({
  padding: "2rem 9rem",

  ".vote-title": {
    fontSize: "38px",
    fontWeight: 700,
    background: "linear-gradient(to right, #ffefba, #ffffff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  ".sub-title": {
    color: "#f5274e",
    fontWeight: 600,
    paddingTop: "12px",
  },
  ".token": {
    background: "linear-gradient(to right, #ee0979, #ff6a00)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: 700,
    paddingLeft: "7px",
  },
  ".vote-description": {
    paddingTop: "13px",
    color: "#f5274e",
    fontSize: "20px",
    fontWeight: 600,
  },
  ".resources-card": {
    background: "#fff",
    borderRadius: "12px",
    padding: "15px",
  },
  ".status-card": {
    background: "#444f5e",
    borderRadius: "12px",
    padding: "20px",
    marginTop: "24px",
  },
  ".parent-image": {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  },
  ".resource-title": {
    color: "#323F4B",
    fontSize: "24px",
    fontWeight: 700,
    textAlign: "center",
  },
  ".status-title": {
    background: "linear-gradient(to right, #ee0979, #ff6a00)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "24px",
    fontWeight: 700,
  },
  ".resource-des": {
    fontSize: "17px",
    color: "#444546",
    paddingTop: "25px",
  },
  ".praposal-btn": {
    borderRadius: "12px",
    background: "#fff",
    color: "#323F4B",
    marginTop: "15px",
    textTransform: "none",
    fontSize: "16px",
    fontWeight: 500,
  },
  ".praposal-btn:hover": {
    background: "#fff",
  },
  ".action-card": {
    background: "#444f5e",
    borderRadius: "12px",
    padding: "24px",
    marginTop: "24px",
  },
  ".action-description": {
    fontSize: "14px",
    color: "#979FA9",
  },
  ".tab-title": {
    textTransform: "capitalize",
    border: "1px solid gray",
    margin: "5px",
    borderRadius: "12px",
    color: "#003AF0",
  },
  ".css-1be5mm1-MuiLinearProgress-root-MuiMobileStepper-progress": {
    borderRadius: "5px",
    background: "#444f5e",
    width: "100%",
    height: "12px",
  },
  ".css-rh92k-MuiPaper-root-MuiMobileStepper-root": {
    backgroundColor: "#444f5e",
  },
  ".css-5xe99f-MuiLinearProgress-bar1": {
    backgroundColor: "#444f5e",

  },
  ".parent-tabs": {
    borderBottom: 1,
    borderColor: "divider",
    display: "flex",
    justifyContent: "space-between",
  },
  ".parent-over": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "25px",
  },
  ".over-btn": {
    textTransform: "none",
    fontSize: "16px",
    borderRadius: "12px",
    background: "#f5274e",

    fontWeight: 500,
    borderRadius: "12px",
    padding: "6px 15px",
    color: "white",
  },
  ".praposal-title": {
    color: "#225C8A",
    fontSize: "14px",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    gap: "7px",
  },
  ".main-title": {
    fontSize: "20px",
    fontWeight: 700,
    paddingTop: "10px",
  },
  ".decision-title": {
    fontSize: "16px",
    fontWeight: 500,
    color: "#63707B",
    padding: "5px 0px",
  },
  ".decision-details": {
    fontSize: "16px",
    fontWeight: 700,
    color: "#323f4B",
    padding: "5px 0px",
  },
});

const VotingPage = () => {
  const location = useLocation();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [publisher, setPublisher] = React.useState(
    "0x3a8094c5a445B296EBdaf9c369A6662A0FDFfB3f"
  );
  const [yesvotes, setyesVotes] = React.useState(0);
  const [showModal, setShowModal] = useState(false)

  const [isLoading, setLoading] = React.useState(false);
  const [txData, setTxData] = React.useState("");
  const [isVoted, setVoted] = React.useState(false);
  const [txHash, setTxHash] = useState("")


  useEffect(() => {
    (async () => {
      const val = location.state.val;
      const members = location.state.members;
      setTitle(val.title);
      setDescription(val.desc);
      setPublisher(val.owner);
      setTxData(val.txData)
      
      setLoading(true)
      fetch(`${process.env.REACT_APP_API}/vote/${val.invoiceId}`).then((res) => res.json() ).then((res)=>{
        const seed= localStorage.getItem('seed')
        const users = res.data.users
        if(users.includes(Wallet.fromSeed(seed).address)){
          setVoted(true)
        }
        setyesVotes(users.length/members.length);
        setLoading(false)
      })
    })();
  }, []);

  return (
    <React.Fragment>
      <CreateDaoNavbar />
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
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
          <h3 className="text-lg font-semibold"> Voted✅</h3>
        
        </div>
        <div className="w-5/6 p-4 overflow-hidden">
          <span>TxHash:</span>
          <a
          className="ml-3 text-ellipsis"
            href={`https://hooks-testnet-v3-explorer.xrpl-labs.com/tx/${txHash}`}
          >
            {txHash}
          </a>
         
        </div>
      </Modal>
      {!showModal && <BoxWrapper sx={{ marginTop: "65px" }}>
        <Typography className="vote-title">{title}</Typography>
        <Typography className="sub-title">
          Published by
          <span className="token">{publisher}</span>
        </Typography>
        <Typography className="vote-description">{description}</Typography>

        <Grid container spacing={0} columnSpacing={3}>
          <Grid item xs={12} md={7} xl={7}>
            {/* for tabs components  */}

            <Card elevation={0} className="action-card">
              <Box>
                <Tabs defaultValue={0}>
                  <Box className="parent-tabs">
                    <Typography className="status-title">Voting</Typography>
                  </Box>
                  <StyledTabPanel value={0}>
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                    

                        <Typography sx={{ color: "#f5274e", fontWeight: 700 }}>
                          {(yesvotes * 100).toFixed(2)}%
                        </Typography>
                      </Box>
                      <MobileStepper
                        variant="progress"
                        steps={102}
                        position="static"
                        activeStep={Math.ceil(yesvotes * 100)}
                      />
                    </Box>
                   

                    {!isVoted && (
                      <Box className="parent-over">
                        <Button onClick={async ()=>{
                            setLoading(true)
                            const val = location.state.val;
                            const seed = localStorage.getItem('seed')
                            const wallet = Wallet.fromSeed(seed)
                            let j = {
                              Account: wallet.address,
                              TransactionType: "Payment",
                              Amount: "1",
                              Destination: val.address,
                              Fee: "100000",
                              InvoiceID:  Buffer.from(val.invoiceId, 'hex').toString('utf-8').split(":")[2].replace("\u0000", "").trim(),
                              NetworkID: 21338,
                            }
                            console.log(j)
                            const client = new Client(
                              "wss://hooks-testnet-v3.xrpl-labs.com/"
                            );
                            await client.connect();
                            const voteTx = await client.autofill(j);
                            const sx = wallet.sign(voteTx);
                            const txRes = await client.submitAndWait(sx.tx_blob);
                            console.log(txRes)
                            await fetch(`${process.env.REACT_APP_API}/vote/${val.invoiceId}/add`, {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({
                                invoiceId: val.invoiceId,
                                address: wallet.address
                              })
                            })
                            setTxHash(txRes.result.hash)
                            setShowModal(true)
                            client.disconnect()
                        }} className="over-btn">
                          {isLoading && <Spinner />}
                          {!isLoading && "Vote"}
                        </Button>
                      </Box>
                    )}
                  </StyledTabPanel>
                </Tabs>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={5} xl={5}>
            <Card elevation={0} className="status-card flex flex-col">
              <Typography
                style={{
                  color: "#f5274e",
                  fontSize: "24px",
                  fontWeight: 700,
                }}
              >
                TxData: 
              </Typography>
              <textarea
                  
                  rows={14}
                  className="appearance-none border text-lg rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={JSON.stringify(txData, null, "\t")}
        
                />
            </Card>
          </Grid>
        </Grid>
      </BoxWrapper>}
    </React.Fragment>
  );
};

export default VotingPage;
