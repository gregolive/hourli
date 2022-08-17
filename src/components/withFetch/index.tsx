import { useState, useEffect, ReactElement, ComponentType } from 'react';
import axios from 'axios';

const withFetch = (WrappedComponent: ComponentType, url: string): Function => {
  return (props: any): ReactElement => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
      const config = { headers: { 'content-type': 'multipart/form-data' }, withCredentials: true };

      axios.get(url, config)
        .then((res) => {
          setData(res.data.shifts);
          setIsLoading(false);
        }, (err) => {
          setIsLoading(false);
          setIsError(true);
        });
    });

    return (
      <WrappedComponent
        data={data}
        isLoading={isLoading}
        isError={isError}
        {...props}
      />
    );
  };
};

export default withFetch;
