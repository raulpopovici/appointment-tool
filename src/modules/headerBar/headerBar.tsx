import React from 'react';

const HeaderBar = React.lazy(() =>
  import('headerBarApp/Header')
    .then((mod) => mod)
    .catch((err) => {
      console.error('Failed to load HeaderBar module:', err);
      throw err;
    }),
);

export default HeaderBar;
