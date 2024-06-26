import React, { Suspense } from "react";
import Loader from "./loader";

const DynamicImport = (props) => {
  const Component = props.component;
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <Loader loading={true} />
        </div>
      }
    >
      <Component />
    </Suspense>
  );
};
export default DynamicImport;
