var render = function() {
	var topBanner = nrequire('/templates/views/top_banner'), Controller = nrequire('/templates/controllers/events'), BorderShadows = nrequire('/ui/border_shadows');

	var self = {
		win : UI.createWindow({
			navBarHidden : true,
			backgroundImage : '/images/backgrounds/main_bg.png',
			backgroundRepeat : true
		}),

		donate_banner : topBanner.render().view,

		btn : UI.createButton({
			top : 1,
			right : 2,
			title : "Change Locaton"
		}),

		shadow : BorderShadows({
			top : 47
		}).view,

		table : UI.createTableView({
			top : 47,
			backgroundColor : 'transparent',
			style_id : 'list_table'
		}),

		picker : Ti.UI.createPicker({
			bottom : 5
		}),

		xml_rss : function(url) {
			// create table view data object
			var data = [];

			var xhr = Ti.Network.createHTTPClient();
			Ti.API.info(url);

			var len = url.length;
			url = url.substr(1, len - 2);

			Ti.API.info(url);
			xhr.open("GET", url);
			xhr.onerror = function(e) {
				alert('in error' + JSON.stringify(e));
			}
			xhr.onload = function() {
				try {
					var doc = this.responseXML.documentElement;
					var items = doc.getElementsByTagName("title");

					var x = 0;

					for (var c = 0; c < items.length; c++) {
						var item = items.item(c);

						var title = items.item(c).text;
						var row = Ti.UI.createTableViewRow({
							height : 45
						});
						var label = Ti.UI.createLabel({
							text : title,
							left : 5,
							top : 5,
							bottom : 5,
							right : 5,
							font : {
								fontFamily : 'Quaver Sans',
								fontSize : '14'
							}
						});
						row.add(label);
						data[x++] = row;
						//row.url = item.getElementsByTagName("link").item(0).text;
					}

					self.table.setData(data);

				} catch(E) {
					alert(E);
				}
			};
			xhr.send();

		}
	};

	self.btn.addEventListener('click', function() {
		self.picker.visible = true;
		var icon = Titanium.Filesystem.getFile('feeds.json');
		var c = icon.read();
		var c1 = JSON.parse(c);

		//alert(JSON.stringify(c1.locations_list.length));
		var data = [];
		for (var count = 0; count < c1.locations_list.length; count++) {
			data[count] = Ti.UI.createPickerRow({
				title : c1.locations_list[count].location,
				links : c1.locations_list[count].news_feed
			});

		}
		self.picker.add(data);
		self.picker.selectionIndicator = true;

		//http://www.specialolympics.org/ResultsRSS.aspx?Delegation=MA.SO%20Yemen
		self.picker.addEventListener('change', function(e) {

			self.xml_rss(JSON.stringify(e.row.links));
			self.picker.visible = false;

		});
		self.win.add(self.picker);
	});

	//self.win.add(self.donate_banner);
	self.win.add(self.btn);
	self.win.add(self.shadow);
	self.win.add(self.table);

	Controller(self);
	return self;
};

module.exports = {
	render : render
};
