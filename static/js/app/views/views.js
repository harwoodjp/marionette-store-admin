import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import Router from "../routers/router";
import Models from "../models/models"

// data
let storeCollection = new Models.storeCollection();		

const IndexView = Marionette.ItemView.extend({
	el: "#app",	
	events: {
		"click #stores": "showStoreList"
	},
	showStoreList: function(e) {
	    console.log("IndexView::showStoreList");
		e.preventDefault();
		Backbone.history.navigate("stores");
		storeCollection.fetch();
		const storeListView = new StoreListView( {collection: storeCollection} );
		storeListView.render();
	},
	template: require("../templates/index.html"),
	
})

const StoreDetailView = Marionette.ItemView.extend({
	el: "#app",
	template: require("../templates/store-detail.html")
})

const StoreItemView = Marionette.ItemView.extend({
	tagName: "li",
	template: require("../templates/store-item.html")
})


const StoreListView = Marionette.CompositeView.extend({
	childView: StoreItemView,
	childViewContainer: "ul",	
	el: "#app",
	events: {
		"click .store-list-item": "showStoreDetail"
	},
	showStoreDetail: function(e) {
	    console.log("StoreListView::showStoreDetail");
		e.preventDefault();	   
	    const targetStoreId = e.target.dataset.id;	
		Backbone.history.navigate(`stores/${targetStoreId}`);	    	 
		storeCollection.fetch();
		const store = this.collection.findWhere({ storeId: targetStoreId });
		const storeDetailView = new StoreDetailView( {model: store} );
		storeDetailView.render()
	},
	template: require("../templates/store-list.html")	
})

module.exports = {
	index: IndexView,
	storeList: StoreListView,
	storeDetail: StoreDetailView
}