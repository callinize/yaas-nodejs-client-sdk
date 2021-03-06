'use strict';

var pathCartBase = '/hybris/cart/v1/{{projectId}}/carts';

var Cart = function(rh) {
	this.requestHelper = rh;

	this.create = function(customerNumber, currency, siteCode) {
		var cart = {
			'currency': currency,
			'siteCode': siteCode
		};

		if (customerNumber) { // cart belongs anonymous customer if no customerId set
			cart.customerId = customerNumber;
		}

		return this.requestHelper.post(pathCartBase, 'application/json', cart);
	};

	this.getCart = function(cartId) {
		return this.requestHelper.get(pathCartBase + '/' + cartId);
	};

	this.mergeCart = function(cartId, sourceCartIds) {
		return this.requestHelper.post(pathCartBase + '/' + cartId + '/merge',
		'application/json',
		{
			carts: sourceCartIds
		});
	};

	this.deleteCartItem = function(cartId, itemId) {
		return this.requestHelper.delete(pathCartBase + '/' + cartId + '/items/' + itemId);
	};

	this.deleteCart = function(cartId) {
		return this.requestHelper.delete(pathCartBase + '/' + cartId);
	};

	this.getByCriteria = function(queryParameters) {
		return this.requestHelper.get(pathCartBase, queryParameters);
	};

	this.addProduct = function(cartId, product, quantity, price) {
		return this.requestHelper.post(
			pathCartBase + '/' + cartId + '/items',
			'application/json',
			{
				price: price,
				quantity: quantity,
				product: product
			}
		);
	};

  this.addDiscount = function(cartId, coupon) {
    return this.requestHelper.post(
      pathCartBase + '/' + cartId + '/discounts',
      'application/json',
      coupon
    );
  };

	this.clearCart = function(cartId) {
		return this.requestHelper.delete(pathCartBase + '/' + cartId + '/items');
	};
};

module.exports = Cart;
