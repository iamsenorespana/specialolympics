var Cloud = require('ti.cloud');

exports.getContent = function(){
	var data = {
		founders: null,
		mission: null,
		about: null
	};
	
	Cloud.Objects.query({classname: 'CMS', page: 1, per_page: 10}, 
		function(e) {
			//alert( JSON.stringify( e ));
          if ( e.success ) {
          	var count = e.CMS.length;
          	for( var i=0;i<count;i++){
          		switch( e.CMS[i].title ){
          			case 'Founders':
          				data.founders = e.CMS[i].content;
          			break;
          			case 'Mission':
          				data.mission = e.CMS[i].content;
          			break;
          			case 'About':
          				data.about = e.CMS[i].content;
          			break;
          		}
          	}
          	
          	return data;
          	//console.log( JSON.stringify( e.CMS[0].title ));
          } else {
          	alert("Error getting the pages!");
          }  
          //Ti.App.fireEvent('hide_activity');
		}
	);
	
	
};
