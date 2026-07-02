import test from 'node:test';
import assert from 'node:assert/strict';
import { me, updateProfile } from '../controllers/authController.js';
import User from '../models/User.js';

// Setup environment secret for JWT token generation
process.env.JWT_SECRET = '7f3b9a2c1d8e4f6a9b1c5d7e8f0a2b4c';

const originalUserMethods = {
  findById: User.findById,
  findOne: User.findOne,
};

function restoreUserStubs() {
  User.findById = originalUserMethods.findById;
  User.findOne = originalUserMethods.findOne;
}

test.beforeEach(() => {
  restoreUserStubs();
});

test.after(() => {
  restoreUserStubs();
});

function mockRes() {
  return {
    statusCode: 200,
    body: undefined,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
}

function mockUser(overrides = {}) {
  return {
    _id: 'user-123',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'hashedpassword',
    role: 'student',
    matchPassword: async function (pwd) {
      return pwd === 'correctpassword';
    },
    save: async function () {
      return this;
    },
    ...overrides,
  };
}

test('GET /auth/me returns the current user payload', async () => {
  const req = {
    user: {
      _id: 'user-123',
      name: 'Demo User',
      email: 'demo@example.com',
      role: 'student',
    },
  };
  const res = mockRes();

  await me(req, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body.user, {
    id: 'user-123',
    name: 'Demo User',
    email: 'demo@example.com',
    role: 'student',
  });
});

test('PUT /auth/profile updates name and email successfully', async () => {
  const user = mockUser();
  const req = {
    user: { _id: 'user-123' },
    body: { name: 'New Name', email: 'new@example.com' },
  };
  const res = mockRes();

  User.findById = async () => user;
  User.findOne = async () => null; // Email not taken

  await updateProfile(req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.user.name, 'New Name');
  assert.equal(res.body.user.email, 'new@example.com');
  assert.ok(res.body.token);
});

test('PUT /auth/profile rejects if email is already taken', async () => {
  const user = mockUser();
  const req = {
    user: { _id: 'user-123' },
    body: { name: 'New Name', email: 'taken@example.com' },
  };
  const res = mockRes();

  User.findById = async () => user;
  User.findOne = async () => ({ _id: 'user-456', email: 'taken@example.com' }); // Email taken by someone else

  await updateProfile(req, res);

  assert.equal(res.statusCode, 400);
  assert.match(res.body.message, /Email is already taken/i);
});

test('PUT /auth/profile updates password successfully with valid current password', async () => {
  const user = mockUser();
  const req = {
    user: { _id: 'user-123' },
    body: { currentPassword: 'correctpassword', newPassword: 'newsecurepassword' },
  };
  const res = mockRes();

  User.findById = async () => user;

  await updateProfile(req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(user.password, 'newsecurepassword');
});

test('PUT /auth/profile rejects password update with invalid current password', async () => {
  const user = mockUser();
  const req = {
    user: { _id: 'user-123' },
    body: { currentPassword: 'wrongpassword', newPassword: 'newsecurepassword' },
  };
  const res = mockRes();

  User.findById = async () => user;

  await updateProfile(req, res);

  assert.equal(res.statusCode, 400);
  assert.match(res.body.message, /Incorrect current password/i);
});
