var frameModule = require('ui/frame');

exports.showCategories = function() {
  var navigationEntry = {
    moduleName: './category/category-page',
    animated: true
  };
  var topmost = frameModule.topmost();
  topmost.navigate(navigationEntry);
};
