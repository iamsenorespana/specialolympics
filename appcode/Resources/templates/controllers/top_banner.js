module.exports = function(view) {
  var Repo = nrequire('/lib/repo');
      
  var url = 'https://secure.specialolympics.org/site/c.mlIYIjNZJuE/b.7885525/k.922D/Mobile_Donation/apps/ka/sd/donorcustom.asp',
  
      openDonateLink = function() {
        Ti.Platform.openURL(url);
      },
  
      updateTopbarMessage = function(val) {
        if(!isIPad) { return; }
        if(val) { view.title_message.text = val; }
      },
  
      updateLogo = function(val) {
        if(val) { view.logo.image = val; }
      },
  
      pullAcsInfo = function() {
        Repo.getTopBarMessageAndLogoAndDonateUrl(function(e){
          updateTopbarMessage(e.topbar_message);
          updateLogo(url); //e.logo_url
          url = url; //e.donate_url;
        });
      };

  view.donate_button.addEventListener('click', openDonateLink);
  pullAcsInfo();
};
