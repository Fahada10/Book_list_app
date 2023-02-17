import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Form from "./Form";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { nanoid } from "nanoid";
import axios from "axios";


function Pappers() {
  const [addBook, setAddBook] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [input, setInput] = React.useState({
    title: "",
    authur: "",
    date: "",
    comment: "",
  });

  const [book, setBook] = React.useState([]);

  console.log(book);
  const baseUrl =
    "https://first-project-6dee4-default-rtdb.firebaseio.com/books.json";

  function handleChange(event) {
    setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  function testing(){
    console.log("hello")
  }

  function toggle() {
    setAddBook(true);
  }

  function cancel() {
    setAddBook(false);
    setDone(false);
    setInput({
      title: "",
      authur: "",
      date: "",
      comment: "",
    });
  }

  function erase(id) {
    console.log("erase");
    axios.put( baseUrl,  book.filter((v) => v.id != id));

    setBook((prev) => prev.filter((v) => v.id != id));
  }

  function edit(para) {
    const blah = book.find((v) => v.id === para);

    if (blah) {
      setAddBook(true);
      setDone(true);
      setInput(blah);
    }
  }

  function doneEdit(id) {

    console.log(id)

    axios.put(baseUrl ,  book.map((v) => {
      return v.id === id ? { ...input } : v;
    }) )

    setBook((oldBook) =>
      oldBook.map((v) => {
        return v.id === id ? { ...input } : v;
      })
    );
    setAddBook(false);
    setInput({
      title: "",
      authur: "",
      date: "",
      comment: "",
    });
    setDone(false);
  }

  function addNovel() {
    if (input.title === "") {
      alert("You must update the 'Title'");
    } else {
      setBook([...book, { ...input, id: nanoid() }]);

      axios.put(baseUrl, [...book, { ...input, id: nanoid() }]);

      setAddBook(false);
      setInput({
        title: "",
        authur: "",
        date: "",
        comment: "",
      });
    }
  }
  React.useEffect(() => {
    console.log("running");
    axios.get(baseUrl).then((res) => res.data && setBook(res.data));
  }, []);

  const card = book.map((v) => {
    return (
      
      <Card
        sx={{
          minWidth: 275,
          marginBottom: 3,
          borderRadius: 3,
          backgroundColor: "#E75480",
          textAlign: "left",
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {v.title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {v.authur}
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {v.date}
          </Typography>
          <Typography variant="body2">{v.comment}</Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() => erase(v.id)}
            size="small"
            sx={{ color: "Black" }}
          >
            Delete
          </Button>
          <Button
            size="small"
            onClick={() => edit(v.id)}
            sx={{ color: "Black" }}
          >
            Edit
          </Button>
        </CardActions>
      </Card>
      
    );
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 600,
          height: 700,
          marginTop: 5,
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: "#ffc0cb",
          borderRadius: 3,
        }}
      >
        <Stack direction="column" sx={{ marginBottom: 3 }}>
          <h1 style={{ fontSize: 45, color: "  #4d1400" }}>My Books</h1>

          <Button
            sx={{
              width: 580,
              display: "flex",
              justifyContent: "space-between",
              fontSize: 18,
              backgroundColor: "#802200",
              marginBottom: 5,
              "&:hover": {
                backgroundColor: "#4d1400",
              },
            }}
            variant="contained"
            endIcon={<SendIcon />}
            onClick={toggle}
          >
            Add New Book
          </Button>
          <h2 style={{ fontSize: 35, color: "  #4d1400" }}>
            Read / Want to read
          </h2>
          <div className="card-content" >
          {card}
          </div>
                  </Stack>
      </Paper>

      <Dialog open={addBook} onClose={cancel}>
        <DialogTitle
          sx={{
            backgroundColor: "#4d1400",
            color: "white",
          }}
        >
          Add New Book
        </DialogTitle>
        <DialogContent
          sx={{ width: 500, height: 450, backgroundColor: "#FFB3B3" }}
        >
          <Form field={input} handleChange={handleChange} testing={testing} />
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: "#4d1400",
          }}
        >
          <Button sx={{ fontSize: 18, color: "white" }} onClick={cancel}>
            Cancel
          </Button>

          {done ? (
            <Button
              sx={{ fontSize: 18, color: "white" }}
              onClick={() => doneEdit(input.id)}
            >
              Done
            </Button>
          ) : (
            <Button sx={{ fontSize: 18, color: "white" }} onClick={addNovel}>
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Pappers;
