import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import Models from "../models/models"
import Views from "../views/views"

// data 
let storeCollection;

const Controller = Marionette.Object.extend({

	initialize: function() {
		storeCollection = new Models.storeCollection();
		storeCollection.fetch({
			async: false,			

		});
	},

	showIndex: function() {
		console.log("Controller::showIndex");
		const indexView = new Views.index();
		indexView.render();
	},

	showStores: function() {
		console.log("Controller::showStores");
		const storeListView = new Views.storeList( {collection: storeCollection} );
		storeListView.render();
	},

	showStoreDetail: function(storeId) {
		console.log("Controller::showStoreDetail")
		const store = storeCollection.find({ storeId: storeId });
		const storeDetailView = new Views.storeDetail( {model: store} );
		storeDetailView.render()
	}

});

const Router = Marionette.AppRouter.extend({
	appRoutes: {
		"": "showIndex",
		"stores": "showStores",
		"stores/:storeId": "showStoreDetail"
	},
	controller: new Controller	
});


module.exports = {
	appRouter: Router,
	appController: Controller,
};

