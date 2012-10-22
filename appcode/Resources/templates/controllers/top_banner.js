module.exports = function(view) {
  var Repo = nrequire('/lib/repo');
      
  var url = 'https://secure.specialolympics.org/site/c.mlIYIjNZJuE/b.7885525/k.922D/Mobile_Donation/apps/ka/sd/donorcustom.asp',
     mUrl = 'http://www.specialolympics.org/newsletter.aspx',
     
      openDonateLink = function() {
        Ti.Platform.openURL(url);
      },
      
      openMailingListLink = function(){
      	Ti.Platform.openURL( mUrl );
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
          //updateTopbarMessage(e.topbar_message);
          //alert( e.logo_url );
          updateLogo('images/top_logo.png'); //
          url = url; //e.donate_url;
        });
      };

  view.donate_button.addEventListener('click', openDonateLink);
  view.list_button.addEventListener('click', openMailingListLink );
  pullAcsInfo();
};
