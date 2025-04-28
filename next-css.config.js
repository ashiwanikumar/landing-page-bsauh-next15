// This file provides additional CSS configuration
// It will be loaded by Next.js internally

module.exports = {
  cssModules: {
    // Enable CSS Modules for all SCSS files
    auto: true,
    // Use a simpler naming pattern to avoid issues
    getLocalIdent: (context, localIdentName, localName) => {
      return localName;
    },
  },
};
