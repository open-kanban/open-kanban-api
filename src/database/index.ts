import mongoose from 'mongoose';

export const connectToDatabase = async (): Promise<typeof mongoose> => {
  return mongoose.connect('mongodb://localhost:27017/open-kanban', {
    useNewUrlParser: true,
  });
};
