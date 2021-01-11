import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

function getConnectionString(): string {
  switch (process.env.NODE_ENV) {
    case 'production':
      return process.env.MONGO_CONNECTION_STRING_PRODUCTION!;
    case 'testing':
      return process.env.MONGO_CONNECTION_STRING_TESTING!;
    default:
      return process.env.MONGO_CONNECTION_STRING_DEVELOPMENT!;
  }
}

mongoose
  .connect(getConnectionString(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .catch((error) => {
    console.log('There was a problem connecting to the database.');
    if (error instanceof Error) {
      console.log(`Error message: ${error.message}`);
    }
  });
