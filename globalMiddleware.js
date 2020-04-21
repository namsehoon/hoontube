import routes from "./routes";

export const globalMiddleware = (req, res, next) => {
  res.locals.siteName = "HoonTube";
  res.locals.routes = routes;
  res.locals.user = {
    Authenticated: true,
    id: 1,
  };
  next();
};
