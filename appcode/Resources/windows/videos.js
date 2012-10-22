module.exports = function() {
  var template = isIPad ? nrequire('/templates/windows/ipad/videos') :
                          nrequire('/templates/windows/videos');
  return template.render();
};
