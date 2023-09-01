import toast, { Toaster } from 'react-hot-toast';
import React, { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImagesByQuery } from '../services/api';
import { Loader } from './Loader/Loader';
import { GlobalStyle } from './Globalstyle';
import { Container } from './Container';
import { GallerySection } from './Section';

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
      toast.error('Searchfield cannot be empty, please enter some text', {
        duration: 3000,
      });

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
      } catch (error) {
        this.setState({ error: true });
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
      <>
        <Searchbar onSubmit={this.handleSumbit} />
        <GallerySection>
          <Container>
            {isLoading && <Loader />}
            {error &&
              !isLoading &&
              toast.error(
                'Something went wrong, please try reloading the page',
                {
                  duration: 5000,
                }
              )}
            {images.length > 0 && !isLoading && (
              <ImageGallery images={images} />
            )}
            {images.length > 0 && page < lastPage && !isLoading && (
              <Button onLoadMore={this.handleLoadMore} />
            )}
          </Container>
        </GallerySection>
        <GlobalStyle />
        <Toaster position="top-right" />
      </>
    );
  }
}
