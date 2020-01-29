import Model, { attr, belongsTo } from '@ember-data/model';

export default class OfferModel extends Model {
  @attr availability

  @belongsTo('book') book
}
