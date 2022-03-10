import React from "react";

const Like = ({ like, onClick }) => {
  let classes = "clickable fa fa-heart";
  classes += like ? "" : "-o";

  return <i onClick={onClick} className={classes} aria-hidden="true"></i>;
};

export default Like;
