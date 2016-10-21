import Marionette from "backbone.marionette";
import $ from "jquery";

let HomeView;

HomeView = Marionette.ItemView.extend({

  template: false,

  el: ".container",

  events: {
  	'click .title' : 'clickEvent'
  },

  initialize(){
    let data = $("#data").data("initial");

    console.log(data);
  	
  },

  clickEvent : function(){

  	console.log('hello');
  }

});

export default HomeView;