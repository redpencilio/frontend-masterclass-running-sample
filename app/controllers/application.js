import Controller from '@ember/controller';
import { action } from  '@ember/object';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

export default class ApplicationController extends Controller {
  @tracked currentAccount

  get isLoginDisabled() {
    return this.currentAccount != null;
  }

  @action
  async login(account) {
    console.log(`Login in ${account.name}`);
    try {
      await fetch('/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/vnd.api+json'
        },
        body: JSON.stringify({
          data: {
            relationships: {
              account:{
                data: {
                  id: account.id,
                  type: 'accounts'
                }
              }
            },
            type: 'sessions'
          }
        })
      });
      this.currentAccount = account;
    } catch (e) {
      this.currentAccount = null;
    }
  }

  @action
  async refreshSession() {
    const response = await fetch('/sessions/current', {
      method: 'GET'
    });
    const session = await response.json();

    if (session.relationships && session.relationships.account) {
      const accountId = session.relationships.account.data.id;
      const account = this.model.find(account => account.id == accountId);
      this.currentAccount = account;
    } else {
      this.currentAccount = null;
    }
  }

  @action
  async logout() {
    await fetch('/sessions/current', {
      method: 'DELETE'
    });
    this.currentAccount = null;
  }
}
