import {
  BtnLabel,
  Form,
  Input,
  StyledSearchbar,
  SubmitBtn,
} from './Searchbar.style';
import toast from 'react-hot-toast';
import React, { Component } from 'react';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  handleInputChange = evt => {
    this.setState({ value: evt.currentTarget.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { value } = this.state;

    if (!value.trim()) {
      toast.error('Searchfield cannot be empty, please enter some text', {
        duration: 3000,
      });

      return;
    }

    this.props.onSubmit(value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;

    return (
      <StyledSearchbar>
        <Form onSubmit={this.handleSubmit}>
          <SubmitBtn type="submit">
            <BtnLabel>Search</BtnLabel>
          </SubmitBtn>

          <Input
            className="input"
            type="text"
            value={value}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
          />
        </Form>
      </StyledSearchbar>
    );
  }
}
