const path = require('path'); // Импортируем модуль "path" для работы с путями файлов
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/indexRouter.js', // Точка входа для сборки проекта

  output: {
    filename: 'bundle.js', // Имя выходного файла сборки
    path: path.resolve(__dirname, 'dist'), // Путь для выходного файла сборки
  },

  module: {
    rules: [
      {
        test: /\.css$/, // Регулярное выражение для обработки файлов с расширением .css
        use: ['style-loader', 'css-loader'], // Загрузчики, используемые для обработки CSS-файлов
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/About.html',
      inject: true,
      chunks: ['About'],
      filename: 'About.html',
    }),

    new HtmlWebpackPlugin({
      template: './src/enter_task.html',
      inject: true,
      chunks: ['enter_task'],
      filename: 'enter_task.html',
    }),

    new HtmlWebpackPlugin({
      template: './src/f1.html',
      inject: true,
      chunks: ['f1'],
      filename: 'f1.html',
    }),

    new HtmlWebpackPlugin({
      template: './src/Main.html',
      inject: true,
      chunks: ['Main'],
      filename: 'Main.html',
    }),

    new HtmlWebpackPlugin({
      template: './src/Projects.html',
      inject: true,
      chunks: ['Projects'],
      filename: 'Projects.html',
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Каталог для статики
    },
    open: true, // Автоматически открывать браузер
  },

  mode: 'development', // Режим сборки
};
