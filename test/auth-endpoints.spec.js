const knex = require('knex');
const app = require('../src/app');
const jwt = require('jsonwebtoken');
const { makeUsersArray, seedUsers, cleanTables } = require('./test-helpers');

describe('Auth Endpoints', function () {
  let db;
  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('clean the table', () => cleanTables(db).catch(console.log));

  afterEach('cleanup', () => cleanTables(db));

  const users = makeUsersArray();
  const testUser = users[0];

  describe('POST /api/auth/login', () => {
    this.beforeEach('insert users', () => {
      return seedUsers(db, users);
    });

    const requiredFields = ['username', 'password'];

    requiredFields.forEach(field => {
      const loginAttemptBody = {
        username: testUser.username,
        password: testUser.password
      };

      it(`responds with 400 required error when '${field}' is missing`, () => {
        delete loginAttemptBody[field];

        return supertest(app)
          .post('/api/auth/login')
          .send(loginAttemptBody)
          .expect(400, {
            error: `Missing '${field}' in request body`
          });
      });
    });

    it(`responds 200 and JWT auth token using secret when valid credentials`, () => {
      const userValidCreds = {
        username: users[0].username,
        password: users[0].password
      };
      const expectedToken = jwt.sign(
        { first_name: users[0].first_name, last_name: users[0].last_name },
        process.env.JWT_SECRET,
        {
          subject: users[0].username,
          algorithm: 'HS256'
        }
      );
      return supertest(app)
        .post('/api/auth/login')
        .send(userValidCreds)
        .expect(200, {
          authToken: expectedToken
        });
    });
  });
});
