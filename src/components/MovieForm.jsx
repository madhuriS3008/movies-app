import React from "react";

const MovieForm = ({ match, history }) => {
  const saveHandler = () => {
    history.push("/");
  };
  return (
    <>
      <h1>Movie Form {match.params.id} </h1>
      <button onClick={saveHandler} className="btn btn-primary btn-sm">
        Save
      </button>
    </>
  );
};

export default MovieForm;
