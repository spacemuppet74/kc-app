import React from "react";

const DebugJson = ({ object }) => {
  return <pre>{JSON.stringify(object, null, 2)}</pre>;
};

export default DebugJson;
