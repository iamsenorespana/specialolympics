
var sessionOBJ = {
	accessKeyId : null, //To be initalized via the authorize method
	secretKey : null	//To be initalized via the authorize method
};

var Flickr = exports ? exports : {};

Flickr.authorize=function(api_key, secret) {
	sessionOBJ.accessKeyId=api_key;
	sessionOBJ.secretKey=secret;
}

Flickr.getPublicPhotos=function(params, onSuccess, onError){
	//http://api.flickr.com/services/rest/?format=json&method=flickr.people.getPublicPhotos&api_key=&secret=&per_page=5&jsoncallback=test&user_id=
	var url="http://api.flickr.com/services/rest/?format=json";
	url=url+"&method=flickr.people.getPublicPhotos";
	url=url+"&api_key="+ sessionOBJ.accessKeyId;
	url=url+"&secret="+sessionOBJ.secretKey;
	url=url+"&per_page="+params.perPage;
	url=url+"&jsoncallback=cb";
	url=url+"&user_id="+params.userId;
	
	
	Ti.API.info('Accessing URL - '+url);
	
	var client = Ti.Network.createHTTPClient({
	     onload : function(e) {
	     	var response=this.responseText;
	     	var len=response.length
	     	response=response.substr(3,len-4); //Strip the Callback method supplied
	     	if (onSuccess) {
	     		picStream=JSON.parse(response);
	     		
	     		var imageSet=[];

	     		for (var c=0;c<picStream.photos.photo.length;c++){
	     			var photo=picStream.photos.photo[c];
	     			// http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
	     			var photoUrl='http://farm'+photo.farm;
	     			photoUrl=photoUrl+".staticflickr.com/"+photo.server;
	     			photoUrl=photoUrl+"/"+photo.id;
	     			photoUrl=photoUrl+"_"+photo.secret;
	     			
	     			var image={};
	     			image.id=photo.id;
	     			image.urls={
	     				square_75: photoUrl+"_s.jpg",
	     				thumb_100: photoUrl+"_t.jpg",
	     				small_240: photoUrl+"_m.jpg",
	     				medium_500: photoUrl+"_-.jpg",
	     				medium_640: photoUrl+"_z.jpg", 
	     				large_1024: photoUrl+"_b.jpg",
	     				original: photoUrl+"_b.jpg",
	     			}
	     			imageSet.push(image);
	     		}
	     		onSuccess(imageSet);
	     	}
	     		
     	},
	     onerror : function(e) {
    	     Ti.API.debug(e.error);
    	     if (onError)
    	     	onError(e.error);
     	},
     	timeout : 5000  // in milliseconds
 	});
 	client.open("GET", url);
 	client.send(); 
}