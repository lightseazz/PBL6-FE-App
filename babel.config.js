module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: [
          'react-native-paper/babel',

          
          'react-native-reanimated/plugin', // Reanimated plugin has to be listed last.
        ],
        
      },
    },
  };
};