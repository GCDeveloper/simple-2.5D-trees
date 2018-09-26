(function () {
	'use strict';
	//request animation frames for all browsers/platforms with setTimeout fallback
	window.requestAnimFrame = (function(){
	  return  window.requestAnimationFrame       ||
			  window.webkitRequestAnimationFrame ||
			  window.mozRequestAnimationFrame    ||
			  window.oRequestAnimationFrame      ||
			  window.msRequestAnimationFrame     ||
			  function( callback ){
				window.setTimeout(callback, 1000 / 30);//30 times per second
			  };
	})();
	//capture any errors found when running the program, push them to console and give alert box if G.blnDebug is true
	window.onerror = function(msg) {
		console.warn("Error: "+msg);
		alert("Error: " + msg);
	};
	//force remove scrolling (if they cannot be disabled by other means), (set back to 0, 0).
	window.onscroll = function(){
		console.log("Scrolled!, setting scroll to 0, 0");
		window.scrollTo(0, 0);
	};
	//Adding 'swap' method for Arrays to swap two values in an array
	Array.prototype.swap = function (a,b) {
	  var c = this[a];
	  this[a] = this[b];
	  this[b] = c;
	  return this;
	};
	Array.prototype.containsObject = function(obj){
		var i = 0;
		var len = this.length;
		var obj = JSON.stringify(obj);
		var blnContains = false;
		for(i=0;i<len;i++){
			if(JSON.stringify(this[i]) == obj){
				i = len;
				blnContains = true;
			}
		}
		return blnContains;
	};
	//contain code in a variable, so global variables cannot be interfered, all vars and functions for the app are within the MINDMAP anonymous function scope
	var TREES = (function(){
		//DECLARATIONS
		var blnAllowLoop = false;
		var blnAlerts = false;
		var blnInitialized = false;
		var currentWidth = null;
		var currentHeight = null;
		var currentAverage = null;
		var canvasBack = null;
		var canvasMid = null;
		var canvasTop = null;
		var ctxBack = null;
		var ctxMid =  null;
		var ctxTop = null;
		var MAX = 0;
		var MIN = 0;
		var numTextSize = 12;
		var strFont = "Arial";
		//Images
		var dirImages = "images/";
		var images = {
			numLoaded: 0,
			totalToLoad: 1,
			loadAll: function(){
				//init();

				var i = 0;
				var prop;
				var img;
				for(prop in images.directories){
					img = images.directories[prop];
					images.data[prop] = new Image();
					images.data[prop].onload = function(){
						images.numLoaded++;
						if(images.numLoaded == images.totalToLoad){
							//initialize app after all images loaded
							init();
						}
					}
					images.data[prop].src = dirImages+img;
				}

			},
			//provide directories of images here, and update the totalToLoad
			directories: {
				tree0: "tree_bark_texture_s.png"
			},
			data: {
			}
		};
		//mobile/tablet settings
		var device = {
			isMobile: undefined,
			forceInitDelay: 5,//Number of seconds to wait before forcing initialization if device ready doesn't fire.
			//For mobile devices, this fires when the device is ready and native device features can be used.
			onReady: function(){
				clearTimeout(TO_forceInit);
				if(blnAlerts){
					alert("Device ready");
				}
				console.log("Device ready");
				//begin initializing game
				images.loadAll();
			},
			isMobileOrTablet: function() {
				var check = false;
				(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
				return check;
			}
		};
		var TO_forceInit;//timeout to force initialization if deviceready not fired in certain time
		var offset = {x:0,y:0};
		var CALC = {
			pointHitsLineSegment: function(point, lineA, lineB, radius){
				var blnHit = false;
				var posADist = CALC.dist(point, lineA);
				var posBDist = CALC.dist(point, lineB);
				var lineLength = CALC.dist(lineA, lineB);
				var distToLineCrude = ((posADist+posBDist)-lineLength);
				var distToLine = CALC.distToLine(point, lineA, lineB);
				if(radius != undefined){
					point.radius = radius;
				} else {
					if(point.radius == undefined){
						point.radius = mouse.radius;
					}
				}
				if(distToLineCrude < point.radius){
					if(distToLine < point.radius){
						blnHit = true;
					}
				}
				return blnHit;
			},
			distToLine: function (point, lineA, lineB){
				return Math.abs((lineB.y-lineA.y)*point.x-(lineB.x-lineA.x)*point.y+lineB.x*lineA.y-lineB.y*lineA.x)/Math.sqrt(Math.pow(lineB.y-lineA.y, 2)+Math.pow(lineB.x-lineA.x, 2));
			},
			//checks if point is within a rectangle
			pointHitsRect: function(objPoint, objRect){
				var blnHit = false;
				if(objPoint.x>=objRect.x && objPoint.x<=objRect.x+objRect.width){
					if(objPoint.y>=objRect.y && objPoint.y<=objRect.y+objRect.height){
						blnHit = true;
					}
				}
				return blnHit;
			},
			//checks if two rectangles intersect
			rectsIntersect: function(r1, r2){
				return !((r2.x > (r1.x+r1.width)) ||
			   ((r2.x+r2.width) < r1.x) ||
			   (r2.y > (r1.y+r1.height)) ||
			   ((r2.y+r2.height) < r1.y));
			},
			// checks if a point is within a circle
			pointHitsCircle: function(objPoint, objCircle) {
				var distSq = (((objPoint.x - objCircle.x) * (objPoint.x - objCircle.x)) + ((objPoint.y - objCircle.y) * (objPoint.y - objCircle.y)));
				var radiusSq =  (objCircle.radius * objCircle.radius);
				return (distSq < radiusSq);
			},
			// checks if two circles are touching
			circleHitsCircle: function(circleA, circleB) {
				var distSq = (((circleA.x - circleB.x) * (circleA.x - circleB.x)) + ((circleA.y - circleB.y) * (circleA.y - circleB.y)));
				var radiiSq = ((circleA.radius + circleB.radius) * (circleA.radius + circleB.radius));
				return (distSq < radiiSq);
			},
			//vector includes: x, y, angle in radians, distance
			vectorHitsCircle: function(objVector, objCircle){

			},
			//get the x,y coords at the end of a vector (provide start x,y,angle, and distance in pixels and radians)
			getVectorEnd: function(objVector){
				return {
					x: objVector.x+Math.sin(objVector.angle)*objVector.dist,
					y: objVector.y+Math.cos(objVector.angle)*objVector.dist
				};
			},
			//check if a point is touching a vector
			pointHitsVector: function(objVector, objPoint){
				var newVector = objVector;
				newVector.dist = CALC.dist(objVector, objPoint);
				if(Math.abs(newVector.dist) < (Math.abs(objVector.dist))){
					return (getVectorEnd(newVector) == objPoint);
				} else {
					return false;
				}
			},
			toRadians: function(numDegrees){
				   return (((numDegrees)/180)*Math.PI);
			},
			toDegrees: function(numRadians){
				   return (((numRadians)*180)/Math.PI);
			},
			dist: function(pointA, pointB){
					return Math.sqrt(((pointA.x-pointB.x)*(pointA.x-pointB.x))+((pointA.y-pointB.y)*(pointA.y-pointB.y)));
			},
			distSq: function(pointA, pointB){
					return (((pointA.x-pointB.x)*(pointA.x-pointB.x))+((pointA.y-pointB.y)*(pointA.y-pointB.y)));
			},
			//get angle in radians between two points
			getAngle: function(pointA, pointB){
				return Math.atan2(pointB.y-pointA.y, pointB.x-pointA.x);
			}
		};
		var DRAW = {
			//which context to use e.g. ctxBack, ctxMid, ctxTop
			ctx: null,
			copy: function(sctx, sx,sy,w,h, dctx, dx,dy){
				var imgData=sctx.getImageData(sx, sy, sw, sh);
				dctx.putImageData(imgData,dx,dy);
			},
			circle: function(objCircle) {
				DRAW.ctx.arc(objCircle.x, objCircle.y, objCircle.radius, 0,  Math.PI * 2);
			},
			vector: function(objVector){
				DRAW.ctx.moveTo(objVector.x, objVector.y);
				DRAW.ctx.lineTo(CALC.getVectorEnd(objVector));
			},
			//draws a shape at position xpos,ypos with numSide lines (e. 3 for triangle), at numSize pixels widths and height, at rotation numRotation
			regularShape: function(xPos, yPos, numSides, numSize, numRotation){
				var i = 0;
				DRAW.ctx.moveTo(xPos+Math.sin((i/numSides)*Math.PI*2+numRotation)*numSize, yPos+Math.cos((i/numSides)*Math.PI*2+numRotation)*numSize);
				for(i = 0;i<numSides+1;i++){
					DRAW.ctx.lineTo(xPos+Math.sin((i/numSides)*Math.PI*2+numRotation)*numSize, yPos+Math.cos((i/numSides)*Math.PI*2+numRotation)*numSize);
				}
			},
			multilineText: function(string, x, y, size, maxWidth, lineHeight) {
				var words = '';
				var line = '';
				var n = 0;
				var testLine;
				var metrics;
				var testWidth;
				var lineHeight = lineHeight;
				if(maxWidth == undefined){
					DRAW.ctx.fillText(string, x, y);
				} else {
					words = strinsplit(' ');
					line = '';
					n = 0;
					lineHeight = lineHeight;
					if(lineHeight == undefined){
						lineHeight = size+2;//default line height;
					}
					for(n = 0; n < words.length; n++) {
					  testLine = line + words[n] + ' ';
					  metrics = DRAW.ctx.measureText(testLine);
					  testWidth = metrics.width;
					  if (testWidth > maxWidth && n > 0) {
						DRAW.ctx.fillText(line, x, y);
						line = words[n] + ' ';
						y += lineHeight;
					  }
					  else {
						line = testLine;
					  }
					}
					DRAW.ctx.fillText(line, x, y);
				}
			},
			image: function(imgName, xPos, yPos, numWidth, numHeight, startClipX, startClipY){
				if(xPos == undefined){
					console.warn("image has undefined x");
					xPos = 0;
				}
				if(yPos == undefined){
					console.warn("image has undefined y");
					yPos = 0;
				}
				if(startClipX == undefined || startClipY == undefined){
					DRAW.ctx.drawImage(imgName, xPos, yPos, numWidth, numHeight);
				} else {
					DRAW.ctx.drawImage(imgName, startClipX, startClipY, numWidth, numHeight, xPos, yPos, numWidth, numHeight);
				}
			}
		};
		function onWindowLoaded(){
			device.isMobile = device.isMobileOrTablet();
			console.log("Window loaded");
			if(blnAlerts){
				alert("Window loaded");
			}
			if(device.isMobile){
				console.log("This device is a mobile/tablet");
				if(blnAlerts){
					alert("This device is a mobile/tablet");
				}
				document.addEventListener("deviceready", device.onReady, false);
				//won't initialize unless mobile.onReady fires or timeout reached
				TO_forceInit = setTimeout(images.loadAll(), device.forceInitDelay*1000);
			} else {
				console.log("This device is not a mobile/tablet");
				if(blnAlerts){
					alert("Not a mobile or tablet");
				}
				images.loadAll();
			}
		};
		function onWindowResized(){
			//only resize if the game has been initialised
			if(blnInitialized){
				resize();
			}
		};
		//used in sort code of arrays to sort numbers correctly
		//useage: array.sort(sortNumber);
		function sortNumber(a,b) {
			return a - b;
		};
		function sortByDist(a,b) {
			return a.dist - b.dist;
		};
		var sound = new Howl({
		  urls: ['sounds/dings.mp3'],
		  sprite: {
			ding0: [0, 750],
			ding1: [755, 780],
			ding2: [1540, 740],
			ding3: [2290, 850],
			ding4: [3150, 880],
			ding5: [4055, 915],
			ding6: [4990, 920],
			ding7: [5910, 910],
			ding8: [6830, 800],
			ding9: [7630, 910]
		  }
		});
			var mouse = {
			dragDist: 0,
			position: {x:0, y:0},
			downPos: {x:0,y:0},
			releasePos: {x:0,y:0},
			offset: {x:0,y:0},
			releaseOffset: {x:0,y:0},
			down: false,
			downTime: 0,
			dragging: false,
			released: true,
			radius: 16,
			updatePosition: function(event){
				return {x: (event.pageX),y:(event.pageY)};
			},
			getOffset: function(){
				mouse.offset = {x:mouse.position.x-offset.x, y:mouse.position.y-offset.y};
				return mouse.offset;
			},
			getReleaseOffset: function(){
				mouse.releaseOffset = {x:mouse.releasePos.x-offset.x, y:mouse.releasePos.y-offset.y};
				return mouse.offset;
			},
			onDblClick: function(){
				console.log("Double clicked");
				if(gameState == "Editor"){
					entities.data.pop();
					entities.data.pop();
					gameState = "Main";
					DRAW.ctx = ctxBack;
					DRAW.ctx.fillStyle = groundGradient;
					DRAW.ctx.fillRect(0, currentHeight*0.62, currentWidth, currentHeight*0.4);
					DRAW.ctx = ctxTop;
					DRAW.ctx.clearRect(0, 0, currentWidth, currentHeight);
					DRAW.ctx.fillStyle = treeGradient;
					ctxTop.save();
					ctxTop.setTransform(scaleX,0,0,scaleY,0,0);
					DRAW.ctx.fillRect(0,0,currentWidth*invScaleX,(currentHeight)*invScaleY);
					ctxTop.restore();
					//ctxTop.setTransform(-scaleX,0,0,-scaleY,0,0);
				} else if(gameState == "Main"){
					DRAW.ctx = ctxMid;
					DRAW.ctx.clearRect(0, 0, currentWidth, currentHeight);
					DRAW.ctx = ctxTop;
					//DRAW.ctx.setTransform(scaleX,0,0,scaleY,0,0);
					DRAW.ctx.clearRect(0, 0, currentWidth, currentHeight);
					//DRAW.ctx.setTransform(-scaleX,0,0,-scaleY,0,0);
					DRAW.ctx = ctxBack;
					//DRAW.ctx.clearRect(0, 0, currentWidth, currentHeight);
					editor.backG.draw(DRAW.ctx);
					gameState = "Editor";
					blnAllowLoop = false;
				}
				updateState(gameState);
			},
			onDown: function(){
				var btn;
				mouse.dragDist = 0;//CALC.dist(mouse.getOffset(), mouse.downPos);
				mouse.downPos = mouse.getOffset();
				//create point
				if(gameState == "Editor"){
					if(CALC.pointHitsRect(mouse.downPos, editor.tools)){
						blnAllowLoop = false;
						for(btn in editor.tools.buttons){

						}
					} else {
						entities.create({name:"Tree", x:mouse.downPos.x, y:mouse.downPos.y, radius:Math.random()*2.5+1, colour:{r:(105+Math.random()*20-10), g:(50+Math.random()*20-10), b:(20+Math.random()*20-10)}, randNum:1});
						updateState(gameState);
					}
				}
				if(blnAllowLoop == false && blnRequestingFrame == false){
					blnAllowLoop = true;
					loop();
				}
				//reset mouse.released to false
				mouse.released = false;
			},
			onDrag: function(){

				mouse.dragDist = CALC.dist(mouse.getOffset(), mouse.downPos);
				if(mouse.dragDist > 0){
					mouse.dragging = true;
				}
				/*
				entities.player.angle = CALC.getAngle(entities.player, mouse.position);
				entities.player.lAngle = (entities.player.angle-entities.player.fov/2);
				entities.player.rAngle = (entities.player.angle+entities.player.fov/2);

				updateState(gameState);
				*/
			},
			onMove: function(){
				/*
				entities.player.angle = CALC.getAngle(entities.player, mouse.position);
				//entities.player.x = mouse.position.x;
				//entities.player.y = mouse.position.y;
				entities.player.lAngle = (entities.player.angle-entities.player.fov/2);
				entities.player.rAngle = (entities.player.angle+entities.player.fov/2);
				updateState(gameState);
				*/
				if(blnAllowLoop == false && blnRequestingFrame == false){
					blnAllowLoop = true;
					loop();
				}
			},
			onReleased: function(){
				mouse.released = true;
				mouse.releasePos = mouse.getOffset();
				if(mouse.dragging){
					mouse.dragging = false;
				}
				blnAllowLoop = false;
			},
			//these events fire on certain events (we try to standardize the differences between the two, but need test on many mobiles)
			setListeners: function(blnMobile){
				if(blnMobile){
					// listen for touch events
					window.addEventListener('touchstart', function(e) {
							mouse.position = mouse.updatePosition(e.touches[0]);
							mouse.down = true;
							mouse.downTime = 0;
							mouse.onDown();
					  //  e.preventDefault(); - use this to stop default behaviour on html elements such as dragging, selecting text etc.
						//if(mouse.released === false){

						//}
					}, false);
					window.addEventListener('touchmove', function(e) {
						e.preventDefault();//we dont want it to drag and select text or it will cause bad behaviour (we can look into making this enable selection of text)
						mouse.position = mouse.updatePosition(e.touches[0]);
						if(mouse.down){
							mouse.onDrag();
						}
					}, false);
					window.addEventListener('touchend', function(e) {
					   // e.preventDefault();
						mouse.down = false;
						mouse.downTime = 0;
						mouse.onReleased();
					}, false);
				} else {
					 window.addEventListener('mousedown', function(e) {
					   // e.preventDefault();
						mouse.position = mouse.updatePosition(e);
						mouse.down = true;
						mouse.downTime = 0;
						mouse.onDown();
					}, false);
					window.addEventListener('mousemove', function(e) {
						e.preventDefault();
						mouse.position = mouse.updatePosition(e);
						if(mouse.down){
							mouse.onDrag();
						} else {
							mouse.onMove();
						}
					}, false);
					window.addEventListener('mouseup', function(e) {
					   // e.preventDefault();
						mouse.position = mouse.updatePosition(e);
						mouse.down = false;
						mouse.downTime = 0;
						mouse.onReleased();

					}, false);
					window.addEventListener('dblclick', function(e) {
					   // e.preventDefault();
						mouse.position = mouse.updatePosition(e);
						mouse.down = false;
						mouse.downTime = 0;
						mouse.onDblClick();

					}, false);
				}
			}
		};
		var groundGradient;
		var treeGradient;
		/*
		groundGradient; = ctxBack.createLinearGradient(currentWidth/2, currentHeight, currentWidth/2, currentHeight*0.63);
		groundGradient.addColorStop(0,"rgb(34,51,0)");
		groundGradient.addColorStop(1,"#000000");
		*/
		var entities = {
			data: [],
			player: {},
			create: function(settings){
				settings.randNum = Math.random();
				this.data.push(settings);
			}
		};
		var gameState = "Editor";
		var numTrees = ((window.innerWidth+window.innerHeight)/2)*0.2;
		var invScaleX;
		var invScaleY;
		var scaleX;
		var scaleY;
		//initialize the app
		function init(){
			var i = 0;
			var len = numTrees;
			var grad;
			var rx;// = rectW/Math.sqrt(2);
			var ry;// = rectH/Math.sqrt(2);
			var cx;// = rectW/2;
			var cy;// = rectH/2;
			//blnfirefox = (navigator.userAgent.toLowerCase().indexOf('firefox') > -1);
			//get canvases and contexts
			canvasBack = document.getElementById('canvasBack');
			ctxBack = canvasBack.getContext('2d');
			canvasMid = document.getElementById('canvasMid');
			ctxMid = canvasMid.getContext('2d');
			canvasTop = document.getElementById('canvasTop');
			ctxTop = canvasTop.getContext('2d');
			resize();
			//groundGradient = ctxBack.createRadialGradient(currentWidth/2, currentHeight*2, currentHeight, currentWidth/2, currentHeight*2, currentHeight*0.5);
			groundGradient = ctxBack.createLinearGradient(currentWidth/2, currentHeight, currentWidth/2, currentHeight*0.6);
			groundGradient.addColorStop(0,"rgb(34,51,0)");
			groundGradient.addColorStop(1,"rgb(0,0,0)");
			//treeGradient = ctxTop.createRadialGradient(currentWidth/2, currentHeight, currentWidth*2, currentWidth/2, 0, currentWidth);
			//treeGradient.addColorStop(0,"rgba(0,0,0,0)");
			//treeGradient.addColorStop(1,"rgba(0,0,0,255)");
			//resize canvases to screen
			/*

			*/
			rx = currentWidth/Math.sqrt(2);
			ry = currentHeight/Math.sqrt(2);
			cx = currentWidth/2;
			cy = currentHeight/2;

			//If rx or ry is zero, this doesn't create much of a gradient, but we'll allow it in the code, just in case.
			//we will handle these zero lengths by changing them to 0.25 pixel, which will create a gradient indistinguishable from
			//just a solid fill with the outermost gradient color.
			if(rx == 0){
				rx = 0.25;
			}
			if(ry == 0){
				ry = 0.25;
			}
			//we create a circular gradient, but after transforming it properly (by shrinking in either the x or y direction),
			//we will have an elliptical gradient.
			if (rx >= ry) {
				scaleX = 1;
				invScaleX = 1;
				scaleY = ry/rx;
				invScaleY = rx/ry;
				treeGradient = ctxTop.createRadialGradient(cx, cy*invScaleY, cx*1.5, cx, (cy*2)*invScaleY, rx/2);
			} else {
				scaleY = 1;
				invScaleY = 1;
				scaleX = rx/ry;
				invScaleX = ry/rx;
				treeGradient = ctxTop.createRadialGradient(cx*invScaleX, cy, cy*1.5, cx*invScaleX, cy*2, ry/2);
			}
			//add desired colors
			treeGradient.addColorStop(1,"rgba(0,0,0,0)");
			treeGradient.addColorStop(0,"rgb(0,0,0)");

			//draw region to be gradient filled, making sure to inverse-scale any coordinates used for the drawing.

			/*


			*/
			// listen for mouse/touch events depending on whether a mobile or desktop device
			mouse.setListeners(device.isMobile);
			blnInitialized = true;
			//blnAllowLoop = true;
			//loop();
			//begin game
			/*
				entities.player = {name:"Player", x:currentWidth/2, y:currentHeight/2, radius: 2, angle:(Math.random()*Math.PI*2)-Math.PI, fov: Math.PI*0.6, viewDist: 200};
				player.lAngle = (entities.player.angle-entities.player.fov/2);
				player.rAngle = (entities.player.angle+entities.player.fov/2);
			*/

			/*
			for(i=0;i<=len;i++){
				entities.player = {name:"Player", x:currentWidth/2, y:currentHeight/2, radius: 2, angle:((i/len)*Math.PI*2)-Math.PI, fov: Math.PI*0.6, viewDist: 200};
				entities.player.lAngle = (entities.player.angle-entities.player.fov/2);
				entities.player.rAngle = (entities.player.angle+entities.player.fov/2);
				//console.log((CALC.getAngle(entities.player, ent)-entities.player.angle));
				if(entities.player.rAngle > Math.PI){
					entities.player.rAngle = -Math.PI+(entities.player.rAngle%Math.PI);
				}
				if(entities.player.lAngle < -Math.PI){
					entities.player.lAngle = Math.PI+(entities.player.lAngle%Math.PI);
				}
				console.log(entities.player.lAngle+" | "+entities.player.angle+" | "+entities.player.rAngle+" ("+(i/len)+")");

			}
			*/
			entities.player = {name:"Player", x:currentWidth/2, y:currentHeight/2, radius: 2, angle:(Math.random()*Math.PI*2)-Math.PI, fov: Math.PI*currentWidth/2000, viewDist: currentAverage*0.3, speed:0.2};
			for(i=0;i<=len;i++){
				entities.create({name:"Tree", x:Math.random()*currentWidth, y:Math.random()*currentHeight, radius:Math.random()*5+2.5, colour:{r:(105+Math.random()*20-10), g:(50+Math.random()*20-10), b:(20+Math.random()*20-10)}});
			}
			DRAW.ctx = ctxBack;
			editor.backG.draw(DRAW.ctx);
			updateState(gameState);
		};
		function resize() {
			if(MIN != 0){
				editor.tools.multiplyDimensions(1/MIN);
			}
			//transformPositions(true, true);
			currentWidth = window.innerWidth;
			currentHeight = window.innerHeight;
			currentAverage = (currentWidth+currentHeight)/2;
			MAX = Math.max(currentWidth, currentHeight);//RATIO;
			MIN = Math.min(currentWidth, currentHeight);//RATIO;
			//set canvas width/heights to the max to ensure stretching does not occur
			canvasTop.width = MAX;
			canvasTop.height = MAX;
			canvasMid.width = MAX;
			canvasMid.height = MAX;
			canvasBack.width = MAX;
			canvasBack.height = MAX;
			editor.tools.multiplyDimensions(MIN);
			// timeout here as some mobile browsers won't scroll if there is not a small delay
			window.setTimeout(function() {
					window.scrollTo(0,0);
			}, 1);
			updateState(gameState);
		};
		var panel = {
			create: {
				blnOpen: false,
				open: function(){
					this.blnOpen = true;
				},
				close: function(){
					this.blnOpen = false;
				}
			}
		}
		var editor = {
			backG: {
				rendered: false,
				colour: "#DDDDDD",
				draw: function(ctx){
					ctx.fillStyle = this.colour;
					ctx.fillRect(0, 0, currentWidth, currentHeight);
				}
			},
			tools: {
				current: "Create Tree",
				rendered: false,
				colour: "#999999",
				x: 0.1,
				y: 0.1,
				width: 0.2,
				height: 0.8,
				slotWidth: 0.2,
				slotHeight: 0.2,
				buttons: {
					create: {
						x: 0,
						y: 1,
						width: 0.8,
						height: 0.8,
						colour: "#555555",
						doAction: function(){
							panel.create.open();
						}
					}
				},
				multiplyDimensions: function(numAmount){
					this.x = this.x*numAmount;
					this.y = this.y*numAmount;
					this.width = this.width*numAmount;
					this.height = this.height*numAmount;
				},
				draw: function(ctx){
					ctx.clearRect(this.x, this.y, this.width, this.height);
					ctx.fillStyle = this.colour;
					ctx.fillRect(this.x, this.y, this.width, this.height);
				}
			}
		}
		var visData = [];
		function updateState(strState){
			var i = 0;
			var len;
			var ent;//entity
			var angle;
			var x;
			var y;
			var width;
			var height;
			var r, g, b;
			var stdDist;
			loopTime = performance.now();
			if(mouse.down){
				entities.player.x += Math.cos(entities.player.angle)*entities.player.speed;
				entities.player.y += Math.sin(entities.player.angle)*entities.player.speed;
			}
			switch(strState){
				case "Editor":
					entities.player.angle = CALC.getAngle(entities.player, mouse.position);
					entities.player.lAngle = (entities.player.angle-entities.player.fov/2);
					entities.player.rAngle = (entities.player.angle+entities.player.fov/2);
					DRAW.ctx = ctxMid;
					DRAW.ctx.clearRect(0, 0, currentWidth, currentHeight);
					ctxTop.globalAlpha = 0.75;
					editor.tools.draw(ctxTop);
					ctxTop.globalAlpha = 1;
					DRAW.ctx.strokeStyle = "#000000";
					DRAW.ctx.beginPath();
					len = entities.data.length-1;
					for(i=len;i>=0;i--){
						ent = entities.data[i];
						//make angle wrap correctly
						if(entities.player.lAngle<-Math.PI){
							angle = CALC.getAngle(ent, entities.player)-Math.PI;
						} else if(entities.player.rAngle>Math.PI){
							angle = CALC.getAngle(ent, entities.player)+Math.PI;
						} else {
							angle = CALC.getAngle(entities.player, ent);
						}
						ent.visPos = (angle-(entities.player.lAngle))/(entities.player.fov);
						//if(ent.visPos > 0 && ent.visPos < 1 && ent.dist > 10 && ent.dist<entities.player.viewDist){
							//if within viewport
							DRAW.ctx.moveTo(ent.x+ent.radius, ent.y);
							DRAW.circle({x:ent.x, y:ent.y, radius:ent.radius});
							//DRAW.ctx.moveTo(ent.x, ent.y);
							//DRAW.ctx.lineTo(entities.player.x, entities.player.y);
						//	visData.push(ent);
						//}
						ent.dist = CALC.dist(ent, entities.player);
					}
					entities.data.sort(sortByDist);
					ent = entities.player;
					//draw the player viewport
					DRAW.ctx.moveTo(ent.x, ent.y);
					DRAW.ctx.lineTo(ent.x+Math.cos(ent.angle+ent.fov/2)*ent.viewDist, ent.y+Math.sin(ent.angle+ent.fov/2)*ent.viewDist);
					DRAW.ctx.moveTo(ent.x, ent.y);
					DRAW.ctx.lineTo(ent.x+Math.cos(ent.angle-ent.fov/2)*ent.viewDist, ent.y+Math.sin(ent.angle-ent.fov/2)*ent.viewDist);
					DRAW.ctx.arc(ent.x, ent.y, ent.viewDist, ent.angle-ent.fov/2, ent.angle+ent.fov/2);
					DRAW.ctx.moveTo(ent.x, ent.y);
					DRAW.ctx.stroke();
					DRAW.ctx.closePath();
					//console.log("angles: "+ent.angle+", "+CALC.getAngle(ent, {x:ent.x+Math.cos(ent.angle)*5000, y:ent.x+Math.sin(ent.angle)*5000}));
					break;
				case "Main":
					if(mouse.position.x < currentWidth*0.4){
						entities.player.angle -= (((currentWidth*0.4)-mouse.position.x)/currentWidth)/(Math.PI*8);
					} else if(mouse.position.x > currentWidth*0.6){
						entities.player.angle += (((currentWidth*0.4)-(currentWidth-mouse.position.x))/currentWidth)/(Math.PI*8);
					}
					if(entities.player.angle > Math.PI){
						entities.player.angle = -Math.PI+(entities.player.angle%Math.PI);
					}
					if(entities.player.angle < -Math.PI){
						entities.player.angle = Math.PI+(entities.player.angle%Math.PI);
					}
					entities.player.lAngle = (entities.player.angle-entities.player.fov/2);
					entities.player.rAngle = (entities.player.angle+entities.player.fov/2);
					DRAW.ctx = ctxMid;
					DRAW.ctx.fillStyle = 'rgb('+0+','+0+','+0+')';
					DRAW.ctx.fillRect(0, 0, currentWidth, currentHeight*0.63);
					DRAW.ctx.clearRect(0, currentHeight*0.63, currentWidth, currentHeight*0.4);
					//DRAW.ctx.fillStyle = 'rgb('+5+','+3+','+2+')';
					//DRAW.ctx.fillStyle = "#5588AA";
					//DRAW.ctx.fillStyle = 'rgb('+40+','+24+','+12+')';
					/*

					DRAW.ctx.fillStyle = "#223300";
					DRAW.ctx.fillRect(0, currentHeight*0.63, currentWidth, currentHeight*0.4);
					*/
					//DRAW.ctx.fillStyle = 'rgb('+60+','+36+','+18+')';
					//DRAW.ctx.fillStyle = 'rgb('+60+','+36+','+18+')';
					len = entities.data.length-1;
					visData = [];
					for(i=len;i>=0;i--){
						ent = entities.data[i];
						//make angle wrap correctly
						if(entities.player.lAngle<-Math.PI){
							angle = CALC.getAngle(ent, entities.player)-Math.PI;
						} else if(entities.player.rAngle>Math.PI){
							angle = CALC.getAngle(ent, entities.player)+Math.PI;
						} else {
							angle = CALC.getAngle(entities.player, ent);
						}
						ent.visPos = (angle-(entities.player.lAngle))/(entities.player.fov);
						if(ent.visPos > -0.15 && ent.visPos < 1.15 && ent.dist > 10){

							x = ent.visPos*currentWidth;
							y = 0;
							width = (1/ent.dist)*currentAverage*ent.radius;
							stdDist = ((1/ent.dist)*20);
							height = currentHeight*0.6+((currentHeight*0.4)*stdDist);
							//visData.push(ent);
							//console.log((height-(currentHeight*0.6))/(currentHeight*0.4));

							if(ent.dist<entities.player.viewDist){

								r = Math.min(Math.round(ent.colour.r*(stdDist*0.75)), 110);
								g = Math.min(Math.round(ent.colour.g*(stdDist*0.75)), 55);
								b = Math.min(Math.round(ent.colour.b*(stdDist*0.75)), 25);
								DRAW.ctx.fillStyle = 'rgb('+r+','+g+','+b+')';
								DRAW.ctx.fillRect(x-width/2, y, width, height);

								if(ent.dist<entities.player.viewDist*0.5){
									DRAW.ctx.globalAlpha = (stdDist*0.06);
									DRAW.image(images.data.tree0, x-width/2, y-((1024*stdDist*0.8)-height), width, 1024*stdDist*0.8);
									DRAW.ctx.globalAlpha = 1;
								}
								//8
							}
							//
							ent.dist = CALC.dist(ent, entities.player);
						}
					}
					entities.data.sort(sortByDist);
					/*
					len = visData.length-1;
					for(i=len;i>=0;i--){
						ent = visData[i];
						DRAW.ctx.fillRect(ent.visPos*currentWidth, 0, ent.radius*3, currentHeight);
					}
					*/
					break;
				default:
					console.warn("Unknown state: "+strState);
					break;
			}
			//render performance benchmark
			ctxTop.fillStyle = "#FFFFFF";
			ctxTop.fillRect(0, 0, 60, 20);
			ctxTop.fillStyle = "#000000";
			loopTime = Math.round((performance.now()-loopTime)*1000)/1000;
			//ctxTop.setTransform(scaleX,0,0,scaleY,0,0);
			ctxTop.fillText(loopTime, 10, 13);
		};
		var loopTime = 0;
		var blnRequestingFrame = false;
		function loop() {
			if(blnAllowLoop == true){

				if(gameState == "Main"){

				} else if(gameState == "Editor"){

				}
				//console.log(entities.player.angle);

					//entities.player.angle = CALC.getAngle(entities.player, mouse.position);
				updateState(gameState);

				//ctxTop.setTransform(-scaleX,0,0,-scaleY,0,0);
				requestAnimFrame(loop);
				blnRequestingFrame = true;
			} else {
				blnRequestingFrame = false;
			}
		};
		window.addEventListener('load', onWindowLoaded, false);
		window.addEventListener('resize', onWindowResized, false);
	}());
}());
