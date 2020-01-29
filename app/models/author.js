import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class AuthorModel extends Model {
  @attr name

  @hasMany('book') books
  @belongsTo('project') project
}
