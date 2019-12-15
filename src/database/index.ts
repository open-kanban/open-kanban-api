import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  return mongoose.connect('mongodb://localhost:27017/open-kanban', {
    useNewUrlParser: true,
  });
};
