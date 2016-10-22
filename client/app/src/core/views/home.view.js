import Marionette from "backbone.marionette";
import ListView from "../../views/list.view";
import $ from "jquery";

let HomeView;

HomeView = Marionette.LayoutView.extend({

  template: false,

  el: ".container",

  regions: {
    "list": ".list"
  },

  events: {
  	'click .title' : 'clickEvent'
  },

  initialize(){
    let data = $("#data").data("initial"),
        flowers = new Backbone.Collection(data);

    this.listView = new ListView({collection: flowers});

  	this.getRegion("list").show(this.listView);
  },

  clickEvent : function(){

  	console.log('hello');
  }

});

export default HomeView;