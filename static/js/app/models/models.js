const Store = Backbone.Model.extend({});

const StoreCollection = Backbone.Collection.extend({
	model: Store,
	url: "./static/stores.json"	
});

module.exports = {
	store: Store,
	storeCollection: StoreCollection
}