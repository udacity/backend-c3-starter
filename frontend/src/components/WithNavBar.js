
import React from 'react';
import NavigationMenu from './NavigationMenu';

const WithNavBar = ({ children }) => {
  return (
    <>
      <NavigationMenu />
      {children}
    </>
  );
};

export default WithNavBar;
