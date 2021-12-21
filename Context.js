import React, { createContext, useContext, useState } from "react";

const ImageContext = createContext({});

export const ImageProvider = ({ children }) => {
  const [newLocalImage, setNewLocalImage] = useState(null);

  return (
    <ImageContext.Provider value={[newLocalImage, setNewLocalImage]}>
      {children}
    </ImageContext.Provider>
  );
};

export default function useImage() {
  return useContext(ImageContext);
}
