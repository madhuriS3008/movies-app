import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

import { deleteMovie, getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/ListGroup";
import MoviesTable from "./MoviesTable";
import SearchBox from "./common/SearchBox";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 5,
    currentPage: 1,
    genres: [],
    selectedGenre: "",
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  deleteMovieHandler = async (movie) => {
    const orignalMovies = this.state.movies;
    const movies = orignalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    } catch (e) {
      if (e.response && e.response.status === 404)
        toast.error("This movie has already been deleted.");

      this.setState({ movies: orignalMovies });
    }
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
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  sortHandler = (sortColumn) => {
    this.setState({ sortColumn });
  };

  searchHandler = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  pageData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { movies, totalCount: filtered.length };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    const { user } = this.props;

    if (count === 0) return <p>There are no movies in database.</p>;

    const { movies, totalCount } = this.pageData();

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
          {user && (
            <Link to="/movies/new" className="btn btn-primary mb-3">
              New Movie
            </Link>
          )}
          <p>There are {totalCount} movies in the database.</p>
          <SearchBox value={searchQuery} onChange={this.searchHandler} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.likeHandler}
            onDelete={this.deleteMovieHandler}
            onSort={this.sortHandler}
          />
          <Pagination
            itemsCount={totalCount}
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
