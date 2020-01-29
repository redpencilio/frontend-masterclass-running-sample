import Controller from '@ember/controller';
import { action } from  '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service currentSession

  get isLoginDisabled() {
    return this.currentSession.currentAccount != null;
  }

  @action
  async login(account) {
    await this.currentSession.login(account);
    window.location.reload();
  }

  @action
  async logout() {
    await this.currentSession.logout();
    window.location.reload();
  }
}
