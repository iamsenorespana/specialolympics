 
function fnAboutUS() {
	var scroll = Ti.UI.createScrollView({
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		backgroundColor : 'transparent',
		layout : 'vertical'
	});

	var title = Ti.UI.createLabel({
		text : 'About Us',
		top : 20,
		left : 20,
		height : Ti.UI.SIZE,
		style_id : 'h1'
	});
	var profile_view = Ti.UI.createView({
		layout : 'horizontal',
		top : 10,
		left : 10,
		right : 20,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});

	var photo_container = Ti.UI.createView({
		left : 0,
		top : 50,
		width : 173,
		height : 124,
		backgroundImage : "/images/backgrounds/about_mobile_featured_img_bg.png",
		style_id : 'about_photo_container'
	});

	var photo = Ti.UI.createImageView({
		height : "85%",
		top : 4,
		style_id : 'about_photo'
	});

	var share_view = Ti.UI.createView({
		layout : 'vertical',
		left : 10,
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE
	});

	var tweet_button = Ti.UI.createButton({
		width : 103,
		height : 37,
		square : true,
		backgroundImage : '/images/buttons/about_mobile_twitter_share_btn.png',
		backgroundSelectedImage : '/images/buttons/about_mobile_twitter_share_btn_p.png',
		style_id : 'twitter_share_button'
	});

	var fb_button = Ti.UI.createButton({
		top : 10,
		width : 103,
		height : 37,
		square : true,
		backgroundImage : '/images/buttons/about_mobile_fb_share_btn.png',
		backgroundSelectedImage : '/images/buttons/about_mobile_fb_share_btn_p.png',
		style_id : 'fb_share_button'
	});

	var content = Ti.UI.createLabel({
		top : 10,
		left : 20,
		right : 20,
		style_id : 'p4'
	});

	scroll.add(title);
	$.vRightContainer.add(scroll);
	
	photo_container.add(photo);
	profile_view.add(photo_container);
	share_view.add(tweet_button);
	share_view.add(fb_button);
	profile_view.add(share_view);
	$.vRightContainer.add(profile_view);
	$.vRightContainer.add(content);

};

function fnFounders() {
	alert('click1');

};

function fnMission() {
	alert('click2');

};
 

// Pulling Data for About Page
var cloud = require('cloud.mod');
var content = cloud.getContent();
// exposes content.about, content.mission, content.founders
 

// open window
$.index.open();


