import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';

const models = [User];

class Database {
  constructor() {
    this.init();

    const { dialect, host, database } = databaseConfig;

    // eslint-disable-next-line no-console
    console.log(`Connected to ${dialect} database (${database}) on ${host}`);
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
