import { TailSpin } from 'react-loader-spinner';
import { StyledLoader } from './Loader.styled';

export const Loader = () => {
  return (
    <StyledLoader>
      <TailSpin
        ariaLabel="loading-indicator"
        height="80"
        width="80"
        radius="10"
        color="green"
      />
    </StyledLoader>
  );
};
