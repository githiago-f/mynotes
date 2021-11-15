export const disconnectMiddleware: Express.MyRequestHandler = async (req, res, next) => {
  if(req.client)
    await req.client.disconnect();
  if(req.sequelize)
    req.sequelize.close();
  next();
};
