export const corsConig = {
  origin: ["http://localhost:5173"],
  headers: ["Authorization", "Content-Type"],
  additionalHeaders: ["x-requested-with"],
  exposedHeaders: ["WWW-Authenticate", "Server-Authorization"],
  maxAge: 86400,
  credentials: true,
};
