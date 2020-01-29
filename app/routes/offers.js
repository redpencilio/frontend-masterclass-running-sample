import Route from '@ember/routing/route';

export default class OffersRoute extends Route {
  model() {
    return this.store.query('offer', {
      page: {
        size: 100
      }
    });
  }
}
