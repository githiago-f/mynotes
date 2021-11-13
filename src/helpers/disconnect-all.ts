export const disconnectMiddleware: Express.MyRequestHandler = async (req, res, next) => {
  await req.client.disconnect();
  next();
};
