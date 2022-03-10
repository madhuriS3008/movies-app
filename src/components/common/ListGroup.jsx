import React from "react";

const ListGroup = (props) => {
  const { genres, textProp, valueProp, selectedGenre, onGenreChange } = props;
  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          key={genre[valueProp]}
          style={{ cursor: "pointer" }}
          className={
            genre === selectedGenre
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onGenreChange(genre)}
        >
          {genre[textProp]}
        </li>
      ))}
    </ul>
  );
};
ListGroup.defaultProps = { textProp: "name", valueProp: "_id" };

export default ListGroup;
