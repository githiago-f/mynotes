export const disconnectMiddleware: Express.MyRequestHandler = async (req, res) => {
  if(req.redis)
    await req.redis.disconnect();
};
