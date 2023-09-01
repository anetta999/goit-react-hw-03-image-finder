import {
  BtnLabel,
  Form,
  Input,
  StyledSearchbar,
  SubmitBtn,
} from './Searchbar.style';

export const Searchbar = ({ onSubmit }) => {
  return (
    <StyledSearchbar>
      <Form onSubmit={onSubmit}>
        <SubmitBtn type="submit">
          <BtnLabel>Search</BtnLabel>
        </SubmitBtn>

        <Input
          className="input"
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </StyledSearchbar>
  );
};
