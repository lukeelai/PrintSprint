use2D = true;

get_blob = function() {
		return view.Blob;
};
var canwidth = 1888;
var canheight = 928;

var elements = new Array();
var inPlay = new Array();
//var newGameText = new TextBox();

//include your sprites here
function LoadContent() {
    /*newGameText.x = 5;
    newGameText.y = 200;
    newGameText.fontSize = 32;
    newGameText.text = "New Game";
    world.addChild(newGameText);*/

    var outputtext = new TextBox();
    outputtext.x = canwidth/2;
    outputtext.y = canheight - 32 * 2;
    outputtext.fontSize = 32;
    outputtext.text = "Output!";
    world.addChild(outputtext);

    var background = new Sprite();
    background.width = canwidth;
    background.height = canheight;
    background.x = 0;
    background.y = 0;
    background.image = Textures.load("http://i.imgur.com/ALUQr26.png");
    background.name = "background";
    background.index = 300;

    var start = new Sprite();
    start.width = 32;
    start.height = 32;
    start.x = canwidth - 32;
    start.y = 32 * 0;
    start.image = Textures.load("http://i.imgur.com/V2lb8bR.png");
    start.name = "start";

    var end = new Sprite();
    end.width = 32;
    end.height = 32;
    end.x = canwidth - 32;
    end.y = 32 * 1;
    end.image = Textures.load("http://i.imgur.com/ooNG9Zx.png");
    end.name = "end";

    var enemy = new Sprite();
    enemy.width = 32;
    enemy.height = 32;
    enemy.x = canwidth - 32;
    enemy.y = 32 * 2;
    enemy.image = Textures.load("http://i.imgur.com/uwr6ghp.png");
    enemy.name = "enemy";

    var wall = new Sprite();
    wall.width = 32;
    wall.height = 32;
    wall.x = canwidth - 32;
    wall.y = 32 * 3;
    wall.image = Textures.load("http://i.imgur.com/xyBsDaA.png");
    wall.name = "wall";

    var pit = new Sprite();
    pit.width = 32;
    pit.height = 32;
    pit.x = canwidth - 32;
    pit.y = 32 * 4;
    pit.image = Textures.load("http://i.imgur.com/A93OdiW.png");
    pit.name = "pit";

    var ink = new Sprite();
    ink.width = 32;
    ink.height = 32;
    ink.x = canwidth - 32;
    ink.y = 32 * 5;
    ink.image = Textures.load("http://i.imgur.com/8nu5AKH.png");
    ink.name = "ink";

    elements.push(start);
    elements.push(end);
    elements.push(enemy);
    elements.push(wall);
    elements.push(pit);
    elements.push(ink);

    world.addChild(background);
    world.addChild(start);
    world.addChild(end);
    world.addChild(enemy);
    world.addChild(wall);
    world.addChild(pit);
    world.addChild(ink);
}

LoadContent();

//checks if given sprite is at x, y
function checkSpritesimple(sprite, x, y) {
    if (sprite.x == x && sprite.y == y) return true;
    else return false;
}

function checkSprite(sprite, x, y) {
    var minX = sprite.x;
    var maxX = sprite.x + sprite.width;
    var minY = sprite.y;
    var maxY = sprite.y + sprite.height;
    var mx = x;
    var my = y;

    if (mx >= minX && mx <= maxX && my >= minY && my <= maxY) {
        return true;
    }
    return false;
}

function createCopy(oldSprite) {
    var newSprite = new Sprite();
    newSprite.width = oldSprite.width;
    newSprite.height = oldSprite.height;
    newSprite.x = oldSprite.x;
    newSprite.y = oldSprite.y;
    newSprite.image = oldSprite.image;
    newSprite.name = oldSprite.name;
    return newSprite;
}

function removeSprite(sprite) {
    world.removeChild(sprite);
    for (i = 0; i < inPlay.length; i++) {
        var searchedsprite = inPlay[i];
        if (searchedsprite == sprite) {
            inPlay.splice(i, 1);
        }
    }
    for (i = 0; i < sprites.length; i++) {
        var searchedsprite = sprites[i];
        if (searchedsprite == sprite) {
            sprites.splice(i, 1);
        }
    }
}

//Finds if sprite is colliding with something
function CheckCollision(sprite) {
    var spritex = sprite.x;
    var spritey = sprite.y;
    var collision = false;
    for (i = 0; i < inPlay.length; i++) {
        if (inPlay[i] != sprite) {
            //newGameText.text = "1x: " + inPlay[0].x + "\n2x: " + sprite.x + "\n1y: " + inPlay[0].y + "\n2y: " + sprite.y;
            if (checkSpritesimple(inPlay[i], spritex, spritey)) collision = true;
        }
    }
    return collision;
}

