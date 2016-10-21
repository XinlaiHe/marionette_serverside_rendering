import Marionette from "backbone.marionette";
import FlowerView from "./flower.view";
import flowers from "../templates/flowers.jade";

let ListView;

ListView = Marionette.CollectionView.extend({

  template: flowers,

  className: "flowers",

  tagName: "div",

  childView: FlowerView,

  initialize: function(){
  	
  }

});

export default ListView;