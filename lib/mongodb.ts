import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI must be defined');
}

// 글로벌 캐시 인터페이스 선언
interface MongooseGlobalCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// NodeJS 글로벌 객체 확장
declare global {
  var mongoose: MongooseGlobalCache | undefined;
}

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

// 전역 캐시 사용
const cached: MongooseGlobalCache = global.mongoose;

async function connectDB(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => mongoose);  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
