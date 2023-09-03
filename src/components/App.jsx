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
    isLoading: false,
    error: false,
    totalHits: 0,
  };

  handleSumbit = value => {
    this.setState({
      query: `${Date.now()}/${value}`,
      images: [],
      page: 1,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.query !== prevState.query ||
      this.state.page !== prevState.page
    ) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    try {
      this.setState({ isLoading: true, error: false });
      const { hits, totalHits } = await fetchImagesByQuery(
        this.state.query.slice(14),
        this.state.page
      );
      if (!hits.length) {
        toast.error(
          'No images found matching your search query, please change your request and try again',
          {
            duration: 5000,
          }
        );

        return;
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        totalHits: totalHits,
      }));
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isLoading, error, totalHits } = this.state;
    const lastPage = Math.ceil(totalHits / images.length);

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
            {images.length > 0 && <ImageGallery images={images} />}
            {images.length > 0 && lastPage > 1 && !isLoading && (
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
