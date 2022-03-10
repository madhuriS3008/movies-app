import React, { Component } from "react";

import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/Like";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/ListGroup";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 5,
    currentPage: 1,
    genres: [],
    selectedGenre: "",
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  deleteMovieHandler = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  likeHandler = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };

  pageChangeHandler = (page) => {
    this.setState({ currentPage: page });
  };

  genreSelectHandler = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      genres,
      selectedGenre,
    } = this.state;

    if (count === 0) return <p>There are no movies in database.</p>;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            genres={genres}
            selectedGenre={selectedGenre}
            onGenreChange={this.genreSelectHandler}
          />
        </div>
        <div className="col">
          <p>There are {filtered.length} movies in the database.</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <th scope="row">{movie.title}</th>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      like={movie.like}
                      onClick={() => this.likeHandler(movie)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => this.deleteMovieHandler(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.pageChangeHandler}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
