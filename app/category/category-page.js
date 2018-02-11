var frameModule = require('ui/frame');
var Observable = require('data/observable').Observable;
var ObservableArray = require('data/observable-array').ObservableArray;

var page;
var items = new ObservableArray([]);
var pageData = new Observable();

exports.pageLoaded = function(args) {
  page = args.object;
  page.bindingContext = pageData;

  fetch('https://demo.wp-api.org/wp-json/wp/v2/categories')
    .then(response => {
      return response.json();
    })
    .then(function(r) {
      pageData.set('items', r);
    });
};

exports.showPost = function(args) {
  var navigationEntry = {
    moduleName: './post/post-page',
    animated: true,
    context: { id: args.view.id }
  };
  
  var topmost = frameModule.topmost();
  topmost.navigate(navigationEntry);
};