function findCollision(sprite) {
    var minX = sprite.x;
    var maxX = sprite.x + sprite.width;
    var minY = sprite.y;
    var maxY = sprite.y + sprite.height;
    for (i = 0; i < inPlay.length; i++) {
        if (inPlay[i] != sprite) {
            if (checkSprite(inPlay[i], minX, minY)) return inPlay[i];
            if (checkSprite(inPlay[i], minX, maxY)) return inPlay[i];
            if (checkSprite(inPlay[i], maxX, minY)) return inPlay[i];
            if (checkSprite(inPlay[i], maxX, maxY)) return inPlay[i];
        }
    }
    return undefined;
}

// We will add all sprites we want to be able to drag into this array.
var sprites = new Array();
for (i = 0; i < elements.length; i++) {
    sprites[i] = elements[i];
}

// Create a sprite to manage dragging the other sprites.
var manager = new Sprite();
manager.dragging = false;
manager.target = undefined;
manager.dragOffsetX = 0;
manager.dragOffsetY = 0;

// Make sure to add it to the world.
world.addChild(manager);

// Notify manager anytime the mouse is down. 
// (We "listen" for a mouse down to happen)
gInput.addMouseDownListener(manager);

// Notify manager anytime the mouse is up. 
gInput.addMouseUpListener(manager);

// When the mouse is down...
manager.onMouseDown = function (button) {
    
    if (gInput.mouse.x >= canwidth - 32 * 2 || gInput.mouse.y >= canheight - 32 * 3) {
        if (this.dragging) {
            removeSprite(this.dragging.target);
            this.dragging = false;
            this.target = undefined;
        }
    }

    if (gInput.mouse.y >= canheight - 32 * 3) {

        //initialize empty grid array
        var  grid = new Array;
        for (var i = 0; i < canheight/32 - 3; i++) {
            grid[i] = new Array;
            for (var j = 0; j < canwidth/32 - 2; j++) {
                    grid[i][j] = "empty";
            }
        }

        //fill grid array with data
        for (var i = 0; i < inPlay.length; i++) {
            grid[inPlay[i].y/32][inPlay[i].x/32] = inPlay[i].name;
        }

        var output = "";
        //pack it into string
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[i].length; j++) {
                if (i == 0 && j == 0) output += grid[i][j];
                else output += " " + grid[i][j];
            }
        }

        //print output to console;

        var blob = new Blob([output], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "LevelEditorOutput.txt");

        console.log(output);

    } else {
        // For each draggable sprite...  
        for (var sprite in sprites) {
            sprite = sprites[sprite];
            // If we are clicking on that sprite...
            if (checkSprite(sprite, gInput.mouse.x, gInput.mouse.y)) {
                // ...update dragging variables.
                if (gInput.mouse.x >= canwidth - 32 * 2) {
                    var duplicated = createCopy(sprite);
                    sprites.push(duplicated);
                    world.addChild(duplicated);
                    inPlay.push(duplicated);
                    this.dragging = true;
                    this.target = duplicated;
                    this.dragOffsetX = gInput.mouse.x - duplicated.x;
                    this.dragOffsetY = gInput.mouse.y - duplicated.y;
                } else {
                    this.dragging = true;
                    this.target = sprite;
                    this.dragOffsetX = gInput.mouse.x - sprite.x;
                    this.dragOffsetY = gInput.mouse.y - sprite.y;
                    break;
                }
            }
        }
    }
};


// When the mouse is up, stop dragging the sprite, and reset the target.
manager.onMouseUp = function () {
    if (this.target !== undefined) {
        var gridx = this.target.x - (this.target.x % 32);
        var gridy = this.target.y - (this.target.y % 32);
        this.target.x = gridx;
        this.target.y = gridy;
    }
    if (gInput.mouse.x >= canwidth - 32 * 2 || gInput.mouse.y >= canheight - 32 * 3) {
        if (this.dragging) {
            var todelete = this.target;
            this.dragging = false;
            this.target = undefined;
            removeSprite(todelete);
            
        }
    } else {
        //newGameText.text = "yay" + inPlay.length;
        if (this.target !== undefined) {
            var colliding = CheckCollision(this.target);
            if (colliding == true) {
                var collision = findCollision(this.target);
                removeSprite(collision);
            }
            this.dragging = false;
            this.target = undefined;
        }
    }
};

// On every update... 
manager.update = function (d) {
    // ...check if we're dragging.
    if (this.dragging) {
        // If there is a target to drag...  
        if (this.target !== undefined) {
            // ...change the target's coordinates using the drag offset.  
            this.target.x = gInput.mouse.x - this.dragOffsetX;
            this.target.y = gInput.mouse.y - this.dragOffsetY;
        }
    }
};






































