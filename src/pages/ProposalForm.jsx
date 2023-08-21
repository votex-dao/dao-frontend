import React, {  useState } from "react";
import { Box, Button, Card, Typography, styled } from "@mui/material";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import CreateDaoNavbar from "../components/CreateDaoNavbar";
import Spinner from "../components/Spinner";
import { encode } from "ripple-binary-codec";
import { Client, Wallet, xrpToDrops } from "@transia/xrpl";
import hexlify_memos from "../utils/hexlify_memos";
import Modal from "react-modal";


const BoxWrapper = styled(Box)({
  ".form-textarea": {
    width: "100%",
    border: "2px solid #E4E7EB",
    borderRadius: "12px",
    padding: "13px 16px",
    background: "#fff",
    marginTop: "18px",
  },
  ".form-textarea::placeholder": {
    fontSize: "16px",
    color: "#A6ACB7",
  },
  ".form-field": {
    width: "100%",
    border: "2px solid #E4E7EB",
    borderRadius: "12px",
    marginTop: "15px",
    padding: "13px 16px",
    background: "#fff",
  },
  ".field-title": {
    fontSize: "18px",
    fontWeight: 700,
    color: "#4D5863",
  },
  ".field-subTitle": {
    fontSize: "14px",
    color: "#67747F",
    paddingTop: "3px",
  },
  ".caracter-count": {
    color: "#67747F",
    fontSize: "14px",
    paddingTop: "12px",
  },
  ".main-field": {
    paddingTop: "2rem",
  },
  ".next-step": {
    textTransform: "none",
    fontSize: "16px",
    borderRadius: "12px",
    background: "#f5274e",
    fontSize: "17px",
    fontWeight: 500,
    borderRadius: "12px",
    padding: "6px 15px",
    color: "white",
  },
  ".error": {
    color: "red",
    fontSize: "16px",
  },
  ".main-propasal-card": {
    width: "650px",
    borderRadius: 30,
    padding: "25px 55px 21px 22px",
    marginTop: "20px",
    background: "#F5F7FA",
  },
  ".parent-proposal": {
    display: "flex",
    justifyContent: "center",
  },
  ".flow-select": {
    width: "106%",
    border: "2px solid #E4E7EB",
    // borderRadius: '12px',
    // padding: '1px 16px',
    background: "#fff",
  },
});

