// Quads has 7 cols and 6 rows
function resetQuadrants() {
	Global.quads = [];
	Global.quads.rows = 5;
	Global.quads.cols = 6;
	setQuadDimensions();
	createQuads();
}

function Quadrant(row, left) {
	this.left = left;
	this.top = (row-1) * Global.quads.height;
	this.right = this.left + Global.quads.width;
	this.bottom = this.top + Global.quads.height;
	
	this.things = []
	this.numobjects = this.tolx = this.toly = 0;
}

// Quads has 7 cols and 6 rows
function createQuadrants() {
	Global.quads = [];
	Global.quads.rows = 5;
	Global.quads.cols = 6;
	setQuadDimensions();
	createQuads();
}

function setQuadDimensions() {
	Global.quads.width = Global.quads.rightdiff = Math.round(window.innerWidth / (Global.quads.cols - 3));
	Global.quads.height = Math.round(window.innerHeight / (Global.quads.rows - 2));
	
	Global.quads.delx = Global.quads.width * -2;
}

function createQuads() {
	for (var i=0; i<Global.quads.cols; ++i) {
		addQuadCol((i-2) * Global.quads.width);
	}
	Global.quads.leftmost = Global.quads[0];
}

// Recentx is the .left of the most recently added stuff
function addQuadCol(left) {
	for(var i=0; i<Global.quads.rows; ++i) {
		Global.quads.push(new Quadrant(i, left));
	}
	Global.quads.rightmost = Global.quads[Global.quads.length - 1];
}

function shiftQuadCol() {
	var old = [];
	if (!Global.map.nodeletequads) {
		for(var i=Global.quads.rows-1; i>0; --i) {
			old.push(deleteQuad(Global.quads.shift()));
		}
	}
	Global.quads.leftmost = Global.quads[0];
	Global.quads.rightdiff = Global.quads.width;
}

function deleteQuad(quad) {
	if (quad.element) document.body.removeChild(quad.element);
	return quad;
}

function updateQuads(xdiff) {
	Global.quads.rightdiff += xdiff || 0;
	// if (Global.quads.leftmost.left <= Global.quads.delx) {
	while(Global.quads.leftmost.left <= Global.quads.delx) {
		addQuadCol(Global.quads.rightmost.right);
		shiftQuadCol();
		spawnMap();
	}
}

function determineAllQuadrants() {
	for(var i=0; i<Global.quads.length; ++i)
		Global.quads[i].numthings = 0;
	
	for(var j=0; j<Global.solids.length; ++j)
		if (Global.solids[j].moved != false)
			determineThingQuadrants(Global.solids[j]);
	
	// for(var k=0; k<characters.length; ++k)
		// determineThingQuadrants(characters[k]);
}

function determineThingQuadrants(me) {
	me.numquads = 0;
	for(var i = 0, len = Global.quads.length; i < len; ++i) {
		if (objectInQuadrant(me, Global.quads[i])) {
			setThingInQuadrant(me, Global.quads[i]);
			if (me.numquads > me.maxquads) break;
		}
	}
}

function setThingInQuadrant(me, quad) {
	me.quads[me.numquads] = quad;
	quad.things[quad.numthings] = me;
	++me.numquads;
	++quad.numthings;
}