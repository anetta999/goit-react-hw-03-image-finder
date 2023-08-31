import React, { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
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

    this.setState({
      query: evt.currentTarget.elements.query.value,
      images: [],
      page: 1,
      isLoading: false,
      error: null,
    });

    evt.currentTarget.reset();
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query) {
      try {
        this.setState({ isLoading: true });
        const { hits } = await fetchImagesByQuery(
          this.state.query,
          this.state.page
        );
        this.setState({ images: hits });
        this.setState({ isLoading: false });
        // console.log(images);
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    const { images, isLoading } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSumbit} />
        {isLoading ? <Loader /> : <ImageGallery images={images} />}
        <Button />
        <Modal />
      </div>
    );
  }
}
