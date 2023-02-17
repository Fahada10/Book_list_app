import React from "react";

function Form(props) {

function test(){
  console.log("testing")
}

  return (
    <form style={{ marginTop: 25 }}>
      <label style={{ fontSize: 20 }}>
        Book Title<br></br>
        <input
          type="text"
          onChange={props.handleChange}
          name="title"
          value={props.field.title}
          style={{ backgroundColor: "#ffc0cb" }}
        ></input>
      </label>
      <label style={{ fontSize: 20 }}>
        Authur<br></br>
        <input
          type="text"
          onChange={props.handleChange}
          name="authur"
          value={props.field.authur}
          style={{ backgroundColor: "#ffc0cb" }}
        ></input>
      </label>
      <label style={{ fontSize: 20 }}>
        DateAdded<br></br>
        <input
          type="date"
          onChange={props.handleChange}
          name="date"
          value={props.field.date}
          style={{ backgroundColor: "#ffc0cb" }}
        ></input>
      </label>
      <label style={{ fontSize: 20 }}>
        Notes<br></br>
        <textarea
          rows="6"
          cols="40"
          onChange={props.handleChange}
          name="comment"
          value={props.field.comment}
          style={{ backgroundColor: "#ffc0cb" }}
        ></textarea>
      </label>
    </form>
  );
}

export default Form;
