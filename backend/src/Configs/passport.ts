import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import { User } from '../Models/User/user.model'; // Убедитесь, что путь к вашей модели правильный
import dotenv from 'dotenv';

dotenv.config(); // Для чтения из .env

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string, // Указываем, что переменная не может быть undefined
};

// Определение стратегии
const strategy = new JwtStrategy(
  options,
  async (payload: { id: number }, done) => {
    try {
      // Найти пользователя по id
      const user = await User.findOne({
        where: { id: payload.id },
      });

      if (user) {
        return done(null, user);
      }

      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  },
);

// Инициализация passport с ранее созданной стратегией
passport.use(strategy);

// Экспорт passport
export default passport;
export { passport, strategy };
