import React, { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImagesByQuery } from '../services/api';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
  };

  handleSumbit = evt => {
    evt.preventDefault();
    const searchQuery = evt.currentTarget.elements.query.value;

    if (!searchQuery.trim()) {
      alert('Searchfield cannot be empty, please enter some text');
      return;
    }

    this.setState({
      query: searchQuery,
      images: [],
      page: 1,
      isLoading: false,
      error: false,
      totalHits: 0,
    });

    evt.currentTarget.reset();
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.query !== prevState.query ||
      this.state.page !== prevState.page
    ) {
      try {
        this.setState({ isLoading: true, error: false });
        const { hits, totalHits } = await fetchImagesByQuery(
          this.state.query,
          this.state.page
        );
        this.setState({ images: hits, totalHits: totalHits });

        // console.log(images);
      } catch (error) {
        this.setState({ error: true });
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isLoading, error, page, totalHits } = this.state;
    const lastPage = Math.ceil(totalHits / 12);

    return (
      <div>
        <Searchbar onSubmit={this.handleSumbit} />
        {isLoading && <Loader />}
        {error && <p>Something went wrong, please try reloading the page</p>}
        {images.length > 0 && <ImageGallery images={images} />}
        {images.length > 0 && page < lastPage && !isLoading && (
          <Button onLoadMore={this.handleLoadMore} />
        )}
      </div>
    );
  }
}
