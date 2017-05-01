import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import Models from "./models/models";
import Router from "./routers/router";

const app = new Marionette.Application({
  onStart: function() {
  	const router = new Router.appRouter();
	Backbone.history.start();  		
  }
});

app.addInitializer(function() {
	app.on("store:selected", function() {
		console.log("store:selected!")
	});
})


app.start();

app.trigger("store:selected");
