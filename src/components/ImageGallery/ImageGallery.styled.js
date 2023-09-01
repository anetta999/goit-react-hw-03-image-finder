import styled from 'styled-components';

export const GalleryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  margin-bottom: 60px;
`;

export const GalleryListItem = styled.li`
  flex-basis: calc((100% - 16px * 2) / 3);
  box-shadow: 0px 1px 6px rgba(46, 47, 66, 0.08),
    0px 1px 1px rgba(46, 47, 66, 0.16), 0px 2px 1px rgba(46, 47, 66, 0.08);
  border-radius: 0px 0px 4px 4px;

  transition: transform ease-in 250ms;

  &:is(:hover, :focus) {
    transform: scale(1.02);
  }
`;
