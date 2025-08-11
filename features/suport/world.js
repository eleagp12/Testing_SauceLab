const { setWorldConstructor } = require('@cucumber/cucumber');
const createDriver = require('../../utils/driver');

class CustomWorld {
  constructor() {
    this.driver = createDriver();
  }
}

setWorldConstructor(CustomWorld);
