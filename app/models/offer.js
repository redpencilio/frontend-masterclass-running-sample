import Model, { attr, belongsTo } from '@ember-data/model';

export default class OfferModel extends Model {
  @attr availability

  @belongsTo('book') book

  get isInStock() {
    return this.availability == 'http://schema.org/InStock';
  }
}
