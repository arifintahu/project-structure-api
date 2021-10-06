import { verifyToken } from '../helpers/token';
import { NextFunction, Request, Response } from 'express';
import { loginRepository } from '../repositories';

export default async function authorization(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authorization = String(req.headers['x-authorization']);
  if (!authorization || !authorization.includes('Bearer')) {
    res.status(401).send({
      status: false,
      msg: 'unauthorized'
    });
    return;
  }
  const token = authorization?.slice(7);
  const payload = await verifyToken(token).catch(() => {
    res.status(401).send({
      status: false,
      msg: 'unauthorized'
    });
    return;
  });

  if (!payload) {
    res.status(401).send({
      status: false,
      msg: 'unauthorized'
    });
    return;
  }

  loginRepository.findOne(payload.sub).then((userdata) => {
    if (!userdata) {
      res.status(401).send({
        status: false,
        msg: 'unauthorized'
      });
      return;
    }
    req.params.userdata = userdata?.getDataValue('email');

    next();
  });
}
