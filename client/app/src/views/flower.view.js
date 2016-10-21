import Marionette from "backbone.marionette";
import flower from "../templates/flower.jade";

let FlowerView;

FlowerView = Marionette.ItemView.extend({

  template: flower,

  className: "flower",

  tagName: "div"

});

export default FlowerView;