const ProposalForm = () => {
  const [characterCount, setCaracterCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setLoader] = useState(false);
  const DisplayingErrorMessagesSchema = Yup.object().shape({
    title: Yup.string().required("proposal-title is Required"),
    description: Yup.string().required("Description is Required"),
  });

  const [selectedOption, setSelectedOption] = useState("simple");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false)
  const [txHash, setTxHash] = useState("")

  const options = [
    { label: "Simple Payment", value: "simple" },
    { label: "Advanced", value: "advanced" },
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const OptionToggle = ({ options, selectedOption, onSelect }) => {
    return (
      <div className="flex space-x-4 mb-4">
        {options.map((option) => (
          <button
            key={option.value}
            className={`${
              selectedOption === option.value
                ? "next-step"
                : "bg-gray-200 text-gray-700"
            } py-2 px-4 rounded focus:outline-none  focus:shadow-outline`}
            onClick={() => onSelect(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  };

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
          <h3 className="text-lg font-semibold"> Proposal created ✅</h3>
        
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
      {!showModal && <BoxWrapper sx={{ paddingTop: "50px", fontSize: "50px" }}>
        <div className="parent-proposal">
          <Card className="main-propasal-card" elevation={0}>
            <Formik
              initialValues={{
                title: "",
                description: "",
                custom_payment: "",
                amount: "",
              }}
              validationSchema={DisplayingErrorMessagesSchema}
            >
              {({ errors, touched, values, handleChange }) => (
                <Form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setLoader(true);

                    const seed = localStorage.getItem("seed");
                    const wallet = Wallet.fromSeed(seed);
                    let proposed_txn = {};
                    let raw_ptxn = {}
                    if (selectedOption === "simple") {
                      proposed_txn = {
                        TransactionType: "Payment",
                        Account: location.state.address,
                        Destination: wallet.address,
                        Amount: xrpToDrops(values.amount),
                        LastLedgerSequence: "4000000000",
                        Fee: "10000",
                      };
                      raw_ptxn = proposed_txn
                      proposed_txn = encode(proposed_txn);
                    } else {
                      raw_ptxn = proposed_txn
                      proposed_txn = encode(JSON.parse(values.custom_payment))
                    }
                    let j = {
                      Account: wallet.address,
                      TransactionType: "Payment",
                      Amount: "1",
                      Destination: location.state.address,
                      Fee: "100000",
                      NetworkID: 21338,
                      Memos: [
                        {
                          Memo: {
                            MemoData: proposed_txn,
                            MemoFormat: "unsigned/payload+1",
                            MemoType: "notary/proposed",
                          },
                        },
                      ],
                    };
                    hexlify_memos(j)
                    const client = new Client(
                      "wss://hooks-testnet-v3.xrpl-labs.com/"
                    );
                    await client.connect();
                    const Tx = await client.autofill(j);
                    const sx = wallet.sign(Tx);
                    const txRes = await client.submitAndWait(sx.tx_blob);
                    console.log(txRes)
                    setShowModal(true)
                    setTxHash(txRes.result.hash)
                    console.log(txRes.result.hash)
                    const invoiceId = txRes.result.meta.HookExecutions[0].HookExecution.HookReturnString
                    await fetch(`${process.env.REACT_APP_API}/dao/${location.state.address}/add`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        invoiceId,
                        title: values.title,
                        desc: values.description,
                        txData: raw_ptxn,
                        owner: wallet.address
                      })
                    })
                    setLoader(false)
                    client.disconnect()
             
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <Box>
                      <Typography className="field-title">
                        Proposal Title
                      </Typography>
                      <Typography className="field-subTitle">
                        Maximum of 128 characters
                      </Typography>
                      <Field
                        name="title"
                        className="form-field"
                        value={values.title}
                        onChange={(e) => {
                          handleChange(e);
                          setCaracterCount(e.target.value.length);
                        }}
                        placeholder="Type your Proposal title..."
                      />
                      <Typography className="caracter-count">
                        {characterCount}/128
                      </Typography>
                      <ErrorMessage name="title">
                        {(msg) => <div className="error">{msg}</div>}
                      </ErrorMessage>
                    </Box>

                    <Box className="main-field">
                      <Typography className="field-title">
                        Description
                      </Typography>
                      <Typography className="field-subTitle">
                        Describe your Proposal in a few sentences.
                      </Typography>
                      <Field
                        as="textarea"
                        rows={7}
                        name="description"
                        className="form-textarea"
                        value={values.description}
                        onChange={handleChange}
                        placeholder="Type your summary..."
                      />
                      <ErrorMessage name="description">
                        {(msg) => <div className="error">{msg}</div>}
                      </ErrorMessage>
                    </Box>
                    <Box className="my-2">
                      <OptionToggle
                        options={options}
                        selectedOption={selectedOption}
                        onSelect={handleOptionSelect}
                      />
                      {selectedOption === "simple" && (
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-1"
                            htmlFor="amount"
                          >
                            Amount
                          </label>
                          <Field
                            name="amount"
                            className="form-field"
                            value={values.amount}
                            onChange={handleChange}
                            placeholder="Enter Amount..."
                          />
                        </div>
                      )}
                      {selectedOption === "advanced" && (
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-1"
                            htmlFor="description"
                          >
                            Advanced Tx Data
                          </label>
                          <Field
                            as="textarea"
                            rows={7}
                            name="custom_tx"
                            className="form-textarea"
                            value={values.custom_payment}
                            onChange={handleChange}
                            placeholder="Custom transaction json"
                          />
                        </div>
                      )}
                    </Box>
                    <div
                      style={{
                        marginTop: "20px",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button type="submit" className="next-step">
                        {" "}
                        {isLoading && <Spinner />}
                        {!isLoading && "Create"}
                      </Button>
                    </div>
                  </Box>
                </Form>
              )}
            </Formik>
          </Card>
        </div>
      </BoxWrapper>}
    </React.Fragment>
  );
};

export default ProposalForm;
