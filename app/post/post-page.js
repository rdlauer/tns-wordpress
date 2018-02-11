var frameModule = require('ui/frame');
var pageModule = require('ui/page');
var webViewModule = require('ui/web-view');
var Observable = require('data/observable').Observable;
var ObservableArray = require('data/observable-array').ObservableArray;

var page;
var items = new ObservableArray([]);
var pageData = new Observable();

exports.pageNavigatedTo = function(args) {
  page = args.object;
  page.bindingContext = pageData;

  var id = page.navigationContext.id;

  fetch('https://demo.wp-api.org/wp-json/wp/v2/posts?categories=' + id)
    .then(response => {
      return response.json();
    })
    .then(function(r) {
      pageData.set('items', r);
    });
};

exports.loadWebSite = function(args) {
  var link = args.view.link;

  var factoryFunc = function() {
    var webView = new webViewModule.WebView();
    webView.src = link;
    var page = new pageModule.Page();
    page.content = webView;
    return page;
  };

  var topmost = frameModule.topmost();
  topmost.navigate(factoryFunc);
};
