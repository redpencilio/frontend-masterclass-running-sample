import Model, { attr, hasMany } from '@ember-data/model';

export default class ProjectModel extends Model {
  @attr name

  @hasMany('author') authors
}
