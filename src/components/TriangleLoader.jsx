import React from 'react';
import { Triangle } from "react-loader-spinner";

const TriangleLoader = () => {
  return (
    <Triangle
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        data-testid="triangle-loading-animation"
        wrapperClass=""
    />
  )
};

export default TriangleLoader;