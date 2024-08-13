const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssScss = require('postcss-scss');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: 'https://sealkimm.github.io/test2/', // 웹서버의 루트 디렉토리로 설정
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'nunjucks-html-loader',
            options: {
              searchPaths: ['./src/@inc'], // 템플릿 파일의 경로 설정
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // CSS를 별도 파일로 추출
          'css-loader', // CSS를 CommonJS로 변환
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // CSS를 별도 파일로 추출
          'css-loader', // CSS를 CommonJS로 변환
          'sass-loader', // SCSS를 CSS로 컴파일
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: (pathData) => {
            // 원본 경로를 유지하면서 'img' 폴더로 이동
            const filePath = pathData.filename.replace(/^src\//, '');
            return filePath;
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/main.html', // main index
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/about.html',
      filename: 'sub/about.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/brands.html',
      filename: 'sub/brands.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/franchise.html',
      filename: 'sub/franchise.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/contact.html',
      filename: 'sub/contact.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/brand.html',
      filename: 'sub/brand.html',
    }),
    new StylelintPlugin({
      files: './src/scss/**/*.scss',
      // configFile: '.stylelintrc',
      fix: true, // 자동 수정 기능을 활성화
      customSyntax: postcssScss,
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css', // 추출된 CSS 파일의 이름
    }),
  ],
  devServer: {
    // 뭔지 보고 필요없는거 지우기!!!!!!
    static: {
      directory: path.join(__dirname, 'dist'), // 정적 파일 제공 경로
    },
    compress: true,
    port: 9000, // 개발 서버 포트
    host: '0.0.0.0', // 모든 네트워크 인터페이스에서 접근 가능
    client: {
      // 브라우저 URL을 설정합니다
      webSocketURL: {
        hostname: 'localhost',
        port: 9000,
        pathname: '/ws',
        protocol: 'ws',
      },
    },
    watchFiles: ['src/**/*.html', 'src/**/*.js', 'src/**/*.scss'], // 파일 변경 시 자동 리로드
  },
};
