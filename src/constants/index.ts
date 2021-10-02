const PORT: number = parseInt(<string>process.env.PORT, 10) || 3000;
const API: string = <string>process.env.API || 'api/v1';
const JWT_SECRET: string = <string>process.env.JWT_SECRET || 'j!89nKO5as&Js';

export { PORT, API, JWT_SECRET };
