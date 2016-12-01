var gm = require('gm');
var imageMagick = gm.subClass({imageMagick : true});

exports.CreateThumbnail= function(imagePath, newWidth, newHeight,callback){
	
	
	gm(imagePath).thumb(newWidth, newHeight, "../public/images/thumbs"+imagePath.replace(/^.*[\\\/]/,''),70,function(err, stdout){
		callback({
			stdout:stdout,
			err:err
		}); 
	}); 
};
