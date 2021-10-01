import { expect } from 'chai';
import { findAll } from '../user.service';

describe('User service checks', () => {
  it('User service returns findAll', async () => {
    const result = await findAll();
    expect(result).to.be.an('array');
  });
});
