export default {
  history: 'hash',
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      title: 'react-pc-template',
      routes: {
        exclude: [
          /model\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /models\//,
          /components\//,
          /services\//,
        ],
      },
    }],
  ],
};
