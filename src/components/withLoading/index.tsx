import { ReactElement, ComponentType } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface WithLoadingProps {
  isLoading: boolean;
};

const withLoading = (WrappedComponent: ComponentType): Function => {
  return ({ isLoading, ...props }: WithLoadingProps): ReactElement => {  
    return (
      (isLoading) ? <CircularProgress /> : <WrappedComponent {...props} />
    );
  };
};

export default withLoading;
