import jwt from 'jsonwebtoken';
import { Authentication } from '.';
import makeJWTAuthentication from './jwt-authentication';

jest.mock('jsonwebtoken');

describe('JWT authentication', () => {
  const mockedVerifyToken = jwt.verify as jest.Mock<Record<string, string>>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('throws if given token is empty', () => {
    expect(() => makeJWTAuthentication('')).toThrow('Invalid token');
  });

  describe('Authenticate', () => {
    let jwtAuthentication: Authentication;

    beforeEach(() => {
      mockedVerifyToken.mockReturnValue({ userId: 'userId' });
      jwtAuthentication = makeJWTAuthentication('to.ke.n');
    });

    it('verifies the given token', () => {
      jwtAuthentication.authenticate();
      expect(mockedVerifyToken).toBeCalledWith('to.ke.n', 'secret');
    });

    it('throws if token verification fails', () => {
      mockedVerifyToken.mockImplementation(() => {
        throw new Error('Failed');
      });
      expect(() => jwtAuthentication.authenticate()).toThrow('Not authorized');
    });

    it('returns the user ID from the verified token', () => {
      expect(jwtAuthentication.authenticate()).toEqual('userId');
    });
  });
});
