export const disconnectMiddleware: Express.MyRequestHandler = async (req, res, next) => {
  if(req.redis)
    await req.redis.disconnect();
  next();
};
