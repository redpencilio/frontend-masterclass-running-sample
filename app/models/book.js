import Model, { attr, hasMany } from '@ember-data/model';

export default class BookModel extends Model {
  @attr title
  @attr isbn

  @hasMany('author') authors
  @hasMany('offer') offers
}
