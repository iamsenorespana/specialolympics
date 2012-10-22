var render = function() {
  var topBanner = nrequire('/templates/views/top_banner'),
     Controller = nrequire('/templates/controllers/videos'),
      BorderShadows = nrequire('/ui/border_shadows');
 
 
 function setYoutubeData(_cb){
 	console.log('Set Youtube Link');
 	var http = nrequire('/lib/http.mod');
 		        http.sendRequest({
		      	method: 'GET',
		      	// server: 'https://gdata.youtube.com/feeds/api/users/SpecialOlympicsHQ/',  
		      	server: 'http://gdata.youtube.com/feeds/api/playlists/',
		      	url: 'PL4803CCBCABF8A993?v=2&alt=json', //'uploads?v=2&alt=json',
		      	success: function(data){
		      		var tableData = [];
		      		for( var i=0;i<data.feed.entry.length;i++ ){
		      			var row = Ti.UI.createTableViewRow({
		      				//leftImage: data.feed.entry[i].media$group.media$thumbnail[0].url,
		      			//	title: data.feed.entry[i].title.$t,
		      				height: 60,
		      				hasChild: true,
		      				weblink: data.feed.entry[i].link[0].href		      				
		      			});
		      				row.add( Ti.UI.createImageView({
		      					height:60, width: 90, image:data.feed.entry[i].media$group.media$thumbnail[0].url,
		      					top: 0, left: 0
		      				}));
		      				
		      				row.add(Ti.UI.createLabel({
		      					text: data.feed.entry[i].title.$t,
		      					left: 95,
		      					top: 5, width: 160, height: Ti.UI.FILL,
		      					font:{
		      						fontSize: 14
		      					}
		      				}));
		      			tableData.push(row);
		      		}
		      		//alert( JSON.stringify(data.feed.entry.length) );
		      		//view.table.setData( tableData );
		      		_cb(tableData);
		      		//console.log( JSON.stringify( tableData ) );
		      	},
		      	error: function(data){
		      		
		      	}
		      });	
 };

       
  var self = {
        win: UI.createWindow({
          navBarHidden: true,
          backgroundImage: '/images/backgrounds/main_bg.png',
          backgroundRepeat: true
        }),

        donate_banner: topBanner.render().view,

        shadow: BorderShadows({ top: 100 }).view,

        table: UI.createTableView({
          top: 100,
           //data: setYoutubeData(),
          backgroundColor: 'transparent',
          style_id: 'list_table'
        })
      };
      
	setYoutubeData( function(data){
		console.log('got data callback' + JSON.stringify(data));
		self.table.setData( data );
	});
      
  self.win.add(self.donate_banner);
  self.win.add(self.shadow);
  self.win.add(self.table);
  
 Controller(self);
  return self;
};

module.exports = {render: render};
