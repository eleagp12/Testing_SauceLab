import { setWorldConstructor } from '@cucumber/cucumber';
import createDriver from '../../utils/driver.js'; // add .js extension for local imports

class CustomWorld {
  constructor() {
    this.driver = createDriver();
  }
}

setWorldConstructor(CustomWorld);
