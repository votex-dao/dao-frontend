import React, { useState } from "react";
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
  TableRow,
  Paper,
  TablePagination,
  Card,
  Button
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { KeyboardArrowRight } from "@mui/icons-material";

const CssTextField = styled(TextField)({
  color: "white",
  fontWeight: "bold",
  "& label": {
    color: "white",
    fontWeight: "bold",
  },
  "& input": {
    color: "white",
    fontWeight: "bold",
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

const TContainer = styled(TableContainer)({
  backgroundColor: "transparent",
  boxShadow: "none",
});

const TCell = styled(TableCell)({
  borderBottom: "none",
});

const MTablePage = styled(TablePagination)({
  "& .MuiTablePagination-actions": {
    color: "white",
    background: "#f5274e",
    borderRadius: "10px",
    fontWeight: "bold",
  },
  "& .MuiTablePagination-displayedRows": {
    color: "white",
    fontWeight: 400,
  },
});

const BoxWrapper = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  ".dao-title": {
    fontSize: "28px",
    fontWeight: 700,
    background: "linear-gradient(to right, #ffefba, #ffffff)",
    "WebkitBackgroundClip": "text",
    "WebkitTextFillColor": "transparent",
  },
});

const DataTable = ({ title, daoid, data, ChildC, filterCallback, members }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  /*
  ( (row) =>
    row.toLowerCase().includes(searchTerm.toLowerCase())
  );
  */
  const filteredData = data.filter((row) => filterCallback(row, searchTerm))
  return (
    <Box>
      <BoxWrapper>
        <Typography className="dao-title">{title}</Typography>

        <CssTextField
          label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          sx={{ mb: 2, padding: "2px" }}
        />
      </BoxWrapper>

      <TContainer component={Paper}>
        <Table>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredData
            ).map((row, index) => (
              <TableRow key={index}>
                <TCell>
                  <ChildC daoid={daoid} item={row} members={members}/>
                </TCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TContainer>
      <MTablePage
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        rowsPerPageOptions={[]}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        color={"red"}
      />
    </Box>
  );
};

export default DataTable;
