import React from "react";

const ListGroup = ({
  genres,
  textProp,
  valueProp,
  selectedGenre,
  onGenreChange,
}) => {
  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          key={genre[valueProp]}
          className={
            genre === selectedGenre
              ? "clickable list-group-item active"
              : "clickable list-group-item"
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
