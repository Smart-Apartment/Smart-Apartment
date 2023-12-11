import styled from "styled-components";

export const GridPerson = styled.div`
 
  &::after {
    content: "";
    position: relative;
    display: block;
    flex-shrink: 0;
    width: calc(50vw - 160px);
    height: 1px;
  }

  > button {
    margin-right: 40px;
  }

  > button:not(:first-child) {
    visibility: visible; /* switch to 'visible' */
  }
`;
