import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class OffersController extends Controller {
  @action
  markOutOfStock(offer) {
    offer.availability = 'http://schema.org/OutOfStock';
    offer.save();
  }

  @action
  markInStock(offer) {
    offer.availability = 'http://schema.org/InStock';
    offer.save();
  }
}
