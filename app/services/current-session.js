import Service from '@ember/service';
import fetch from 'fetch';
import { tracked } from '@glimmer/tracking';

class Account {
  constructor(name, id, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}

export default class CurrentSessionService extends Service {
  @tracked currentAccount

  constructor() {
    super(...arguments);
    this.refresh();
  }

  get accounts() {
    return [
      new Account('Jane', '6061ddad-6328-47dd-9991-204320505e8f', 'Curator and owner of the Masterclass library'),
      new Account('John', '651cb045-1638-4619-8386-e93c895cef4e', 'Member of the Masterclass library'),
      new Account('Annie', '74bb08f0-2062-441f-a3af-534b060c4769', 'Member of project Jip en Janneke'),
      new Account('Fiep', 'd1dc5bf2-e8c2-41ef-b006-e6ba1ad4080c', 'Member of project Jip en Janneke'),
      new Account('Jeroen', '8f3cbd4c-ec47-4643-a706-7f37c1004a30', 'Normal user'),
      new Account('Tom', '5264ad54-1cd4-4dc5-8dbc-39ad680da769', 'Normal user'),
      new Account('Daniel', '4015bfe9-3797-4ce3-85e6-d415efb1dc85', 'Member of the Psychology library and member of the Not working project'),
      new Account('David', 'd7d39866-cb7d-41d6-8436-d5ede5116e04', 'Curator, owner of the Psychology library and member of the Not working project')
    ];
  }

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

  async logout() {
    await fetch('/sessions/current', {
      method: 'DELETE'
    });
    this.currentAccount = null;
  }

  async refresh() {
    try {
      const response = await fetch('/sessions/current', {
        method: 'GET'
      });
      const session = await response.json();

      if (session.relationships && session.relationships.account) {
        const accountId = session.relationships.account.data.id;
        const account = this.accounts.find(account => account.id == accountId);
        this.currentAccount = account;
      } else {
        this.currentAccount = null;
      }
    } catch(e) {
      this.currentAccount = null;
    }
  }
}
