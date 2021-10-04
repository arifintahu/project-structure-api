import { verifyToken } from '../helpers/token';
import { NextFunction, Request, Response } from 'express';
import { loginRepository } from '../repositories';

export default async function authorization(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.includes('Bearer')
  ) {
    res.status(401).send({
      status: false,
      msg: 'unauthorized'
    });
  }
  const token = String(req.headers.authorization?.slice(7));
  const payload = await verifyToken(token).catch(() => {
    res.status(401).send({
      status: false,
      msg: 'unauthorized'
    });
  });

  if (!payload) {
    res.status(401).send({
      status: false,
      msg: 'unauthorized'
    });
  }

  loginRepository.findOne(payload.sub).then((userdata) => {
    if (!userdata) {
      res.status(401).send({
        status: false,
        msg: 'unauthorized'
      });
    }
    req.params.userdata = userdata?.getDataValue('email');

    next();
  });
}
