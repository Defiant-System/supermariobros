/* Data.js */
// A few functions to store and display ~persistent data
// "use strict";

// window.data stores the references to data and elements
function resetData() {
	// Make sure there's no data display already
	window.find(".data_display").remove();
	
	if (!Global.data) {
		Global.data = new Data();
		// setDataDisplay();
	}
}
// Keeps information displayed on the screen
function Data() {
	this.mariopower = 1;
	this.traveled = this.traveledold = 0; // only used for random
	this.scorelevs = [100, 200, 400, 500, 800, 1000, 2000, 4000, 5000, 8000];
	this.score = new DataObject(0, 6, "SCORE");
	this.time = new DataObject(350, 3, "TIME");
	this.world = new DataObject(0, 0, "WORLD");
	this.coins = new DataObject(0, 0, "COINS");
	this.lives = new DataObject(3, 1, "LIVES");
	this.time.dir = -1;
	this.scoreold = 0;
}

// Keeps a reference to the actual HTML element on display
function DataObject(amount, length, name) {
	this.amount = amount;
	this.length = length;
	this.name = name;
	this.element = Global.createElement("td", {className: "indisplay"});
}

// Sets up the data display on the screen
function setDataDisplay() {
	var display = Global.createElement("table", { className: "data_display display" }),
		elems = ["score", "coins", "world", "time", "lives"];
	
	window.find("content").append(display);
	
	Global.data.display = display;

	for(var i in elems) {
		display.appendChild(Global.data[elems[i]].element);
		updateDataElement(Global.data[elems[i]]);
	}
	window.find("content").append(Global.data.display);
}

// Getting rid of the display simply means removing it from body
function clearDataDisplay() {
	window.find(".data_display").remove();
}

// Starts the interval of updating data time
// 1 game second is about 25*16.667=416.675ms
function startDataTime() {
	Global.EventHandler.addEventInterval(updateDataTime, 25, Infinity, Global.data.time);
}

function updateDataTime(me) {
	// If the time direction isn't up (random map), check for timing
	if (me.dir != 1) {
		if (me.amount == 100) playCurrentThemeHurry(); 
		else if (me.amount <= 0) killMario(Global.mario, true);
	}
	// If time is still enabled, change it by 1
	if (!Global.notime) {
		Global.map.time = me.amount += me.dir;
		updateDataElement(me);
	}
}

// Updates a typical DataObject to its value
function updateDataElement(me) {
	var text = me.name + "<br />" + (me.amount == "Infinity" ? "Inf" : me.amount);
	me.element.innerHTML = text;
	/*if (text.length > 14) me.element.style.width = "490px";
	else */me.element.style.width = "";
}


function score(me, amount, appears) {
	// Don't do negative values
	if (amount <= 0) return;
	// If it's in the form 'score(X)', return 'score(mario, x)'
	if (arguments.length == 1) return score(Global.mario, me);
	// Keep the high score in localStorage, why not.
	localStorage.highscore = Global.max(localStorage.highscore, Global.data.score.amount += amount);
	// If it appears, add the element
	if (appears) {
		var text = addText(amount, me.left, me.top);
		text.yvel = -Global.unitsized4;
		Global.EventHandler.addEvent(killScore, 49, text);
	}
	while(Global.data.score > 10000) { // you never know...
		gainLife();
		Global.data.score.amount = Global.data.score.amount % 10000;
	}
	updateDataElement(Global.data.score);
}

function killScore(text) {
	// console.log(text);
	// if (body.contains(text)) body.removeChild(text);
	if (text.parentNode) text.parentNode.removeChild(text);
	killNormal(text);
	deleteThing(text, Global.texts, Global.texts.indexOf(text));
}

function findScore(lev) {
	if (lev < Global.data.scorelevs.length) return Global.data.scorelevs[lev];
	gainLife();
	return -1;
}

function gainLife(num, nosound) {
	Global.data.lives.amount += typeof(num) == "number" ? num : 1;
	if (!nosound) play("Gain Life");
	updateDataElement(Global.data.lives);
}

function setLives(num) {
	Global.data.lives.amount = Number(num);
	updateDataElement(Global.data.lives);
}

function storeMarioStats() {
	Global.data.mariopower = Global.mario.power;
}

function clearMarioStats() {
	Global.data.mariopower = Global.mario.power = 1;
}
