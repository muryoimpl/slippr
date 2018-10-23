import { createGlobalStyle } from 'styled-components';

const PRINT_HEIGHT_WIDE = '166.6mm';
const PRINT_HEIGHT = '209.7mm';
const AspectStyle = createGlobalStyle`
  .p-page-preview::before {
    padding-top: ${props => props.ratio}%;
  }
  .p-page::before {
    padding-top: ${props => props.ratio}%;
  }
  @media screen {
    .p-page__print::before {
      padding-top: ${props => props.ratio}%;
    }
  }
  @media print {
    .p-page__print::before {
      padding-top: ${PRINT_HEIGHT};
    }
  }
  @media print {
    .p-page__print__wide::before {
      padding-top: ${PRINT_HEIGHT_WIDE};
    }
  }
`;

export default AspectStyle;
