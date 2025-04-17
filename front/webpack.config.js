import path from 'path';
import { fileURLToPath } from 'url';

// Получение текущего каталога
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  mode: 'development', // Установите в 'production' для минификации и оптимизации
  entry: './src/index.tsx', // Ваш главный файл проекта
  output: {
    filename: 'bundle.js', // Имя выходного файла
    path: path.resolve(__dirname, 'dist'), // Путь к выходной директории
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Для .js и .jsx файлов
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Если используете Babel
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Пресеты для Babel
          },
        },
      },
      {
        test: /\.tsx?$/, // Для .ts и .tsx файлов
        exclude: /node_modules/,
        use: 'ts-loader', // Если используете TypeScript
      },
      {
        test: /\.css$/, // Для CSS файлов
        use: ['style-loader', 'css-loader'], // Загрузка стилей
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Для изображений
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Расширения, которые будут автоматически разрешены
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@api': path.resolve(__dirname, 'src/api/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
    },
  },
  devtool: 'source-map', // Генерация sourcemaps для отладки
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // Директория для сервировки
    compress: true, // Включите gzip
    port: 3000, // Порт, на котором будет работать сервер
    open: true, // Открыть в браузере автоматически
  },
};

export default config;