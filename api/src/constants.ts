export const PRODUCTION_URL = 'https://craft101.juraffe.dev';

export const FRONT_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? PRODUCTION_URL
    : 'http://localhost:3000';

export const API_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? PRODUCTION_URL
    : 'http://localhost:4000';

export const MC_SERVER_DEFAULT_PORT = 25565;