/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 2015-01-04
 * 
 * By Eli Grey, http://eligrey.com
 * License: X11/MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs
  // IE 10+ (native saveAs)
  || (typeof navigator !== "undefined" &&
      navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator))
  // Everyone else
  || (function(view) {
	"use strict";
	// IE <10 is explicitly unsupported
	if (typeof navigator !== "undefined" &&
	    /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var
		  doc = view.document
		  // only get URL when necessary in case Blob.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = "download" in save_link
		, click = function(node) {
			var event = doc.createEvent("MouseEvents");
			event.initMouseEvent(
				"click", true, false, view, 0, 0, 0, 0, 0
				, false, false, false, false, 0, null
			);
			node.dispatchEvent(event);
		}
		, webkit_req_fs = view.webkitRequestFileSystem
		, req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
		, throw_outside = function(ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		, fs_min_size = 0
		// See https://code.google.com/p/chromium/issues/detail?id=375297#c7 and
		// https://github.com/eligrey/FileSaver.js/commit/485930a#commitcomment-8768047
		// for the reasoning behind the timeout and revocation flow
		, arbitrary_revoke_timeout = 500 // in ms
		, revoke = function(file) {
			var revoker = function() {
				if (typeof file === "string") { // file is an object URL
					get_URL().revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			};
			if (view.chrome) {
				revoker();
			} else {
				setTimeout(revoker, arbitrary_revoke_timeout);
			}
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, FileSaver = function(blob, name) {
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, blob_changed = false
				, object_url
				, target_view
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					// don't create more object URLs than needed
					if (blob_changed || !object_url) {
						object_url = get_URL().createObjectURL(blob);
					}
					if (target_view) {
						target_view.location.href = object_url;
					} else {
						var new_tab = view.open(object_url, "_blank");
						if (new_tab == undefined && typeof safari !== "undefined") {
							//Apple do not allow window.open, see http://bit.ly/1kZffRI
							view.location.href = object_url
						}
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
					revoke(object_url);
				}
				, abortable = function(func) {
					return function() {
						if (filesaver.readyState !== filesaver.DONE) {
							return func.apply(this, arguments);
						}
					};
				}
				, create_if_not_found = {create: true, exclusive: false}
				, slice
			;
			filesaver.readyState = filesaver.INIT;
			if (!name) {
				name = "download";
			}
			if (can_use_save_link) {
				object_url = get_URL().createObjectURL(blob);
				save_link.href = object_url;
				save_link.download = name;
				click(save_link);
				filesaver.readyState = filesaver.DONE;
				dispatch_all();
				revoke(object_url);
				return;
			}
			// Object and web filesystem URLs have a problem saving in Google Chrome when
			// viewed in a tab, so I force save with application/octet-stream
			// http://code.google.com/p/chromium/issues/detail?id=91158
			// Update: Google errantly closed 91158, I submitted it again:
			// https://code.google.com/p/chromium/issues/detail?id=389642
			if (view.chrome && type && type !== force_saveable_type) {
				slice = blob.slice || blob.webkitSlice;
				blob = slice.call(blob, 0, blob.size, force_saveable_type);
				blob_changed = true;
			}
			// Since I can't be sure that the guessed media type will trigger a download
			// in WebKit, I append .download to the filename.
			// https://bugs.webkit.org/show_bug.cgi?id=65440
			if (webkit_req_fs && name !== "download") {
				name += ".download";
			}
			if (type === force_saveable_type || webkit_req_fs) {
				target_view = view;
			}
			if (!req_fs) {
				fs_error();
				return;
			}
			fs_min_size += blob.size;
			req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
				fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
					var save = function() {
						dir.getFile(name, create_if_not_found, abortable(function(file) {
							file.createWriter(abortable(function(writer) {
								writer.onwriteend = function(event) {
									target_view.location.href = file.toURL();
									filesaver.readyState = filesaver.DONE;
									dispatch(filesaver, "writeend", event);
									revoke(file);
								};
								writer.onerror = function() {
									var error = writer.error;
									if (error.code !== error.ABORT_ERR) {
										fs_error();
									}
								};
								"writestart progress write abort".split(" ").forEach(function(event) {
									writer["on" + event] = filesaver["on" + event];
								});
								writer.write(blob);
								filesaver.abort = function() {
									writer.abort();
									filesaver.readyState = filesaver.DONE;
								};
								filesaver.readyState = filesaver.WRITING;
							}), fs_error);
						}), fs_error);
					};
					dir.getFile(name, {create: false}, abortable(function(file) {
						// delete file if it already exists
						file.remove();
						save();
					}), abortable(function(ex) {
						if (ex.code === ex.NOT_FOUND_ERR) {
							save();
						} else {
							fs_error();
						}
					}));
				}), fs_error);
			}), fs_error);
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name) {
			return new FileSaver(blob, name);
		}
	;
	FS_proto.abort = function() {
		var filesaver = this;
		filesaver.readyState = filesaver.DONE;
		dispatch(filesaver, "abort");
	};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

	return saveAs;
}(
	   typeof self !== "undefined" && self
	|| typeof window !== "undefined" && window
	|| this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module.exports) {
  module.exports.saveAs = saveAs;
} else if ((typeof define !== "undefined" && define !== null) && (define.amd != null)) {
  define([], function() {
    return saveAs;
  });
}


































initGame("canvas");
