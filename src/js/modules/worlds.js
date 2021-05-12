// Global.worlds

{
	// World11 is kept here to avoid loading
	World11(map) {
		map.locs = [
			new Location(0, true),
			new Location(0, exitPipeVert),
			new Location(1)
		];
		map.areas = [
			new Area("Overworld", function() {
				setLocationGeneration(0);
				
				var greeter = "";
				greeter += "<div style='width:350px;max-height:189px;background-color:#d64d00;border-radius:7px;box-shadow:3px 3px #efb28b inset, -3px -3px black inset;";
				greeter += "background-image: url(\"~/images/greeting.gif\"), url(\"~/images/greeting.gif\"), url(\"~/images/greeting.gif\"), url(\"~/images/greeting.gif\");";
				greeter += "background-repeat: no-repeat;";
				greeter += "background-position: 7px 7px, 336px 7px, 7px 168px, 336px 168px";
				greeter += "'>";
				greeter += "  <p style='text-align:left;padding:7px 0 11px 11px;color:#ffcccc;font-family: Super Plumber Bros;font-size:77px;text-shadow:3px 8px black'>";
				greeter += "    <span style='font-size:84px'>super</span>";
				greeter += "    <br><br>"; // To do: make this not so font dependant
				greeter += "    <span style='font-size:81px;line-height:96px'>MARIO BROS.</span>";
				greeter += "  </p>";
				greeter += "</div>";
				greeter += "<div id='boo' style='text-align:right;color:#ffcccc;margin-top:-7px;width:350px;height:35px;'>&copy;1985 NINTENDO</div>";
				greeter += "<p id='explanation' style='text-align:center;<!--/*text-shadow:2px 2px 1px black;*/-->margin-left:7px;'>";
				greeter += "  Move: Arrows/WASD";
				greeter += "  <br>";
				greeter += "  Fire/Sprint: Shift/CTRL";
				greeter += "  <br>";
				greeter += "  Pause/Mute: P/M ";
				// greeter += "  <br>";
				// greeter += "  TOP- " + (localStorage.highscore || "000000");
				greeter += "</p>";
				pushPreText(greeter, 20, 91);
				
				pushPrePattern("backreg", 0, 0, 5);
				pushPreFloor(0, 0, 69);
				
				pushPreThing(Block, 128, Global.jumplev1);
				pushPreThing(Brick, 160, Global.jumplev1);
				pushPreThing(Block, 168, Global.jumplev1, Mushroom);
				pushPreThing(Goomba, 176, 8);
				pushPreThing(Brick, 176, Global.jumplev1);
				pushPreThing(Block, 176, Global.jumplev2);
				pushPreThing(Block, 184, Global.jumplev1);
				pushPreThing(Brick, 192, Global.jumplev1);
				pushPrePipe(224, 0, 16, false);
				pushPrePipe(304, 0, 24);
				pushPrePipe(368, 0, 32);
				pushPreThing(Goomba, 340, 8);
				pushPrePipe(368, 0, 32);
				pushPreThing(Goomba, 412, 8);
				pushPreThing(Goomba, 422, 8);
				pushPrePipe(456, 0, 32, false, 2);
				pushPreThing(Block, 512, 40, [Mushroom, 1], true);
				pushPreFloor(568, 0, 15);
				pushPreThing(Brick, 618, Global.jumplev1);
				pushPreThing(Block, 626, Global.jumplev1, Mushroom);
				pushPreThing(Brick, 634, Global.jumplev1);
				pushPreThing(Brick, 640, Global.jumplev2);
				pushPreThing(Goomba, 640, Global.jumplev2 + 8);
				pushPreThing(Brick, 648, Global.jumplev2);
				pushPreThing(Brick, 656, Global.jumplev2);
				pushPreThing(Goomba, 656, Global.jumplev2 + 8);
				pushPreThing(Brick, 664, Global.jumplev2);
				pushPreThing(Brick, 672, Global.jumplev2);
				pushPreThing(Brick, 680, Global.jumplev2);
				pushPreThing(Brick, 688, Global.jumplev2);
				pushPreThing(Brick, 696, Global.jumplev2);
				pushPreFloor(712, 0, 64);
				pushPreThing(Brick, 728, Global.jumplev2);
				pushPreThing(Brick, 736, Global.jumplev2);
				pushPreThing(Brick, 744, Global.jumplev2);
				pushPreThing(Brick, 752, Global.jumplev1, Coin);
				pushPreThing(Block, 752, Global.jumplev2);
				pushPreThing(Goomba, 776, 8);
				pushPreThing(Goomba, 788, 8);
				pushPreThing(Brick, 800, Global.jumplev1);
				pushPreThing(Brick, 808, Global.jumplev1, Star);
				pushPreThing(Block, 848, Global.jumplev1);
				pushPreThing(Koopa, 856, 12);
				pushPreThing(Block, 872, Global.jumplev1);
				pushPreThing(Block, 872, Global.jumplev2, Mushroom);
				pushPreThing(Block, 896, Global.jumplev1);
				pushPreThing(Goomba, 912, 8);
				pushPreThing(Goomba, 924, 8);
				pushPreThing(Brick, 944, Global.jumplev1);
				pushPreThing(Brick, 968, Global.jumplev2);
				pushPreThing(Brick, 976, Global.jumplev2);
				pushPreThing(Brick, 984, Global.jumplev2);
				pushPreThing(Goomba, 992, 8);
				pushPreThing(Goomba, 1004, 8);
				pushPreThing(Goomba, 1024, 8);
				pushPreThing(Goomba, 1036, 8);
				pushPreThing(Brick, 1024, Global.jumplev2);
				pushPreThing(Brick, 1032, Global.jumplev1);
				pushPreThing(Block, 1032, Global.jumplev2);
				pushPreThing(Brick, 1040, Global.jumplev1);
				pushPreThing(Block, 1040, Global.jumplev2);
				pushPreThing(Brick, 1048, Global.jumplev2);  
				pushPreThing(Stone, 1072, 8);
				pushPreThing(Stone, 1080, 16, 1, 2);
				pushPreThing(Stone, 1088, 24, 1, 3);
				pushPreThing(Stone, 1096, 32, 1, 4);
				pushPreThing(Stone, 1120, 32, 1, 4);
				pushPreThing(Stone, 1128, 24, 1, 3);
				pushPreThing(Stone, 1136, 16, 1, 2);
				pushPreThing(Stone, 1144, 8);
				pushPreThing(Stone, 1184, 8);
				pushPreThing(Stone, 1192, 16, 1, 2);
				pushPreThing(Stone, 1200, 24, 1, 3);
				pushPreThing(Stone, 1208, 32, 1, 4);
				pushPreThing(Stone, 1216, 32, 1, 4);
				
				pushPreFloor(1240, 0, 69);
				pushPreThing(Stone, 1240, 32, 1, 4);
				pushPreThing(Stone, 1248, 24, 1, 3);
				pushPreThing(Stone, 1256, 16, 1, 2);
				pushPreThing(Stone, 1264, 8, 1, 1);
				pushPrePipe(1304, 0, 16, false, false, 1);
				
				pushPreThing(Brick, 1344, Global.jumplev1);
				pushPreThing(Brick, 1352, Global.jumplev1);
				pushPreThing(Block, 1360, Global.jumplev1);
				pushPreThing(Brick, 1368, Global.jumplev1);
				pushPreThing(Goomba, 1392, 8);
				pushPreThing(Goomba, 1404, 8);
				
				pushPrePipe(1432, 0, 16);
				pushPreThing(Stone, 1448, 8);
				pushPreThing(Stone, 1456, 16, 1, 2);
				pushPreThing(Stone, 1464, 24, 1, 3);
				pushPreThing(Stone, 1472, 32, 1, 4);
				pushPreThing(Stone, 1480, 40, 1, 5);
				pushPreThing(Stone, 1488, 48, 1, 6);
				pushPreThing(Stone, 1496, 56, 1, 7);
				pushPreThing(Stone, 1504, 64, 2, 8);
				endCastleOutside(1580);
				
			}),
			new Area("Underworld", function() {
				setLocationGeneration(2);
				makeCeiling(32, 7);
				pushPreFloor(0, 0, 17);
				fillPreThing(Brick, 0, 8, 1, 11, 8, 8);
				fillPreThing(Brick, 32, 8, 7, 3, 8, 8);
				fillPreThing(Coin, 33, 31, 7, 2, 8, 16);
				fillPreThing(Coin, 41, 63, 5, 1, 8, 8);
				pushPreThing(PipeSide, 104, 16, 1);
				pushPreThing(PipeVertical, 120, 88, 88);
			})
		];
	},
	World12(map) {
		map.locs = [
			new Location(0, walkToPipe),
			new Location(1),
			new Location(2),
			new Location(1, exitPipeVert),
			new Location(3, exitPipeVert),
			new Location(1, false, 1000)
		];
		map.areas = [
			new Area("Overworld", function() {
				setLocationGeneration(0);
				
				pushPreCastle();
				pushPrePattern("backcloud", 0, 4, 1);
				pushPreFloor(0, 0, 24);
				pushPreThing(PipeSide, 80, 16, 1);
				pushPrePipe(96, 0, 32);
			}),
			new Area("Underworld", function() {
				setLocationGeneration(1);
			
				fillPreThing(Brick, 0, 8, 1, 11, 8, 8);
				pushPreFloor(0, 0, 80);
				makeCeiling(48, 83);
				pushPreThing(Block, 80, Global.jumplev1, Mushroom);
				fillPreThing(Block, 88, Global.jumplev1, 4, 1, 8, 8);
				
				pushPreThing(Goomba, 128, 8);
				pushPreThing(Stone, 136, 8);
				pushPreThing(Goomba, 136, 16);
				pushPreThing(Stone, 152, 16, 1, 2);
				pushPreThing(Stone, 168, 24, 1, 3);
				pushPreThing(Stone, 184, 32, 1, 4);
				pushPreThing(Stone, 200, 32, 1, 4);
				pushPreThing(Stone, 216, 24, 1, 3);
				pushPreThing(Goomba, 232, 8);
				pushPreThing(Brick, 232, 40, Coin);
				pushPreThing(Stone, 248, 24, 1, 3);
				pushPreThing(Stone, 264, 16, 1, 2);
				
				fillPreThing(Brick, 312, 32, 1, 3, 8, 8);
				pushPreThing(Brick, 320, 32);
				pushPreThing(Coin, 321, 39);
				fillPreThing(Brick, 328, 32, 1, 3, 8, 8);
				fillPreThing(Coin, 330, 63, 4, 1, 8, 8);
				pushPreThing(Brick, 336, 48);
				pushPreThing(Brick, 344, 48);
				fillPreThing(Koopa, 352, 12, 2, 1, 12);
				fillPreThing(Brick, 352, 32, 1, 3, 8, 8);
				
				// pushPreThing(Coin, 360, 62);
				pushPreThing(Brick, 360, 32);
				fillPreThing(Brick, 368, 32, 1, 2, 8, 8);
				pushPreThing(Coin, 361, 39);
				pushPreThing(Brick, 368, 48, Star);
				fillPreThing(Brick, 416, 32, 2, 5, 8, 8);
				fillPreThing(Brick, 432, 16, 2, 3, 8, 8);
				fillPreThing(Brick, 432, 72, 2, 2, 8, 8);
				fillPreThing(Brick, 464, 32, 4, 1, 8, 8);
				fillPreThing(Brick, 464, 72, 5, 2, 8, 8);
				fillPreThing(Coin, 465, 39, 4, 1, 8, 8);
				pushPreThing(Koopa, 472, 12);
				fillPreThing(Brick, 496, 32, 2, 7, 8, 8);
				pushPreThing(Goomba, 494, 8);
				pushPreThing(Goomba, 510, 8);
				
				fillPreThing(Brick, 528, 72, 4, 2, 8, 8);
				fillPreThing(Brick, 536, 32, 1, 5, 8, 8);
				fillPreThing(Brick, 544, 32, 2, 1, 8, 8);
				pushPreThing(Coin, 545, 39);
				pushPreThing(Brick, 552, 40, Mushroom);
				
				fillPreThing(Brick, 576, 32, 2, 1, 8, 8);
				pushPreThing(Brick, 576, 40);
				fillPreThing(Brick, 576, 48, 2, 3, 8, 8);
				pushPreThing(Brick, 584, 40, Coin);
				pushPreThing(Goomba, 584, 72);
				
				fillPreThing(Brick, 608, 32, 4, 1, 8);
				fillPreThing(Brick, 608, 72, 4, 2, 8);
				fillPreThing(Goomba, 608, 40, 2, 1, 12);
				
				pushPreFloor(664, 0, 34);
				fillPreThing(Brick, 672, 40, 6, 2, 8, 8);
				fillPreThing(Coin, 674, 64, 6, 1, 8, 8);
				pushPreThing(Brick, 712, 88, [Mushroom, 1]);
				makeCeiling(720, 45);
				fillPreThing(Goomba, 768, 8, 3, 1, 12, 8);
				pushPrePipe(800, 0, 24, true, 2);
				pushPrePipe(848, 0, 32, true);
				pushPrePipe(896, 0, 16, true, false, 3);
				
				pushPreFloor(952, 0, 2);
				fillPreThing(Brick, 952, 8, 2, 3, 8, 8);
				
				pushPreFloor(984, 0, 12);
				pushPreThing(Stone, 1040, 8);
				pushPreThing(Stone, 1048, 16, 1, 2);
				pushPreThing(Stone, 1056, 24, 1, 3);
				pushPreThing(Stone, 1064, 32, 1, 4);
				pushPreThing(Stone, 1072, 32, 1, 4);
				pushPrePlatformGenerator(1096, 6, 1);
				// pushPreThing(PlatformGenerator, 1096, ceilmax, 6, 1);
				
				pushPreFloor(1144, 0, 8);
				fillPreThing(Brick, 1144, 40, 5, 1, 8, 8);
				pushPreThing(Koopa, 1152, 12, true);
				pushPreThing(Brick, 1184, 40, Mushroom);
				pushPrePlatformGenerator(1224, 6, -1);
				// pushPreThing(PlatformGenerator, 1224, ceilmax, 6, -1);
				
				pushPreFloor(1266, 0, 32);
				fillPreThing(Brick, 1266, 8, 17, 3, 8, 8);
				pushPreThing(PipeSide, 1314, 40, 4);
				pushPreThing(PipeVertical, 1330, 88, 64);
				makeCeiling(1274, 7);
				fillPreThing(Brick, 1346, 32, 7, 7, 8, 8);
				pushPreThing(ScrollEnabler, 1340, ceilmax);
				makeCeiling(1346, 17);
				pushPreWarpWorld(1400, 0, [[4,1],[3,1],[2,1]], 0, true);
				fillPreThing(Brick, 1506, 8, 2, 11, 8, 8);
			}),
			new Area("Underworld", function() {
				setLocationGeneration(2);
				
				pushPreFloor(0, 0, 17);
				fillPreThing(Brick, 0, 8, 1, 11, 8, 8);
				fillPreThing(Coin, 25, 7, 9, 1, 8, 8);
				fillPreThing(Brick, 24, 32, 9, 1, 8, 8);
				fillPreThing(Coin, 33, 39, 8, 1, 8, 8);
				pushPreThing(Brick, 96, 32, Coin);
				fillPreThing(Brick, 24, 64, 10, 4, 8, 8);
				fillPreThing(Brick, 104, 24, 2, 9, 8, 8);
				pushPreThing(PipeSide, 104, 16, 3);
				pushPreThing(PipeVertical, 120, 100, 100);
			}),
			new Area("Overworld", function() {
				setLocationGeneration(4);
				
				pushPrePattern("backreg", 104, 0, 1);
				pushPreFloor(0, 0, 58);
				pushPrePipe(0, 0, 16, false, false, 4);
				pushPreThing(Stone, 16, 8);
				pushPreThing(Stone, 24, 16, 1, 2);
				pushPreThing(Stone, 32, 24, 1, 3);
				pushPreThing(Stone, 40, 32, 1, 4);
				pushPreThing(Stone, 48, 40, 1, 5);
				pushPreThing(Stone, 56, 48, 1, 6);
				pushPreThing(Stone, 64, 56, 1, 7);
				pushPreThing(Stone, 72, 64, 2, 8);
				endCastleOutside(148);
			})
		];
	},
	World13(map) {
		map.time = 300;
		map.locs = [
			new Location(0, true)
		];
		map.areas = [
			new Area("Overworld", function() {
				setLocationGeneration(0);

				pushPreCastle();
				pushPrePattern("backcloud", 0, 4, 5);
				pushPreFloor(0, 0, 16);
				
				pushPreTree(144, 8, 4);
				pushPreTree(192, 32, 8);
				pushPreTree(208, 64, 5);
				fillPreThing(Coin, 217, 71, 3, 1, 8, 8, true);
				pushPreThing(Koopa, 240, 76, true);
				pushPreTree(256, 8, 3);
				pushPreThing(Coin, 266, 15);
				pushPreTree(280, 40, 5);
				fillPreThing(Coin, 297, 87, 2, 1, 8);
				pushPreTree(320, 72, 7);
				fillPreThing(Goomba, 352, 80, 2, 1, 16);
				pushPreTree(400, 0, 4);
				fillPreThing(Coin, 402, 55, 2, 1, 8, 8);
				pushPreThing(Platform, 440, 56, 6, [moveFloating, -4, 56]);
				pushPreTree(472, 0, 5);
				pushPreThing(Block, 472, 24, Mushroom);
				pushPreTree(480, 64, 4);
				fillPreThing(Coin, 482, 71, 4, 1, 8);
				pushPreTree(520, 0, 5);
				pushPreTree(560, 32, 3);
				pushPreThing(Koopa, 592, 76, true, [16, 88]);
				pushPreTree(608, 56, 6);
				pushPreThing(Goomba, 640, 64);
				fillPreThing(Coin, 681, 63, 2, 1, 8, 8);
				pushPreThing(Platform, 688, 40, 6, [moveSliding, 660, 720]);
				fillPreThing(Coin, 745, 71, 2, 1, 8, 8);
				pushPreThing(Platform, 752, 32, 6, [moveSliding, 700, 776]);
				fillPreThing(Coin, 777, 71, 2, 1, 8, 8);
				pushPreTree(784, 16, 4);
				pushPreTree(832, 48, 8);
				pushPreThing(Koopa, 880, 60, true);
				pushPreTree(904, 0, 3);
				fillPreThing(Coin, 906, 7, 3, 1, 8, 8);
				pushPreThing(Koopa, 912, 68, true, [4, 76]);
				pushPreTree(928, 32, 4);
				fillPreThing(Coin, 962, 63, 2, 1, 8, 8);
				pushPreTree(976, 32, 4);
				
				pushPreFloor(1032, 0, 46);
				pushPreThing(Platform, 1048, 56, 6, [moveSliding, 1008, 1076]);
				pushPreThing(Koopa, 1064, 12, true); 
				pushPreThing(Stone, 1104, 32, 1, 4);
				pushPreThing(Stone, 1112, 32, 1, 4);
				pushPreThing(Stone, 1120, 48, 1, 6);
				pushPreThing(Stone, 1128, 48, 1, 6);
				pushPreThing(Stone, 1136, 64, 1, 8);
				pushPreThing(Stone, 1144, 64, 1, 8);
				
				endCastleOutside(1220, 0, true, 11);
			})
		];
	},
	World14(map) {
		map.time = 300;
		map.locs = [
			new Location(0, startCastle)
		];
		map.areas = [
			new Area("Castle", function() {
				setLocationGeneration(0);
				
				startCastleInside();

				pushPreThing(Stone, 40, 88, 19, 3);
				pushPreFloor(40, 24, 8);
				fillPreWater(104, 8, 4);
				
				pushPreFloor(120, 24, 11);
				pushPreThing(Stone, 184, 64, 1, 1);
				pushPreThing(CastleBlock, 184, 56);
				makeCeilingCastle(192, 136);
				fillPreWater(208, 0, 6);
				
				pushPreFloor(232, 24, 3);
				pushPreThing(CastleBlock, 240, 24, 6);
				pushPreThing(Block, 240, 56, Mushroom);
				fillPreWater(256, 0, 6);
				
				pushPreThing(Stone, 280, 32, 37, 1);
				pushPreThing(Stone, 280, 24, 69, 3);
				pushPreFloor(280, 0, 93);
				pushPreThing(Stone, 296, 80, 35, 3);
				pushPreThing(CastleBlock, 296, 56);
				pushPreThing(CastleBlock, 392, 56, 6);
				pushPreThing(CastleBlock, 480, 56, 6);
				pushPreThing(CastleBlock, 536, 56, 6);
				pushPreThing(CastleBlock, 608, 32, 6);
				pushPreThing(Stone, 640, 80, 1, 1);
				pushPreThing(CastleBlock, 640, 72);
				pushPreThing(CastleBlock, 672, 32, 6);
				pushPreThing(Stone, 704, 80, 1, 1);
				pushPreThing(CastleBlock, 704, 72, 6, true);
				pushPreThing(CastleBlock, 736, 32);
				pushPreThing(Stone, 776, 80, 7, 2);
				pushPreThing(Block, 848, 32, Coin, true);
				pushPreThing(Block, 872, 32, Coin, true);
				pushPreThing(Block, 896, 32, Coin, true);
				pushPreThing(Block, 856, 64, Coin, true);
				pushPreThing(Block, 880, 64, Coin, true);
				pushPreThing(Block, 904, 64, Coin, true);
				pushPreThing(Stone, 928, 24, 4, 3);
				pushPreThing(Stone, 984, 24, 5, 3);
				pushPreThing(Stone, 984, 80, 5, 2);
				
				endCastleInside(1024);
				pushPreThing(Platform, 1108, 56, 4, [moveSliding, 1080, 1112]).object.nocollidechar = true;
			})
		];
	},
	World21(map) {
		map.locs = [
			new Location(0, true),
			new Location(0, false, 1260),
			new Location(0, exitPipeVert),
			new Location(1, enterCloudWorld),
			new Location(2)
		];
		map.areas = [
			new Area("Overworld", function() {
				setLocationGeneration(0);
				
				pushPreCastle(0, 0, true);
				pushPrePattern("backfence", 0, 0, 2);
				pushPrePattern("backfencemin", 768, 0, 1);
				pushPrePattern("backfence", 1152, 0, 2);
				
				pushPreFloor(0, 0, 92);
				pushPreThing(Brick, 120, Global.jumplev1);
				pushPreThing(Brick, 128, Global.jumplev1, Mushroom);
				pushPreThing(Brick, 136, Global.jumplev1);
				pushPreThing(Stone, 160, 8);
				pushPreThing(Stone, 168, 16, 1, 2);
				pushPreThing(Stone, 176, 24, 1, 3);
				pushPreThing(Stone, 184, 32, 1, 4);
				pushPreThing(Stone, 192, 40, 1, 5);
				pushPreThing(Goomba, 192, 48);
				pushPreThing(Block, 224, Global.jumplev1, false, true);
				pushPreThing(Block, 224, Global.jumplev2, [Mushroom, 1], true);
				fillPreThing(Brick, 232, Global.jumplev2, 3, 1, 8, 8);
				pushPreThing(Koopa, 256, 12); 
				pushPreThing(Koopa, 264, 12); 
				pushPreThing(Stone, 272, 32, 1, 4);
				pushPreThing(Stone, 280, 16, 1, 2);
				pushPreThing(Goomba, 336, 8);
				pushPreThing(Goomba, 348, 8);
				pushPrePipe(368, 0, 32, true);
				pushPreThing(Block, 424, Global.jumplev1, Mushroom);
				fillPreThing(Block, 424, Global.jumplev2, 5, 1, 8, 8);
				fillPreThing(Block, 432, Global.jumplev1, 4, 1, 8, 8);
				pushPreThing(Goomba, 472, 8);
				pushPreThing(Goomba, 484, 8);
				pushPreThing(Koopa, 528, 12);
				fillPreThing(Goomba, 544, 8, 3, 1, 12, 8);
				pushPreThing(Brick, 544, Global.jumplev1);
				pushPreThing(Brick, 552, Global.jumplev2, Star);
				fillPreThing(Brick, 560, Global.jumplev2, 3, 1, 8, 8);
				
				pushPrePipe(592, 0, 32, true);
				fillPreThing(Block, 632, Global.jumplev1, 4, 1, 8, 8);
				fillPreThing(Brick, 648, Global.jumplev2, 2, 1, 8, 8);
				pushPreThing(Brick, 664, Global.jumplev2, [Vine, 3]);
				fillPreThing(Brick, 672, Global.jumplev2, 2, 1, 8, 8);
				fillPreThing(Block, 680, Global.jumplev1, 3, 1, 8, 8);
				fillPreThing(Goomba, 704, 8, 3, 1, 12, 8);
				
				fillPreThing(Brick, 736, Global.jumplev2, 4, 1, 8, 8);
				pushPreFloor(768, 0, 10);
				pushPreThing(Goomba, 820, 40, 8, 8);
				pushPrePipe(824, 0, 32, true, 4);

				pushPreFloor(872, 0, 30);
				pushPreThing(Goomba, 916, 24, 8, 8);
				pushPrePipe(920, 0, 16, true, false, 2);
				pushPreThing(Goomba, 962, 8);
				pushPrePipe(976, 0, 32, true);
				pushPreThing(Brick, 1000, Global.jumplev2, Mushroom);
				fillPreThing(Brick, 1008, Global.jumplev2, 3, 1, 8, 8);
				pushPrePipe(1008, 0, 24);
				pushPrePipe(1040, 0, 40, true);
				pushPreThing(Koopa, 1096, 12);
				
				pushPreFloor(1136, 0, 10);
				pushPreThing(Koopa, 1200, 36, false, true);
				
				pushPreFloor(1232, 0, 72);
				pushPreThing(Stone, 1232, 24, 1, 3);
				pushPreThing(Brick, 1288, Global.jumplev1, Coin);
				fillPreThing(Goomba, 1296, 8, 2, 1, 12);
				fillPreThing(Brick, 1312, Global.jumplev2, 5, 1, 8);
				fillPreThing(Koopa, 1352, 12, 2, 1, 16);
				pushPreThing(Block, 1360, Global.jumplev1);
				pushPreThing(Block, 1374, Global.jumplev2, Mushroom);
				pushPrePipe(1408, 0, 24, true);
				pushPreThing(Koopa, 1480, 12);
				fillPreThing(Brick, 1480, Global.jumplev1, 2, 1, 8);
				pushPreThing(Block, 1488, Global.jumplev2, Coin, true);
				pushPreThing(Springboard, 1504, 14.5);
				fillPreThing(Stone, 1520, 80, 2, 1, 8, 8, 1, 10);
				endCastleOutside(1596);
			}),
			new Area("Sky", function() {
				setLocationGeneration(3);
				
				pushPreThing(Stone, 0, 0, 4);
				pushPreThing(Stone, 40, 0, 72);
				pushPreThing(Platform, 120, 32, 8, collideTransport);
				fillPreThing(Coin, 120, 64, 16, 1, 8);
				fillPreThing(Coin, 256, 80, 3, 1, 8);
				fillPreThing(Coin, 288, 72, 16, 1, 8);
				fillPreThing(Coin, 424, 80, 3, 1, 8);
				
				setExitLoc(1);
				// pushPreThing(LocationShifter, 609, -32, 2, [window.innerWidth / unitsize, 16]);
		}),
			new Area("Underworld", function() {
				setLocationGeneration(4);
				
				makeCeiling(32, 7);
				pushPreFloor(0, 0, 17);
				fillPreThing(Brick, 0, 8, 1, 11, 8, 8);
				fillPreThing(Brick, 32, 8, 7, 3, 8, 8);
				fillPreThing(Coin, 33, 31, 7, 2, 8, 16);
				fillPreThing(Coin, 41, 63, 5, 1, 8, 8);
				pushPreThing(PipeSide, 104, 16, 1);
				pushPreThing(PipeVertical, 120, 88, 88);
			})
		];
	},
	World22(map) {
		map.locs = [
			new Location(0, walkToPipe),
			new Location(1),
			new Location(2, exitPipeVert)
		];
		map.areas = [
			new Area("Overworld", function() {
				setLocationGeneration(0);

				pushPreCastle();
				pushPrePattern("backcloud", 0, 4, 2);
				pushPreFloor(0, 0, 24);
				pushPreThing(PipeSide, 80, 16, 1);
				pushPrePipe(96, 0, 32);
			}),
			new Area("Underwater", function() {
				setLocationGeneration(1);
				goUnderWater();
				
				pushPreFloor(0, 0, 67);
				pushPreThing(Coral, 96, 24, 3);
				fillPreThing(Coin, 120, 7, 2, 1, 8);
				pushPreThing(Stone, 152, Global.jumplev1, 3, 1);
				pushPreThing(Blooper, 184, 16);
				fillPreThing(Coin, 224, Global.jumplev2, 3, 1, 8);
				pushPreThing(Coral, 272, 40, 5);
				fillPreThing(Coin, 296, 7, 3, 1, 8);
				pushPreThing(Stone, 344, Global.jumplev1, 2, 1);
				pushPreThing(Coral, 344, Global.jumplev1 + 16, 2);
				pushPreThing(Blooper, 376, Global.jumplev1);
				pushPreThing(Coral, 408, 32, 4);
				pushPreThing(Blooper, 448, 24);
				pushPreThing(Stone, 520, 24, 1, 3);
				pushPreThing(Stone, 528, 40, 1, 5);
				fillPreThing(Coin, 546, 23, 3, 1, 8);
				
				pushPreFloor(576, 0, 60);
				pushPreThing(Stone, 576, 40, 1, 5);
				pushPreThing(Stone, 584, 24, 1, 3);
				pushPreThing(CheepCheep, 616, 24, false, false);
				pushPreThing(Stone, 632, 24, 2, 3);
				pushPreThing(Stone, 632, 88, 2, 3);
				pushPreThing(CheepCheep, 640, 48, false, false);
				pushPreThing(CheepCheep, 656, 16, false, false);
				pushPreThing(Stone, 664, 64, 3, 1);
				pushPreThing(Blooper, 672, 40, false, false);
				pushPreThing(Coral, 672, 80, 2);
				pushPreThing(Coral, 720, 24, 3);
				pushPreThing(Blooper, 760, 80);
				pushPreThing(CheepCheep, 760, 56, false, false);
				pushPreThing(CheepCheep, 784, 80, true, false);
				fillPreThing(Coin, 816, 15, 3, 1, 8);
				pushPreThing(CheepCheep, 816, 24, false, false);
				pushPreThing(Stone, 824, 32, 2, 1);
				pushPreThing(Coral, 824, 64, 4);
				pushPreThing(Blooper, 848, 16);
				fillPreThing(Coin, 912, 55, 3, 1, 8, 8);
				pushPreThing(Stone, 928, 40, 2, 1);
				pushPreThing(CheepCheep, 944, 72, false, false);
				pushPreThing(Coral, 968, 32, 4);
				pushPreThing(CheepCheep, 1032, 24, true, false);
				pushPreThing(Stone, 1040, 32, 1, 4);
				pushPreThing(Stone, 1048, 16, 1, 2);
				pushPreThing(CheepCheep, 1056, 16, false, false);
				pushPreThing(Stone, 1056, 88, 1, 3);
				pushPreThing(Stone, 1064, 72, 8, 1);
				pushPreThing(Coin, 1072, 15);
				fillPreThing(Coin, 1080, 7, 3, 1, 8);
				pushPreThing(Coin, 1104, 15);
				pushPreThing(CheepCheep, 1100, 40, false, false);
				pushPreFloor(1128, 0, 17);
				pushPreThing(Stone, 1128, 16, 1, 2);
				pushPreThing(Stone, 1136, 32, 1, 4);
				pushPreThing(CheepCheep, 1160, 32, false, false);
				pushPreThing(Coral, 1184, 16, 2);
				pushPreThing(Coral, 1200, 24, 3);
				pushPreThing(CheepCheep, 1206, 56, true, false);
				pushPreThing(Stone, 1256, 64, 1, 8);
				pushPreThing(Stone, 1264, 64, 2, 1);
				fillPreThing(Coin, 1281, 32, 3, 2, 8, -24);
				pushPreThing(Stone, 1304, 64, 2, 1);
				pushPreFloor(1320, 0, 40);
				pushPreThing(Stone, 1320, 64, 1, 8);
				pushPreThing(CheepCheep, 1320, 80, false, false);
				pushPreThing(CheepCheep, 1344, 16, true, false);
				fillPreThing(Stone, 1384, 32, 1, 2, 0, 32, 5, 1);
				pushPreThing(Coral, 1392, 80, 2);
				pushPreThing(CheepCheep, 1408, 40, false, false);
				fillPreThing(Stone, 1448, 32, 1, 2, 0, 32, 4, 1);
				pushPreThing(CheepCheep, 1472, 72, true, false);
				pushPreThing(CheepCheep, 1496, 48, true, false);
				
				pushPreThing(Stone, 1488, 8, 5, 1);
				pushPreThing(Stone, 1496, 16, 4, 1);
				pushPreThing(Stone, 1504, 24, 3, 1);
				pushPreThing(Stone, 1512, 32, 2, 1);
				pushPreThing(Stone, 1512, 88, 2, 4);
				pushPreThing(PipeSide, 1520, 48, 2, true);
				pushPreThing(Stone, 1528, 88, 14, 11);
			}),
			new Area("Overworld", function() {
				setLocationGeneration(2);
			
				pushPrePattern("backreg", 104, 0, 1);
				pushPreFloor(0, 0, 42);
				pushPrePipe(0, 0, 16, false, false, 2);
				pushPreThing(Stone, 16, 8, 1, 1);
				pushPreThing(Stone, 24, 16, 1, 2);
				pushPreThing(Stone, 32, 24, 1, 3);
				pushPreThing(Stone, 40, 32, 1, 4);
				pushPreThing(Stone, 48, 40, 1, 5);
				pushPreThing(Stone, 56, 48, 1, 6);
				pushPreThing(Stone, 64, 56, 1, 7);
				pushPreThing(Stone, 72, 64, 2, 8);
				endCastleOutside(148);
			})
		];
	},
	World23(map) {
		map.time = 300;
		map.locs = [
			new Location(0, true)
		];
		map.areas = [
			new Area("Overworld", function() {
				setLocationGeneration(0);
				
				pushPreCastle();
				pushPrePattern("backcloud", 0, 4, 5);
				
				pushPreFloor(0, 0, 7);
				zoneStartCheeps(64);
				pushPreTree(64, 0, 8);
				pushPreThing(Stone, 80, 8);
				pushPreThing(Stone, 88, 16, 1, 2);
				pushPreThing(Stone, 96, 24, 1, 3);
				pushPreThing(Stone, 104, 24, 1, 3);
				pushPreThing(Stone, 112, 24, 1, 3);
				pushPreBridge(120, 24, 16);
				pushPreThing(Stone, 248, 24, 1, DtB(24, 8));
				pushPreBridge(256, 24, 15);
				fillPreThing(Coin, 290, 63, 4, 1, 8, 8);
				pushPreThing(Stone, 376, 24, 1, DtB(24, 8));
				pushPreBridge(384, 24, 16);
				fillPreThing(Coin, 441, 63, 3, 1, 16);
				fillPreThing(Coin, 449, 55, 2, 1, 16);
				pushPreThing(Stone, 504, 24, 1, DtB(24, 8));

				
				pushPreThing(Stone, 544, 24, 1, DtB(24, 8));
				pushPreBridge(552, 24, 10);
				fillPreThing(Coin, 578, 63, 2, 1, 24);
				fillPreThing(Coin, 586, 71, 2, 1, 8);
				pushPreThing(Stone, 632, 24, 1, DtB(24, 8));
				
				
				pushPreThing(Stone, 672, 24, 1, 64);
				pushPreBridge(680, 24, 10);
				pushPreThing(Stone, 760, 24, 1, 64);
				
				fillPreThing(Coin, 777, 63, 3, 1, 8);
				pushPreThing(Stone, 792, 32, 1, 64);
				pushPreBridge(800, 32, 5, [true, true]);
				pushPreThing(Block, 816, 64, Mushroom);
				
				fillPreThing(Coin, 865, 63, 3, 1, 8);
				pushPreTree(896, 0, 8);
				pushPreBridge(976, 24, 3);
				
				pushPreBridge(1024, 24, 15, [true, true]);
				fillPreThing(Coin, 1065, 63, 6, 1, 8);
				
				pushPreBridge(1176, 8, 8, [true, true]);
				fillPreThing(Coin, 1193, 39, 4, 1, 8);
				
				pushPreBridge(1280, 24, 8, [true, true]);
				
				pushPreBridge(1368, 24, 2);
				fillPreThing(Coin, 1385, 55, 6, 1, 8);
				pushPreBridge(1400, 24, 2);
				pushPreBridge(1432, 24, 2);
				pushPreBridge(1472, 24, 9, [true]);
				pushPreTree(1536, 0, 13);
				pushPreThing(Stone, 1544, 24, 1, 3);
				pushPreThing(Stone, 1552, 24, 1, 3);
				pushPreThing(Stone, 1560, 16, 1, 2);
				pushPreThing(Stone, 1568, 8, 1, 1);
				zoneStopCheeps(1600);
				
				pushPreFloor(1656, 0, 35);
				pushPreThing(Stone, 1664, 8, 1, 1);
				pushPreThing(Stone, 1672, 16, 1, 2);
				pushPreThing(Stone, 1680, 24, 1, 3);
				pushPreThing(Stone, 1688, 32, 1, 4);
				pushPreThing(Stone, 1696, 40, 1, 5);
				pushPreThing(Stone, 1704, 48, 1, 6);
				pushPreThing(Stone, 1712, 56, 1, 7);
				pushPreThing(Stone, 1720, 64, 1, 8);
				pushPreThing(Stone, 1728, 64, 1, 8);
				
				endCastleOutside(1796, 0, true, 6);
			})
		];
	},
	World24(map) {
		map.time = 300;
		map.locs = [
			new Location(0, startCastle)
		];
		map.areas = [
			new Area("Castle", function() {
				setLocationGeneration(0);
				
				startCastleInside();
				
				makeCeilingCastle(40, 11, 3);
				pushPreFloor(40, 24, 11);
				
				fillPreWater(128, 0, 32);
				pushPreThing(Podoboo, 128, -32);
				pushPreThing(Stone, 144, 32, 2, 1);
				pushPreThing(Stone, 176, 48, 3, 1);
				pushPreThing(CastleBlock, 184, 48);
				pushPreThing(Block, 184, 80, Mushroom);
				pushPreThing(Stone, 216, 32, 2, 1);
				pushPreThing(Podoboo, 240, -32);
				
				pushPreFloor(256, 0, 52);
				pushPreThing(Stone, 256, 24, 2, 3);
				makeCeilingCastle(272, 49, 4);
				pushPreThing(Stone, 296, Global.jumplev1, 36, 1);
				pushPreThing(CastleBlock, 344, 0);
				pushPreThing(CastleBlock, 392, Global.jumplev1, 6);
				pushPreThing(CastleBlock, 440, 0);
				pushPreThing(CastleBlock, 440, Global.jumplev2, 6);
				pushPreThing(CastleBlock, 488, Global.jumplev1, 6);
				pushPreThing(CastleBlock, 536, 0);
				pushPreThing(CastleBlock, 584, Global.jumplev1, 6);
				pushPreThing(Stone, 640, 24, 4, 3)
				pushPreThing(CastleBlock, 656, 56, 6);
				
				pushPrePlatformGenerator(686, 3, -1);
				pushPrePlatformGenerator(710, 3, 1);
				
				pushPreFloor(736, 16);
				pushPreThing(CastleBlock, 736, 24, 6, true);
				pushPreFloor(744, 24, 6);
				makeCeilingCastle(744, 6, 3);
				pushPreFloor(792, 0, 10);
				fillPreThing(Coin, 817, 7, 3, 2, 8, 32);
				pushPreThing(CastleBlock, 824, 16);
				fillPreWater(872, 0, 4);
				pushPreThing(Stone, 864, 24, 1, 3);
				pushPreFloor(888, 24, 2);
				fillPreWater(904, 0, 4);
				
				pushPreFloor(920, 0, 13);
				pushPreThing(Stone, 920, 24, 5, 3);
				makeCeilingCastle(920, 13, 3);
				fillPreThing(Stone, 976, 24, 2, 1, 32, 0, 2, 3);
				
				fillPreThing(Brick, 1024, 64, 6, 1, 8);
				endCastleInside(1024);
			})
		];
	},
	World31(map) {
		map.time = 300;
		map.locs = [
			new Location(0, true),
			new Location(0, exitPipeVert),
			new Location(0, false, 1272),
			new Location(1),
			new Location(2, enterCloudWorld)
		];
		map.areas = [
			new Area("Overworld Night Alt", function() {
				setLocationGeneration(0);
				
				pushPreCastle(0, 0, true);
				pushPrePattern("backfence", 0, 0, 5);
				
				pushPreFloor(0, 0, 45);
				pushPreThing(Block, 128, Global.jumplev1);
				pushPreThing(Block, 152, Global.jumplev1 + 8);
				pushPreThing(Block, 176, 40, Mushroom);
				pushPreThing(Koopa, 200, 12, false, true);
				fillPreThing(Brick, 208, Global.jumplev1, 3, 1, 8);
				pushPreThing(Koopa, 224, 20, false, true);
				pushPrePipe(256, 0, 24, true);
				pushPreThing(Goomba, 296, 8);
				pushPrePipe(304, 0, 32, true, 3);
				
				pushPreFloor(384, 0, 29);
				fillPreThing(Goomba, 424, 8, 3, 1, 12);
				pushPrePipe(456, 0, 24, true);
				pushPreThing(Brick, 488, Global.jumplev1);
				pushPreThing(Koopa, 520, 12);
				pushPrePipe(536, 0, 16, true, false, 1);
				pushPreThing(Stone, 584, 8);
				pushPreThing(Stone, 592, 16, 1, 2);
				pushPreThing(Stone, 600, 24, 1, 3);
				pushPreThing(Stone, 608, 32, 1, 4);
				fillPreWater(616, 10, 16);
				pushPreBridge(616, 32, 8);
				fillPreThing(Goomba, 656, 40, 3, 1, 12);
				pushPreThing(Block, 656, Global.jumplev2, [Mushroom, 1], true);
				pushPreFloor(680, 0, 1);
				pushPreThing(Stone, 680, 32, 1, 4);
				fillPreWater(688, 10, 4);
				
				pushPreFloor(704, 0, 40);
				pushPreThing(Stone, 704, 32, 1, 4);
				pushPreThing(Stone, 712, 16, 1, 2);
				pushPreThing(Brick, 720, Global.jumplev2, Star);
				fillPreThing(Brick, 728, Global.jumplev2, 2, 1, 8);
				fillPreThing(Goomba, 752, 8, 2, 1, 12);
				pushPreThing(Koopa, 808, 12);
				pushPrePipe(824, 0, 32, true);
				fillPreThing(Brick, 888, Global.jumplev1, 11, 1, 8);
				fillPreThing(Brick, 888, Global.jumplev2, 2, 1, 8);
				pushPreThing(HammerBro, 904, Global.jumplev1+12);
				pushPreThing(Block, 904, Global.jumplev2);
				fillPreThing(Brick, 912, Global.jumplev2, 3, 1, 8);
				pushPreThing(HammerBro, 936, 12);
				pushPreThing(Block, 936, Global.jumplev2, Mushroom);
				fillPreThing(Brick, 944, Global.jumplev2, 3, 1, 8);
				pushPreThing(Springboard, 1008, 14.5);
				
				fillPreThing(Brick, 1032, 40, 3, 1, 8);
				fillPreThing(Brick, 1032, 64, 2, 1, 8);
				pushPreThing(Brick, 1048, 64, [Vine, 4]);
				
				pushPreFloor(1056, 0, 10);
				pushPreThing(Stone, 1088, 8);
				pushPreThing(Stone, 1096, 16, 1, 2);
				pushPreThing(Stone, 1104, 24, 1, 3);
				pushPreThing(Stone, 1112, 32, 1, 4);
				pushPreThing(Goomba, 1112, 40);
				pushPreThing(Stone, 1120, 40, 1, 5);
				pushPreThing(Goomba, 1120, 48);
				pushPreThing(Stone, 1128, 48, 1, 6);
				
				pushPreFloor(1152, 0, 33);
				pushPreThing(Koopa, 1192, 12);
				fillPreThing(Brick, 1200, Global.jumplev1, 2, 2, 16, 32);
				fillPreThing(Block, 1208, Global.jumplev1, 1, 2, 0, 32);
				pushPreThing(Koopa, 1216, 76);
				fillPreThing(Goomba, 1232, 8, 3, 1, 12);
				fillPreThing(Brick, 1240, Global.jumplev1, 2, 2, 16, 32);
				pushPreThing(Block, 1248, Global.jumplev1, Mushroom);
				pushPreThing(Block, 1248, Global.jumplev2);
				pushPreThing(Koopa, 1320, 12, false, true);
				pushPreThing(Brick, 1328, Global.jumplev1);
				pushPreThing(Brick, 1336, Global.jumplev1, Coin);
				pushPreThing(Koopa, 1344, 18, false, true);
				fillPreThing(Brick, 1344, Global.jumplev1, 3, 1, 8);
				pushPreThing(Koopa, 1360, 44);
				pushPreThing(Koopa, 1368, 12, false, true);
				pushPreThing(Stone, 1392, 24, 1, 3);
				pushPreThing(Stone, 1400, 48, 1, 6);
				
				pushPreFloor(1440, 0, 40);
				pushPreThing(Stone, 1464, 8);
				pushPreThing(Stone, 1472, 16, 1, 2);
				pushPreThing(Stone, 1480, 24, 1, 3);
				pushPreThing(Stone, 1488, 32, 1, 4);
				pushPreThing(Stone, 1496, 40, 1, 5);
				pushPreThing(Stone, 1504, 48, 1, 6);
				pushPreThing(Koopa, 1504, 60);
				pushPreThing(Stone, 1512, 56, 1, 7);
				pushPreThing(Stone, 1520, 64, 2, 8);
				pushPreThing(Koopa, 1528, 76);
				
				endCastleOutside(1596);
			}),
			new Area("Underworld", function() {
				setLocationGeneration(3);
				pushPreFloor(0, 0, 17);
				fillPreThing(Brick, 0, 8, 1, 11, 8, 8);
				fillPreThing(Brick, 24, 40, 2, 4, 72, 8);
				fillPreThing(Brick, 32, 32, 2, 1, 56);
				fillPreThing(Brick, 32, 56, 2, 2, 56, 8);
				fillPreThing(Coin, 33, 39, 2, 1, 56);
				fillPreThing(Brick, 40, 40, 2, 1, 40);
				pushPreThing(Brick, 40, 64, Mushroom);
				fillPreThing(Coin, 41, 47, 2, 1, 40);
				fillPreThing(Brick, 48, 48, 2, 1, 24);
				fillPreThing(Coin, 49, 55, 2, 2, 24, 16);
				fillPreThing(Brick, 56, 56, 2, 2, 8, 8);
				fillPreThing(Coin, 57, 71, 2, 2, 8, 8);
				pushPreThing(Brick, 80, 64);
				pushPreThing(PipeSide, 104, 16, 1);
				pushPreThing(PipeVertical, 120, 88, 88);
			}),
			new Area("Sky Night", function() {
				setLocationGeneration(4);
				pushPreThing(Stone, 0, 0, 4);
				pushPreThing(Stone, 40, 0, 78);
				pushPreThing(Platform, 128, 24, 6, collideTransport);
				fillPreThing(Coin, 121, 55, 16, 1, 8);
				pushPreThing(Stone, 256, 40);
				fillPreThing(Coin, 273, 55, 16, 1, 8);
				pushPreThing(Stone, 408, 48, 1, 2);
				fillPreThing(Coin, 425, 63, 7, 1, 8);
				pushPreThing(Stone, 488, 48, 1, 2);
				pushPreThing(Stone, 536, 56, 2);
				fillPreThing(Stone, 568, 56, 5, 1, 16);
				fillPreThing(Coin, 569, 63, 10, 1, 8);
				fillPreThing(Coin, 681, 15, 3, 1, 8);
				
				setExitLoc(2);
			})
		];
	},
	World32(map) {
		map.time = 300;
		map.locs = [
			new Location(0, true)
		];
		map.areas = [
			new Area("Overworld Night Alt", function() {
				setLocationGeneration(0);

				pushPreCastle();
				pushPrePattern("backfence", -384, 0, 6);
				pushPreFloor(0, 0, 80);
				pushPreThing(Koopa, 136, 12);
				fillPreThing(Goomba, 192, 8, 3, 1, 12);
				fillPreThing(Koopa, 264, 12, 3, 1, 12);
				fillPreThing(Koopa, 344, 12, 2, 1, 12);
				pushPreThing(Stone, 392, 8);
				fillPreThing(Coin, 441, Global.jumplev1-1, 3, 1, 8);
				pushPreThing(Stone, 480, 24, 1, 3);
				pushPreThing(Block, 480, 56, Mushroom);
				pushPreThing(Koopa, 528, 12);
				fillPreThing(Goomba, 568, 8, 3, 1, 12);
				pushPreThing(Stone, 600, 16, 1, 2);
				pushPreThing(Brick, 616, Global.jumplev1, Coin);
				pushPreThing(Brick, 616, Global.jumplev2, Star);
				pushPreThing(Koopa, 624, 12);
				pushPreThing(Stone, 632, 16, 1, 2);
				
				pushPreFloor(656, 0, 41);
				pushPreThing(Koopa, 736, 34, false, true);
				pushPreThing(Koopa, 888, 12);
				fillPreThing(Goomba, 952, 8, 3, 1, 12);
				
				pushPreFloor(1000, 0, 3);
				pushPreThing(Stone, 1008, 16, 1, 2);
				pushPreThing(Brick, 1008, 56);
				
				pushPreFloor(1040, 0, 94);
				pushPreThing(Koopa, 1072, 12);
				fillPreThing(Koopa, 1120, 12, 3, 1, 12);
				fillPreThing(Koopa, 1200, 12, 2, 1, 12);
				fillPreThing(Koopa, 1296, 12, 3, 1, 12);
				fillPreThing(Coin, 1345, 55, 4, 1, 8);
				pushPrePipe(1352, 0, 24, true);
				pushPreThing(Koopa, 1400, 12);
				fillPreThing(Goomba, 1432, 8, 3, 1, 12);
				fillPreThing(Goomba, 1504, 8, 3, 1, 12);
				pushPreThing(Stone, 1536, 8);
				pushPreThing(Stone, 1544, 16, 1, 2);
				pushPreThing(Stone, 1552, 24, 1, 3);
				pushPreThing(Stone, 1560, 32, 1, 4);
				pushPreThing(Stone, 1568, 40, 1, 5);
				pushPreThing(Stone, 1576, 48, 1, 6);
				pushPreThing(Stone, 1584, 56, 1, 7);
				pushPreThing(Stone, 1592, 64, 1, 8);
				pushPreThing(Stone, 1600, 64, 1, 8);
				
				endCastleOutside(1668);
			})
		];
	},
	World33(map) {
		map.time = 300;
		map.locs = [
			new Location(0, true)
		];
		map.areas = [
			new Area("Overworld Night", function() {
				setLocationGeneration(0);

				pushPreCastle();
				pushPrePattern("backcloud", 0, 4, 7);
				pushPreFloor(0, 0, 16);
				
				pushPreTree(144, 24, 5);
				pushPreTree(176, 48, 6);
				pushPreThing(Goomba, 208, 56);
				pushPreThing(Platform, 240, 72, 6, [moveSliding, 228, 260]);
				pushPreTree(240, 0, 3);
				fillPreThing(Coin, 249, 7, 2, 1, 8);
				pushPreThing(Platform, 264, 40, 6, [moveSliding, 244, 276]);
				pushPreTree(288, 8, 7);
				pushPreThing(Coin, 298, 55);
				fillPreThing(Coin, 337, 55, 3, 1, 8);
				pushPreTree(344, 32, 4);
				pushPreTree(368, 16, 10);
				pushPreTree(376, 48, 6);
				pushPreThing(Block, 392, 80, Mushroom);
				fillPreThing(Coin, 417, 31, 3, 1, 8);
				pushPreThing(Koopa, 416, 60, true);
				pushPreThing(Koopa, 432, 28, true);
				pushPreTree(440, 80, 4);
				fillPreThing(Coin, 449, 87, 2, 1, 8);
				pushPreThing(Platform, 482, 56, 6, moveFalling);
				
				pushPreTree(520, 0, 16);
				pushPreTree(520, 48, 3);
				pushPreThing(Coin, 529, 55);
				pushPreTree(552, 48, 3);
				pushPreThing(Coin, 561, 55);
				pushPreThing(Koopa, 584, 12, true);
				pushPreTree(584, 48, 3);
				pushPreThing(Coin, 593, 55);
				pushPreTree(616, 72, 3);
				pushPreThing(Coin, 625, 79);
				
				pushPreScale(660, 86, 14, [6, 6, 10]);
				pushPreTree(672, 16, 4);
				
				
				pushPreThing(Platform, 752, 32, 6, moveFalling);
				pushPreThing(Platform, 768, 64, 6, moveFalling);
				pushPreTree(776, 32, 3);
				pushPreThing(Platform, 824, 16, 6, moveFalling);
				pushPreTree(832, 64, 4);
				fillPreThing(Coin, 841, 71, 2, 1, 8);
				pushPreTree(856, 16, 5);
				pushPreThing(Coin, 865, 23);
				pushPreTree(864, 48, 3);
				pushPreThing(Coin, 873, 55);
				
				pushPreThing(Koopa, 912, 66, true, [14, 66]);
				pushPreTree(928, 0, 3);
				pushPreTree(952, 24, 12);
				fillPreThing(Koopa, 992, 36, 2, 1, 14, 0, true); 
				pushPreThing(Platform, 1056, 56, 6);
				
				pushPreScale(1100, 86, 8, [6, 4, 10]);
				
				pushPreFloor(1152, 0, 32);
				endCastleOutside(1204, 0, true, 13, 28);
			})
		];
	},
	World34(map) {
		map.time = 300;
		map.locs = [
			new Location(0, startCastle)
		];
		map.areas = [
			new Area("Castle", function() {
				setLocationGeneration(0);

				startCastleInside();
				
				makeCeilingCastle(40, 11, 3);
				pushPreFloor(40, 24, 11);
				pushPreThing(Podoboo, 128, -32);
				makeCeilingCastle(128, 112);
				
				pushPreFloor(144, 24, 3);
				pushPreThing(CastleBlock, 152, 16, 6);
				pushPreFloor(184, 24, 3);
				pushPreThing(CastleBlock, 192, 16, 6);
				pushPreThing(Podoboo, 208, -32);
				pushPreFloor(224, 24, 3);
				pushPreThing(CastleBlock, 232, 16, 6);
				
				pushPreFloor(264, 0, 13);
				pushPreThing(Stone, 264, 24, 2, 3);
				pushPreThing(Stone, 280, 80, 11, 2);
				pushPreThing(Block, 336, Global.jumplev1);
				pushPreThing(Block, 344, Global.jumplev1, Mushroom);
				pushPreThing(Block, 352, Global.jumplev1);
				
				pushPreFloor(384, 0, 40);
				pushPreThing(Stone, 424, 8, 3, 1);
				pushPreThing(Stone, 424, 80, 3, 2);
				pushPreThing(CastleBlock, 432, 16, 6, true);
				pushPreThing(CastleBlock, 432, 64, 6);
				pushPreThing(Stone, 504, 8, 3, 1);
				pushPreThing(Stone, 504, 80, 3, 2);
				pushPreThing(CastleBlock, 512, 16, 6, true);
				pushPreThing(CastleBlock, 512, 64, 6);
				pushPreThing(Stone, 632, 8, 3, 1);
				pushPreThing(Stone, 632, 80, 3, 2);
				pushPreThing(CastleBlock, 640, 16, 6);
				pushPreThing(CastleBlock, 640, 64, 6, true);
				pushPreThing(Podoboo, 704, -32);
				fillPreWater(704, 0, 4);
				
				pushPreFloor(720, 24, 6);
				pushPreThing(Stone, 720, 80, 6, 2);
				fillPreWater(768, 0, 6);
				pushPreThing(Podoboo, 776, -32);
				pushPreFloor(792, 24, 3);
				fillPreWater(816, 0, 6);
				pushPreThing(Podoboo, 824, -32);
				pushPreFloor(840, 24, 3);
				fillPreWater(864, 0, 6);
				pushPreThing(Podoboo, 872, -32);
				pushPreFloor(888, 0, 17);
				pushPreThing(Stone, 888, 24, 5, 3);
				pushPreThing(Stone, 888, 80, 17, 2);
				pushPreThing(Stone, 944, 24, 10, 3);
				
				endCastleInside(1024, 0);
				fillPreThing(Brick, 1056, 64, 2, 3, 8, 8);
			})
		];
	},
	World41(map) {
		map.locs = [
			new Location(0, true),
			new Location(0, exitPipeVert),
			new Location(1)
		];
		map.areas = [
			new Area("Overworld", function() {
				setLocationGeneration(0);
				
				pushPreCastle(0, 0, true);
				pushPrePattern("backreg", 0, 0, 5);
				pushPreFloor(0, 0, 32);
				pushPrePipe(168, 0, 24, true);
				pushPreThing(Block, 200, Global.jumplev1, Mushroom);
				pushPreThing(Block, 200, Global.jumplev2);
				pushPreThing(Lakitu, 212, 84);
				
				pushPreFloor(272, 0, 44);
				fillPreThing(Coin, 329, 31, 2, 1, 24);
				fillPreThing(Coin, 337, 39, 2, 1, 8);
				fillPreThing(Block, 512, Global.jumplev1, 2, 2, 16, 32);
				
				pushPreFloor(656, 0, 67);
				fillPreThing(Block, 720, Global.jumplev1, 4, 1, 8);
				pushPreThing(Block, 736, Global.jumplev2, [Mushroom, 1], true);
				pushPreThing(Stone, 824, 24, 1, 3);
				fillPreThing(Coin, 841, 55, 4, 1, 8);
				pushPrePipe(928, 0, 32, true);
				fillPreThing(Coin, 953, 55, 4, 1, 8);
				pushPrePipe(1056, 0, 32, true, 2);
				fillPreThing(Coin, 1081, 55, 4, 1, 8);
				fillPreThing(Block, 1168, Global.jumplev1, 2, 1, 8);
				pushPreThing(Block, 1184, Global.jumplev1, Mushroom);
				fillPreThing(Block, 1184, Global.jumplev2, 4, 1, 8);
				fillPreThing(Brick, 1192, Global.jumplev1, 2, 1, 8);
				fillPreThing(Block, 1208, Global.jumplev1, 3, 1, 8);
				
				pushPreFloor(1208, 0, 23);
				pushPrePipe(1304, 0, 16, true, false, 1);
				
				pushPreFloor(1416, 0, 3);
				pushPreFloor(1456, 0, 8);
				pushPreThing(Stone, 1512, 24, 1, 3);
				
				pushPreFloor(1536, 0, 48);
				pushPreFuncCollider(1664, zoneDisableLakitu); // not sure if accurate
				pushPreThing(Stone, 1664, 8);
				pushPreThing(Stone, 1672, 16, 1, 2);
				pushPreThing(Stone, 1680, 24, 1, 3);
				pushPreThing(Stone, 1688, 32, 1, 4);
				pushPreThing(Stone, 1696, 40, 1, 5);
				pushPreThing(Stone, 1704, 48, 1, 6);
				pushPreThing(Stone, 1712, 56, 1, 7);
				pushPreThing(Stone, 1720, 64, 2, 8);
				pushPreThing(Brick, 1760, Global.jumplev1, Coin);
				endCastleOutside(1796);
			}),
			new Area("Underworld", function() {
				setLocationGeneration(2);
				
				makeCeiling(32, 11);
				pushPreFloor(0, 0, 17);
				fillPreThing(Brick, 0, 8, 1, 11, 8, 8);
				fillPreThing(Brick, 24, 16, 1, 3, 8, 8);
				fillPreThing(Coin, 25, 39, 8, 1, 8);
				fillPreThing(Coin, 25, 7, 10, 1, 8);
				fillPreThing(Brick, 32, 32, 6, 1, 8);
				fillPreThing(Brick, 80, 16, 1, 3, 8, 8);
				pushPreThing(PipeSide, 104, 16, 1);
				pushPreThing(Brick, 104, 32, Mushroom);
				pushPreThing(PipeVertical, 120, 88, 88);
			})
		];
	},
	World42(map) {
		map.locs = [
			new Location(0, walkToPipe),
			new Location(1),
			new Location(1, exitPipeVert),
			new Location(2),
			new Location(3, exitPipeVert),
			new Location(4, enterCloudWorld)
		];
		map.areas = [
			new Area("Overworld", function() { // entrance - loc 0
				setLocationGeneration(0);
				pushPreCastle();
				pushPrePattern("backcloud", 0, 4, 1);
				pushPreFloor(0, 0, 24);
				pushPreThing(PipeSide, 80, 16, 1);
				pushPrePipe(96, 0, 32);
			}),
			new Area("Underworld", function() { // main underworld - locs 1 (entryNormal), 2 (exitPipeVert)
				setLocationGeneration(1);

				fillPreThing(Brick, 0, 8, 1, 11, 8, 8);
				pushPreFloor(0, 0, 11);
				makeCeiling(48, 51);
				
				pushPreFloor(104, 0, 2);
				pushPreFloor(136, 0, 1);
				
				fillPreThing(Brick, 160, 64, 23, 3, 8, 8);
				pushPreFloor(168, 0, 36);
				fillPreThing(Brick, 176, 16, 5, 3, 8, 8);
				pushPreThing(Brick, 216, 32);
				fillPreThing(Coin, 217, 7, 3, 1, 8);
				pushPreThing(Brick, 224, 32, Mushroom);
				fillPreThing(Brick, 240, 8, 18, 4, 8, 8);
				fillPreThing(Goomba, 344, 40, 3, 1, 12);
				pushPreThing(Brick, 344, 64);
				pushPreThing(Brick, 344, 72, Coin);
				pushPreThing(Brick, 344, 80);
				fillPreThing(Brick, 352, Global.jumplev2, 4, 3, 8, 8);
				fillPreThing(Block, 400, Global.jumplev1, 2, 2, 8, 32);
				fillPreThing(Block, 432, Global.jumplev1, 2, 1, 16);
				pushPreThing(Block, 440, Global.jumplev1, Mushroom);
				
				pushPrePlatformGenerator(470, 6, 1);
				// pushPreThing(PlatformGenerator, 470, ceilmax, 6, 1);
				
				pushPreFloor(504, 0, 42);
				pushPreThing(Block, 504, 40, Coin, true);
				pushPreThing(Block, 512, 48, Coin, true);
				pushPreThing(Brick, 512, 64, [Vine, 5]); // goes to bonus overworld
				pushPreThing(Block, 520, 40, Coin, true);
				fillPreThing(Brick, 520, 64, 2, 1, 8);
				pushPreThing(Block, 528, 32, Coin, true);
				makeCeiling(536, 45);
				pushPrePipe(576, 0, 24, true);
				pushPreThing(Brick, 608, Global.jumplev1);
				pushPreThing(Koopa, 616, 12);
				pushPreThing(Brick, 616, Global.jumplev1, Coin);
				pushPrePipe(624, 0, 56, true);
				pushPreThing(Brick, 640, Global.jumplev1);
				pushPreThing(Brick, 648, Global.jumplev1, Star);
				pushPreThing(Beetle, 664, 8.5);
				pushPrePipe(672, 0, 24, true, 3); // goes to second underworld
				pushPreThing(Brick, 696, 40);
				pushPreThing(Beetle, 704, 8.5);
				pushPrePipe(712, 0, 24);
				fillPreThing(Koopa, 800, 12, 2, 1, 12);
				pushPreThing(Stone, 824, 16, 1, 2);
				pushPreThing(Stone, 832, 24, 1, 3);
				
				pushPreFloor(856, 0, 2);
				pushPrePipe(856, 0, 32, true, false, 2);
				
				pushPreFloor(888, 0, 2);
				pushPreThing(Stone, 888, 24, 2, 3);
				
				pushPrePlatformGenerator(918, 6, 1);
				// pushPreThing(PlatformGenerator, 918, ceilmax, 6, 1);
				pushPreFloor(952, 0, 4);
				fillPreThing(Brick, 952, 32, 4, 1, 8);
				pushPreThing(Brick, 952, 64);
				fillPreThing(Brick, 952, 88, 4, 1, 8);
				pushPreThing(Brick, 960, 64, Mushroom);
				pushPreThing(Brick, 968, 64);
				
				pushPrePlatformGenerator(992, 6, -1);
				// pushPreThing(PlatformGenerator, 992, ceilmax, 6, -1);
				
				makeCeiling(1024, 27);
				pushPreFloor(1032, 0, 15);
				pushPrePipe(1048, 0, 16, false, false, 2); // exit of second underworld
				pushPreThing(Koopa, 1096, 12);
				pushPrePipe(1104, 0, 24, true);
				pushPrePipe(1136, 0, 32, true);
				
				pushPreFloor(1168, 0, 9);
				pushPreThing(Stone, 1216, 8);
				pushPreThing(Stone, 1224, 16, 1, 2);
				pushPreThing(Stone, 1232, 24, 1, 3);
				pushPreThing(Beetle, 1232, 32.5);
				
				pushPrePlatformGenerator(1246, 6, 1);
				// pushPreThing(PlatformGenerator, 1246, ceilmax, 6, 1);
				
				pushPreFloor(1280, 0, 23);
				fillPreThing(Brick, 1280, 48, 1, 2, 8, 8);
				fillPreThing(Brick, 1280, 64, 16, 3, 8, 8);
				makeCeiling(1280, 29);
				pushPreThing(Brick, 1288, Global.jumplev1, Mushroom);
				fillPreThing(Brick, 1296, Global.jumplev1, 10, 1, 8);
				fillPreThing(Coin, 1297, 39, 10, 1, 8);
				fillPreThing(Koopa, 1344, 12, 2, 1, 12);
				pushPreThing(Stone, 1384, 8);
				pushPreThing(Stone, 1392, 16, 1, 2);
				pushPreThing(Stone, 1400, 24, 1, 3);
				pushPreThing(Stone, 1408, 32, 1, 4);
				pushPreThing(Beetle, 1432, 8.5);
				pushPrePipe(1440, 0, 56, true);
				
				pushPreThing(Floor, 1480, 0, 39);
				fillPreThing(Brick, 1480, 8, 24, 3, 8, 8);
				pushPreThing(PipeSide, 1496, 40, 4);
				pushPreThing(PipeVertical, 1512, 88, 64);
				fillPreThing(Brick, 1528, 32, 18, 7, 8, 8);
				makeCeiling(1528, 28);
				
				fillPreThing(Brick, 1616, 32, 7, 7, 8, 8);
				pushPreThing(ScrollEnabler, 1610, ceilmax);
				makeCeiling(1616, 17);
				pushPreWarpWorld(1670, 0, [[5,1]], 0, true);
				fillPreThing(Brick, 1776, 8, 2, 11, 8, 8);
			}), 
			new Area("Underworld", function() { // secondary underworld - loc 3
				setLocationGeneration(3);
			
				makeCeiling(32, 7);
				pushPreFloor(0, 0, 17);
				fillPreThing(Brick, 0, 8, 1, 11, 8, 8);
				fillPreThing(Brick, 32, 48, 7, 1, 8);
				pushPreThing(Brick, 32, 56);
				fillPreThing(Coin, 42, 55, 5, 2, 8, 8);
				fillPreThing(Brick, 80, 56, 1, 4, 8, 8);
				fillPreThing(Brick, 88, 56, 2, 1, 8);
				pushPreThing(Brick, 112, 48, Coin);
				pushPreThing(PipeSide, 104, 16, 2);
				pushPreThing(PipeVertical, 120, 88, 88);
			}), 
			new Area("Overworld", function() { // regular exit - loc 4
				setLocationGeneration(4);
				
				pushPrePattern("backreg", 104, 0, 1);
				pushPreFloor(0, 0, 58);
				pushPrePipe(0, 0, 16, true, false, 4);
				pushPreThing(Stone, 16, 8, 1, 1);
				pushPreThing(Stone, 24, 16, 1, 2);
				pushPreThing(Stone, 32, 24, 1, 3);
				pushPreThing(Stone, 40, 32, 1, 4);
				pushPreThing(Stone, 48, 40, 1, 5);
				pushPreThing(Stone, 56, 48, 1, 6);
				pushPreThing(Stone, 64, 56, 1, 7);
				pushPreThing(Stone, 72, 64, 2, 8);
				endCastleOutside(148);
			}), 
			new Area("Overworld", function() { // bonus world! - loc 5
				setLocationGeneration(5);
				
				pushPrePattern("backcloud", -384, 4, 3);
				pushPreFloor(0, 0, 4);
				pushPreFloor(40, 0, 59);
				pushPreShroom(96, 32, 3);
				fillPreThing(Coin, 97, 39, 3, 1, 8);
				pushPreShroom(128, 64, 3);
				fillPreThing(Coin, 129, 71, 3, 1, 8);
				pushPreShroom(144, 16, 3);
				pushPreShroom(176, 16, 5);
				pushPreShroom(176, 64, 3);
				fillPreThing(Coin, 177, 71, 3, 1, 8);
				pushPreShroom(208, 48, 3);
				fillPreThing(Coin, 209, 55, 3, 1, 8);
				pushPreShroom(240, 72, 5);
				fillPreThing(Coin, 241, 79, 5, 1, 8);
				pushPreShroom(248, 24, 7);
				fillPreThing(Coin, 281, 31, 2, 1, 8);
				
				pushPreThing(Stone, 320, 8);
				pushPreThing(Stone, 328, 16, 1, 2);
				pushPreThing(Stone, 336, 24, 1, 3);
				pushPreThing(Stone, 344, 32, 1, 4);
				pushPreThing(Stone, 352, 40, 1, 5);
				pushPreThing(Stone, 360, 48, 1, 6);
				pushPreThing(Stone, 368, 56, 1, 7);
				pushPreThing(Stone, 376, 64, 1, 8);
				pushPreThing(Stone, 384, 72, 1, 9);
				pushPreThing(Stone, 392, 72, 11);
				pushPreWarpWorld(390, 0, [[8,1],[7,1],[6,1]]);
				pushPreThing(Stone, 496, 88, 2, 11);
				pushPreThing(ScrollBlocker, 512, 88);
			})
		];
	},
	World43(map) {
		map.time = 300;
		map.locs = [
			new Location(0, true)
		];
		map.areas = [
			new Area("Overworld", function() {
				setLocationGeneration(0);
				
				pushPreCastle();
				pushPrePattern("backcloud", 0, 4, 3);
				pushPreFloor(0, 0, 15);
				
				pushPreShroom(128, 0, 5);
				pushPreShroom(152, 64, 5);
				fillPreThing(Coin, 161, 71, 3, 1, 8);
				pushPreShroom(184, 32, 7);
				fillPreThing(Coin, 193, 39, 4, 1, 8);
				fillPreThing(Koopa, 224, 44, 2, 1, 8, 8, true);
				
				pushPreShroom(256, 72, 3);
				pushPreShroom(288, 8, 7);
				pushPreThing(Koopa, 288, 84, true, [32, 88]);
				pushPreThing(Coin, 305, 15);
				pushPreThing(Koopa, 312, 20, true);
				pushPreShroom(312, 64, 5);
				pushPreThing(Coin, 321, 15);
				pushPreThing(Block, 344, 88, Mushroom);
				pushPreShroom(352, 32, 3);
				
				pushPreThing(Coin, 385, 47);
				pushPreScale(396, 86, 14, [6, 4, 10]);
				pushPreShroom(408, 40, 3);
				pushPreThing(Platform, 464, 20, 6, [moveFloating, 32, 88, 2]);
				pushPreThing(Platform, 496, 66, 6, [moveFloating, 32, 88, 2]);
				
				pushPreShroom(520, 0, 5);
				pushPreShroom(536, 48, 3);
				fillPreThing(Coin, 537, 55, 3, 1, 8);
				pushPreThing(Koopa, 544, 12, true);
				pushPreShroom(560, 80, 3);
				fillPreThing(Coin, 561, 87, 3, 1, 8);
				pushPreShroom(576, 32, 3);
				pushPreThing(Coin, 585, 39);
				pushPreShroom(592, 64, 5);
				pushPreThing(Koopa, 624, 76, true);
				
				pushPreScale(652, 86, 16, [6, 4, 12]);
				pushPreScale(740, 86, 10, [6, 4, 12]);
				pushPreThing(Coin, 770, 47);
				pushPreShroom(792, 16, 3);
				pushPreScale(828, 86, 12, [6, 4, 12]);
				
				pushPreShroom(904, 32, 5);
				fillPreThing(Coin, 905, 39, 5, 1, 8);
				pushPreShroom(936, 56, 3);
				pushPreShroom(968, 0, 7);
				pushPreShroom(1040, 24, 5);
				pushPreThing(Platform, 1088, 67, 6, [moveFloating, 8, 88, 2]);
				
				pushPreFloor(1128, 0, 19);
				endCastleOutside(1172, 0, true, 1);
			})
		];
	},
	World44(map) {
		map.locs = [
			new Location(0, startCastle)
		];
		map.areas = [
			new Area("Castle", function() {
				setLocationGeneration(0);
				
				startCastleInside();
				
				pushPreFloor(40, 24, 2);
				makeCeilingCastle(40, 11);
				fillPreWater(56, 0, 4);
				pushPreFloor(72, 24, 2);
				fillPreWater(88, 0, 4);
				pushPreFloor(104, 24, 3);
				
				this.sections = {
					start: 128,
					0: function(xloc) {
						pushPreFloor(xloc, 0, bstretch + 50);
						makeCeilingCastle(xloc, bstretch + 50);
						pushPreThing(Stone, xloc + 16, 56, 6, 4);
						fillPreThing(Stone, xloc + 72, 56, 5, 1, 16, 0, 1, 4);
						pushPreThing(Stone, xloc + 152, 56, 3, 4);
						pushPreThing(Stone, xloc + 176, 56, 6, 1);
						pushPrePipe(xloc + 192, 0, 24, true);
						pushPreThing(Stone, xloc + 224, 56, 17, 4);
						pushPreThing(CastleBlock, xloc + 296, 56, [6, 1], true);
						pushPreSectionFail(xloc + 384, 24, 40, 24);
						pushPreSectionPass(xloc + 384, 80, 40, 24);
						pushPreThing(CastleBlock, xloc + 352, 32, [6, 1], true);
						pushPreThing(Stone, xloc + 360, 56, bstretch, 4);
						pushPreThing(Stone, xloc + 376 + bstretch * 8, 24, 3, 3);
						pushPreThing(Stone, xloc + 376 + bstretch * 8, 80, 3, 3);
						pushCastleDecider(xloc + 400 + bstretch * 8, 0);
					},
					1: function(xloc) {
						pushPreFloor(xloc, 0, 8);
						makeCeilingCastle(xloc, bstretch + 42);
						pushPreThing(Stone, xloc + 48, 24, 2);
						fillPreWater(xloc + 64, 0, 4);
						pushPreThing(Stone, xloc + 72, 40, 2);
						fillPreWater(xloc + 80, 0, 10);
						
						pushPreFloor(xloc + 80, 16);
						pushPreThing(Stone, xloc + 80, 24, 5);
						pushPreThing(Stone, xloc + 104, 48);
						pushPreThing(Stone, xloc + 112, 40, 1, 2);
						pushPreFloor(xloc + 120, 0, 27);
						pushPreThing(Stone, xloc + 120, 56, 1, 2);
						pushPreThing(Stone, xloc + 128, 24, 26);
						pushPreThing(Stone, xloc + 128, 56, 2);
						pushPreThing(Stone, xloc + 160, 56, 4);
						pushPreThing(Stone, xloc + 200, 48, 1, 3);
						pushPreThing(Stone, xloc + 200, 56, 3);
						pushPreThing(Stone, xloc + 240, 56, 12);
						pushPreThing(CastleBlock, xloc + 280, 56, [6, 1], true);
						pushPreThing(CastleBlock, xloc + 328, 24, [6, 1], true);
						
						pushPreFloor(xloc + 336, 0, bstretch);
						pushPreThing(Stone, xloc + 336, 24, bstretch);
						pushPreThing(Stone, xloc + 336, 56, bstretch);
						pushPreSectionPass(xloc + 360, 16, 40, 16);
						pushPreSectionFail(xloc + 360, 48, 40, 24);
						pushPreSectionFail(xloc + 360, 80, 40, 24);
						pushCastleDecider(xloc + 336 + bstretch * 8, 1);
					},
					2: function(xloc) {
						pushPreThing(Stone, xloc, 64, 1, 5);
						makeCeilingCastle(xloc, 33, 3);
						pushPreThing(Stone, xloc + 8, 80, 2, 2);
						pushPreFloor(xloc, 0, 10);
						pushPreFloor(xloc + 72, 24, 4);
						makeCeilingCastle(xloc + 72, 8);
						pushPreFloor(xloc + 96, 0, 4);
						pushPreFloor(xloc + 120, 24, 2);
						endCastleInside(xloc + 136);
					}
				};
			})
		];
	},
	World51(map) {
		map.time = 300;
		map.locs = [
			new Location(0, true),
			new Location(0, exitPipeVert),
			new Location(1)
		];
		map.areas = [
			new Area("Overworld Alt", function() {
				setLocationGeneration(0);
				
				pushPreCastle();
				pushPrePattern("backfence", -384, 0, 6);
				pushPreFloor(0, 0, 49);
				pushPreThing(Koopa, 128, 12);
				fillPreThing(Goomba, 152, 8, 3, 1, 12);
				fillPreThing(Koopa, 328, 12, 2, 1, 12);
				pushPrePipe(352, 0, 24, true);
				
				pushPreFloor(408, 0, 41);
				pushPrePipe(408, 0, 24, true);
				pushPreThing(Koopa, 488, 32, false, true);
				fillPreThing(Goomba, 520, 8, 3, 1, 12);
				fillPreThing(Goomba, 608, 8, 3, 1, 12);
				pushPreThing(Koopa, 696, 16, false, true);
				pushPreThing(Stone, 712, 24, 1, 3);
				pushPreThing(Stone, 712, 32, 5);
				fillPreThing(Brick, 720, 64, 2, 1, 16);
				pushPreThing(Brick, 728, 64, Star);
				
				pushPreFloor(768, 0, 18);
				fillPreThing(Goomba, 824, 8, 3, 1, 12);
				pushPreThing(Cannon, 888, 16, 2);
				
				pushPreFloor(928, 0, 36);
				pushPreThing(Stone, 928, 24, 1, 3);
				fillPreThing(Goomba, 968, 8, 3, 1, 12);
				pushPreThing(Koopa, 1016, 12);
				fillPreThing(Goomba, 1080, 8, 3, 1, 12);
				fillPreThing(Koopa, 1152, 12, 2, 1, 12);
				pushPreThing(Stone, 1176, 32, 1, 4);
				pushPreThing(Block, 1184, Global.jumplev1, [Mushroom, 1], true);
				fillPreThing(Brick, 1192, Global.jumplev1, 2, 1, 8);
				
				pushPreFloor(1240, 0, 69);
				pushPreThing(Stone, 1248, Global.jumplev1, 2);
				pushPrePipe(1248, Global.jumplev1, 16, true, 2);
				pushPreThing(Cannon, 1272, 16, 2);
				pushPrePipe(1304, 0, 16, true, false, 1);
				pushPreThing(Cannon, 1360, 16, 2);
				pushPreThing(Koopa, 1424, 12, false, true);
				pushPreThing(Stone, 1456, 8);
				pushPreThing(Brick, 1456, 44);
				pushPreThing(Stone, 1464, 16, 1, 2);
				pushPreThing(Stone, 1472, 24, 1, 3);
				pushPreThing(Stone, 1480, 32, 1, 4);
				pushPreThing(Stone, 1488, 40, 1, 5);
				pushPreThing(Stone, 1512, 64, 2, 7);
				endCastleOutside(1588);
			}),
			new Area("Underworld", function() {
				setLocationGeneration(2);
				makeCeiling(32, 7);
				pushPreFloor(0, 0, 17);
				fillPreThing(Brick, 0, 8, 1, 11, 8, 8);
				fillPreThing(Brick, 32, 48, 7, 1, 8);
				pushPreThing(Brick, 32, 56);
				fillPreThing(Coin, 42, 55, 5, 2, 8, 8);
				fillPreThing(Brick, 80, 56, 1, 4, 8, 8);
				fillPreThing(Brick, 88, 56, 2, 1, 8);
				pushPreThing(Brick, 112, 48, Coin);
				pushPreThing(PipeSide, 104, 16, 1);
				pushPreThing(PipeVertical, 120, 88, 88);
			})
		];
	},
	World52(map) {
		map.locs = [
			new Location(0, true),
			new Location(0, exitPipeVert),
			new Location(0, entryNormal, 1032),
			new Location(1),
			new Location(2, enterCloudWorld)
		];
		map.areas = [
			new Area("Overworld Alt", function() {
				setLocationGeneration(0);
				
				pushPreCastle();
				// pushPreScenery("Castle", -1 * unitsizet4, castlev);
				pushPreCastle(0, 0);
				pushPrePattern("backfence", -384, 0, 4);
				pushPrePattern("backfence", 1152, 0, 2);
				pushPreFloor(0, 0, 26);
				pushPreThing(Stone, 96, 8);
				pushPreThing(Stone, 104, 16, 1, 2);
				pushPreThing(Stone, 112, 24, 1, 3);
				pushPreThing(Stone, 120, 24, 1, 3);
				pushPreThing(Stone, 120, 32, 4);
				pushPreThing(Cannon, 136, 48, 2);
				fillPreThing(Coin, 169, 71, 3, 1, 8);
				pushPreThing(Koopa, 184, 12);
				pushPreThing(Springboard, 200, 14.5);
				
				pushPreFloor(232, 0, 37);
				fillPreThing(Brick, 232, Global.jumplev1, 6, 1, 8);
				fillPreThing(Brick, 232, Global.jumplev2, 5, 1, 8);
				fillPreThing(Coin, 233, 39, 3, 1, 8);
				pushPreThing(Brick, 272, Global.jumplev2, Mushroom);
				pushPreThing(Koopa, 320, 32, false, true);
				pushPreThing(Stone, 352, 8);
				pushPreThing(Stone, 360, 16, 1, 2);
				pushPreThing(Stone, 368, 24, 1, 3);
				pushPreThing(HammerBro, 368, 36);
				pushPreThing(Stone, 376, 32, 2, 4);
				pushPreThing(Stone, 392, 16, 1, 2);
				pushPrePipe(440, 0, 24, true, 3);
				pushPreThing(Stone, 496, 8);
				pushPreThing(Stone, 504, 16, 1, 2);
				pushPreThing(Goomba, 504, 24);
				pushPreThing(Stone, 512, 24, 1, 3);
				pushPreThing(Stone, 520, 32, 1, 4);
				pushPreThing(Goomba, 520, 40);
				
				pushPreFloor(544, 0, 24);
				pushPreThing(Stone, 544, 40, 1, 5);
				pushPreThing(Stone, 552, 48, 2, 6);
				fillPreThing(Block, 624, Global.jumplev1, 5, 1, 8);
				pushPreThing(HammerBro, 648, 46);
				pushPreThing(Block, 672, Global.jumplev1, Coin, true);
				pushPreThing(Brick, 680, Global.jumplev2, [Vine, 4]);
				fillPreThing(Brick, 688, Global.jumplev2, 2, 1, 8);
				fillPreThing(Coin, 689, 71, 2, 1, 8);
				fillPreThing(Brick, 712, 40, 3, 1, 8);
				fillPreThing(Coin, 713, 7, 2, 1, 8);
				
				pushPreFloor(768, 0, 31);
				pushPreThing(Koopa, 848, 32, false, true);
				pushPreThing(Cannon, 856, 16, 2);
				pushPrePipe(920, 0, 16, true, false, 1);
				fillPreThing(Brick, 944, Global.jumplev1, 8, 1, 8);
				fillPreThing(Brick, 944, Global.jumplev2, 7, 1, 8);
				pushPreThing(HammerBro, 960, 44);
				pushPreThing(HammerBro, 992, 76);
				pushPreThing(Brick, 1000, Global.jumplev2, Star);
				
				pushPreFloor(1032, 0, 15);
				pushPreThing(Stone, 1032, 24, 1, 3);
				fillPreThing(Beetle, 1088, 8.5, 3, 1, 8.5);
				pushPreThing(Brick, 1128, 16, Coin);
				pushPreThing(Brick, 1136, 16, Mushroom);
				
				fillPreThing(Brick, 1176, 32, 3, 1, 8);
				pushPreFloor(1208, 0, 19);
				fillPreThing(Brick, 1224, Global.jumplev2, 5, 1, 8);
				fillPreThing(Goomba, 1240, 8, 2, 1, 12);
				pushPreThing(Koopa, 1256, 76, true);
				pushPreThing(Koopa, 1304, 28, false, true);
				pushPreThing(Koopa, 1328, 20, false, true);
				pushPreThing(Block, 1344, 32, Mushroom);
				
				fillPreThing(Brick, 1376, Global.jumplev2, 4, 1, 8);
				fillPreThing(Coin, 1377, 71, 2, 1, 8);
				pushPreFloor(1384, 0, 2);
				pushPrePipe(1384, 0, 16);
				
				pushPreFloor(1416, 0, 8);
				pushPreThing(Stone, 1464, 8);
				pushPreThing(Stone, 1472, 16, 1, 2);
				
				pushPreThing(SceneryBlocker, 1480, 8);
				pushPreFloor(1488, 0, 2);
				pushPreThing(Stone, 1488, 32, 1, 4);
				pushPreThing(Koopa, 1488, 64, false, true);
				pushPreThing(Stone, 1496, 40, 1, 5);
				
				pushPreFloor(1512, 0, 35);
				pushPreThing(Stone, 1512, 56, 1, 7);
				pushPreThing(Stone, 1520, 64, 2, 8);
				endCastleOutside(1596);
			}),
			new Area("Underwater", function() {
				setLocationGeneration(3);
				
				goUnderWater();
				
				pushPreFloor(0, 0, 22);
				pushPreThing(Stone, 88, 56, 5);
				pushPreThing(Coral, 96, 24, 3);
				pushPreThing(Coral, 120, 72, 2);
				pushPreThing(Blooper, 136, 24);
				pushPreThing(Coral, 160, 32, 4);
				fillPreThing(Coin, 177, 47, 10, 1, 8, 8);
				
				pushPrePlatformGenerator(182, 6, 1);
				pushPreFloor(208, 24, 2);
				pushPreThing(Stone, 208, 88, 2, 3);
				pushPreThing(CheepCheep, 220, 60);
				pushPrePlatformGenerator(230, 6, 1);
				pushPreFloor(256, 24, 2);
				pushPreThing(Stone, 256, 88, 2, 3);
				pushPreFloor(272, 0, 4);
				pushPreThing(Blooper, 272, 24);
				
				pushPreThing(Coral, 304, 64, 4);
				pushPreThing(Stone, 304, 72, 6);
				pushPreThing(CheepCheep, 312, 20);
				pushPreFloor(320, 0, 2);
				fillPreThing(Coin, 321, 7, 2, 1, 8);
				pushPreThing(Coral, 344, 64, 4);
				pushPreThing(Blooper, 348, 22);
				pushPreFloor(352, 0, 21);
				pushPreThing(Coral, 368, 16, 2);
				
				pushPreThing(CheepCheep, 388, 40, true);
				pushPreThing(Stone, 400, 32, 4);
				fillPreThing(Coin, 401, 39, 4, 1, 8);
				pushPreThing(CheepCheep, 424, 84);
				pushPreThing(Stone, 432, 56, 4);
				fillPreThing(Coin, 433, 63, 4, 1, 8);
				
				pushPreThing(Stone, 472, 8);
				pushPreThing(Stone, 480, 16, 1, 2);
				pushPreThing(Stone, 488, 32, 2, 4);
				pushPreThing(Stone, 488, 88, 2, 4);
				pushPreThing(PipeSide, 496, 48, 1);
				pushPreThing(Stone, 504, 88, 2, 11);
			}),
			new Area("Sky", function() {
				setLocationGeneration(4);

				pushPreThing(Clouds, 0, 0, 4);
				pushPreThing(Clouds, 40, 0, 72);
				pushPreThing(Platform, 120, 32, 8, collideTransport);
				fillPreThing(Coin, 120, 64, 16, 1, 8);
				fillPreThing(Coin, 256, 80, 3, 1, 8);
				fillPreThing(Coin, 288, 72, 16, 1, 8);
				fillPreThing(Coin, 424, 80, 3, 1, 8);
				
				setExitLoc(2);
			})
		];
	},
	World53(map) {
		map.time = 300;
		map.locs = [
			new Location(0, true)
		];
		map.areas = [
			new Area("Overworld", function() {
				setLocationGeneration(0);

				pushPreCastle(0, 0);
				pushPrePattern("backcloud", 0, 4, 8);
				pushPreFloor(0, 0, 16);
				
				pushPreTree(144, 8, 4);
				pushPreTree(192, 32, 8);
				pushPreTree(208, 64, 5);
				fillPreThing(Coin, 217, 71, 3, 1, 8, 8);
				pushPreThing(Koopa, 240, 76, true);
				pushPreTree(256, 8, 3);
				pushPreThing(Coin, 266, 15);
				pushPreTree(280, 40, 5);
				fillPreThing(Coin, 297, 87, 2, 1, 8);
				pushPreTree(320, 72, 7);
				fillPreThing(Goomba, 352, 80, 2, 1, 16);
				pushPreTree(400, 0, 4);
				fillPreThing(Coin, 402, 55, 2, 1, 8, 8);
				pushPreThing(Platform, 440, 56, 6, [moveFloating, -4, 56]);
				pushPreTree(472, 0, 5);
				pushPreThing(Block, 472, 24, Mushroom);
				pushPreTree(480, 64, 4);
				fillPreThing(Coin, 482, 71, 4, 1, 8);
				pushPreTree(520, 0, 5);
				pushPreTree(560, 32, 3);
				pushPreThing(Koopa, 592, 76, true, [16, 88]);
				pushPreTree(608, 56, 6);
				pushPreThing(Goomba, 640, 64);
				fillPreThing(Coin, 681, 63, 2, 1, 8, 8);
				pushPreThing(Platform, 688, 40, 6, [moveSliding, 660, 720]);
				fillPreThing(Coin, 745, 71, 2, 1, 8, 8);
				pushPreThing(Platform, 752, 32, 6, [moveSliding, 700, 776]);
				fillPreThing(Coin, 777, 71, 2, 1, 8, 8);
				pushPreTree(784, 16, 4);
				pushPreTree(832, 48, 8);
				pushPreThing(Koopa, 880, 60, true);
				pushPreTree(904, 0, 3);
				fillPreThing(Coin, 906, 7, 3, 1, 8, 8);
				pushPreThing(Koopa, 912, 68, true, [4, 76]);
				pushPreTree(928, 32, 4);
				fillPreThing(Coin, 962, 63, 2, 1, 8, 8);
				pushPreTree(976, 32, 4);
				
				pushPreFloor(1032, 0, 47);
				pushPreThing(Platform, 1048, 56, 6, [moveSliding, 1008, 1076]);
				pushPreThing(Koopa, 1064, 12, true); 
				pushPreThing(Stone, 1112, 32, 2, 4);
				pushPreThing(Stone, 1120, 48, 2, 6);
				pushPreThing(Stone, 1136, 64, 2, 8);
				endCastleOutside(1212, 0, true, 13);
			})
		];
	},
	World54(map) {
		map.time = 300;
		map.locs = [
			new Location(0, startCastle)
		];
		map.areas = [
			new Area("Castle", function() {
				setLocationGeneration(0);
				
				startCastleInside();
				
				makeCeilingCastle(40, 11, 3);
				pushPreFloor(40, 24, 11);
				
				fillPreWater(128, 0, 32);
				pushPreThing(Podoboo, 128, -32);
				pushPreThing(Stone, 144, 32, 2, 1);
				pushPreThing(Podoboo, 160, -24);
				pushPreThing(Stone, 176, 48, 3, 1);
				pushPreThing(CastleBlock, 184, 48, 12, true);
				pushPreThing(Block, 184, 80, Mushroom);
				pushPreThing(Stone, 216, 32, 2, 1);
				pushPreThing(Podoboo, 240, -32);
				
				pushPreFloor(256, 0, 52);
				pushPreThing(Stone, 256, 24, 2, 3);
				makeCeilingCastle(272, 49, 4);
				pushPreThing(Stone, 296, Global.jumplev1, 36, 1);
				pushPreThing(CastleBlock, 344, 0, 6, true);
				pushPreThing(CastleBlock, 392, Global.jumplev1, 6);
				pushPreThing(CastleBlock, 440, 0, 6, true);
				pushPreThing(CastleBlock, 440, Global.jumplev2);
				pushPreThing(CastleBlock, 488, Global.jumplev1, 6);
				pushPreThing(CastleBlock, 536, 0, 6);
				pushPreThing(CastleBlock, 584, Global.jumplev1, 6);
				pushPreThing(Stone, 640, 24, 4, 3)
				pushPreThing(CastleBlock, 656, 56, 6);
				
				pushPrePlatformGenerator(686, 3, -1);
				pushPrePlatformGenerator(710, 3, 1);
				
				pushPreFloor(736, 16);
				pushPreThing(CastleBlock, 736, 24, 6, true);
				pushPreFloor(744, 24, 6);
				makeCeilingCastle(744, 6, 3);
				pushPreFloor(792, 0, 10);
				fillPreThing(Coin, 817, 7, 3, 2, 8, 32);
				pushPreThing(CastleBlock, 824, 16, 6, -1.17);
				fillPreWater(872, 0, 4);
				pushPreThing(Stone, 864, 24, 1, 3);
				pushPreThing(Podoboo, 872, -32);
				pushPreFloor(888, 24, 2);
				fillPreWater(904, 0, 4);
				
				pushPreFloor(920, 0, 13);
				pushPreThing(Stone, 920, 24, 5, 3);
				makeCeilingCastle(920, 13, 3);
				fillPreThing(Stone, 976, 24, 2, 1, 32, 0, 2, 3);
				pushPreThing(Podoboo, 904, -32);
				
				fillPreThing(Brick, 1024, 64, 6, 1, 8);
				endCastleInside(1024);
				pushPreThing(Podoboo, 1048, -40);
			})
		];
	},
	World61(map) {
		map.locs = [
			new Location(0, true)
		];
		map.areas = [
			new Area("Overworld Night", function() {
				setLocationGeneration(0);

				pushPreCastle(0, 0, true);
				pushPrePattern("backreg", 0, 0, 4);
				pushPreFloor(0, 0, 20);
				pushPreThing(Lakitu, 184, 84);
				fillPreThing(Block, 128, Global.jumplev1, 2, 1, 8);
				
				pushPreFloor(176, 0, 9);
				pushPreThing(Stone, 208, 8, 6);
				pushPreThing(Stone, 232, 16, 5);
				pushPreThing(Stone, 256, 24, 4);
				pushPreThing(Stone, 280, 32, 3);
				pushPreThing(Brick, 288, Global.jumplev2, Mushroom);
				pushPreFloor(296, 0, 2);
				pushPreThing(Brick, 296, Global.jumplev2);
				
				pushPreFloor(328, 0, 16);
				fillPreThing(Brick, 328, Global.jumplev1, 2, 1, 8);
				pushPreThing(Brick, 344, Global.jumplev1, Coin);
				
				pushPreFloor(472, 0, 15);
				fillPreThing(Coin, 497, Global.jumplev1-1, 3, 1, 8);
				pushPreThing(Stone, 552, 8);
				pushPreThing(Stone, 560, 16, 1, 2);
				pushPreThing(Stone, 568, 24, 1, 3);
				pushPreThing(Stone, 576, 32, 2, 4);
				
				fillPreThing(Coin, 609, 47, 2, 1, 8);
				pushPreFloor(616, 0, 16);
				pushPreThing(Stone, 672, 16);
				pushPreThing(Stone, 680, 24, 1, 2);
				pushPreThing(Stone, 696, 40, 1, 5);
				pushPreThing(Stone, 704, 48, 1, 6);
				pushPreThing(Stone, 712, 56, 1, 7);
				pushPreThing(Block, 720, 40, [Mushroom, 1], true);
				fillPreThing(Brick, 720, 56, 3, 1, 8);
				fillPreThing(Brick, 736, 24, 3, 1, 8);
				
				pushPreFloor(768, 0, 31);
				pushPrePipe(816, 0, 24, true);
				fillPreThing(Coin, 841, 39, 3, 1, 8);
				fillPreThing(Block, 904, Global.jumplev1, 1, 2, 0, 32, Coin, true);
				pushPreThing(Stone, 976, 8);
				pushPreThing(Stone, 984, 16, 1, 2);
				pushPreThing(Stone, 992, 24, 1, 3);
				pushPreThing(Stone, 1000, 32, 1, 4);
				pushPreThing(Stone, 1008, 40, 1, 5);
				fillPreThing(Brick, 1016, 40, 2, 1, 8);
				fillPreThing(Brick, 1040, 8, 5, 1, 8);
				pushPreThing(Block, 1040, 40, Mushroom);
				pushPreThing(Block, 1048, 40);
				pushPreFloor(1072, 0, 2);
				
				pushPreFloor(1096, 0, 12);
				pushPreThing(Stone, 1144, 8);
				pushPreThing(Stone, 1152, 16, 1, 2);
				pushPreThing(Stone, 1160, 24, 1, 3);
				pushPreThing(Stone, 1168, 32, 1, 4);
				pushPreThing(Stone, 1176, 40, 1, 5);
				pushPreThing(Stone, 1184, 48, 1, 6);
				fillPreThing(Brick, 1192, 48, 2, 1, 8);
				pushPreThing(Brick, 1208, 32);
				fillPreThing(Brick, 1216, 16, 3, 1, 8);
				pushPreThing(Brick, 1216, 32, Coin);
				pushPreFloor(1240, 0, 9);
				
				pushPreFloor(1336, 0, 7);
				pushPreThing(Stone, 1352, 8);
				pushPreThing(Stone, 1360, 16, 1, 2);
				pushPreThing(Stone, 1368, 24, 1, 3);
				pushPreThing(Stone, 1376, 32, 1, 4);
				pushPreThing(Stone, 1384, 40, 1, 5);
				
				pushPreFloor(1408, 0, 30);
				pushPreFuncCollider(1408, zoneDisableLakitu);
				pushPreThing(Stone, 1408, 64, 2, 8);
				endCastleOutside(1484);
			})
		];
	},
	World62(map) {
		map.locs = [
			new Location(0, true),            // 0: main entrance
			new Location(0, exitPipeVert),    // 1: exit first underworld
			new Location(0, exitPipeVert),    // 2: exit underwater
			new Location(0, false, 1304),     // 3: exit cloud world
			new Location(0, exitPipeVert),    // 4: exit second underworld
			new Location(1),                  // 5: enter first underworld
			new Location(2),                  // 6: enter underwater
			new Location(3, enterCloudWorld), // 7: enter sky
			new Location(4)                   // 8: enter second underworld
		];
		map.areas = [
			new Area("Overworld Night", function() {
				setLocationGeneration(0);
				
				pushPreCastle();
				pushPrePattern("backreg", 0, 0, 5);
				pushPreFloor(0, 0, 123);
				fillPreThing(Brick, 80, Global.jumplev1, 3, 1, 8);
				pushPrePipe(152, 0, 32, true, 5); // enter first underworld
				pushPreThing(Brick, 184, Global.jumplev2);
				pushPreThing(Block, 192, Global.jumplev1, Coin, true);
				pushPreThing(Brick, 192, Global.jumplev2, Coin);
				pushPreThing(Brick, 200, Global.jumplev2);
				pushPreThing(Koopa, 208, 12);
				pushPrePipe(224, 0, 32, true);
				pushPreThing(Stone, 256, 40, 2);
				pushPrePipe(256, 40, 16, true);
				pushPrePipe(280, 0, 16, true, false, 1); // exit first underworld
				pushPrePipe(296, 0, 16, true);
				pushPreThing(Koopa, 344, 32, false, true);
				pushPrePipe(368, 0, 32, true);
				pushPreThing(Brick, 408, Global.jumplev1);
				pushPreThing(Brick, 416, Global.jumplev1, Mushroom);
				pushPreThing(Beetle, 432, 8.5);
				pushPrePipe(448, 0, 40, true, 6); // enter underwater
				pushPreThing(Stone, 496, Global.jumplev1, 2);
				pushPrePipe(496, Global.jumplev1, 16, true);
				pushPrePipe(536, 0, 16, true);
				fillPreThing(Brick, 536, Global.jumplev2, 5, 1, 8);
				pushPreThing(Goomba, 536, 72);
				pushPrePipe(592, 0, 16, true);
				fillPreThing(Brick, 616, Global.jumplev2, 4, 1, 8);
				pushPrePipe(640, 0, 24, true);
				pushPreThing(Brick, 648, Global.jumplev2, [Vine, 7]); // enter cloud world
				pushPreThing(Block, 656, Global.jumplev1, Coin, true);
				pushPrePipe(672, 0, 16, true);
				pushPrePipe(696, 0, 48, true);
				pushPreThing(Beetle, 736, 8.5);
				pushPrePipe(752, 0, 24, true);
				pushPrePipe(816, 0, 32);
				pushPrePipe(840, 0, 16, true);
				fillPreThing(Brick, 880, Global.jumplev1, 2, 1, 24);
				pushPreThing(Stone, 888, Global.jumplev1, 2);
				pushPrePipe(888, Global.jumplev1, 24, true);
				pushPrePipe(920, 0, 16, true, false, 2); // exit underwater
				pushPreThing(Brick, 920, Global.jumplev2);
				fillPreThing(Brick, 952, Global.jumplev2, 9, 1, 8);
				pushPreThing(Beetle, 960, 72.5);
				
				pushPreFloor(1032, 0, 12);
				pushPrePipe(1048, 0, 16, true);
				pushPrePipe(1080, 0, 16, true);
				fillPreThing(Brick, 1104, 40, 2, 1, 8);
				pushPreThing(Brick, 1120, 64, Star);
				pushPreThing(Brick, 1128, 64);
				pushPreFloor(1136, 0, 1);
				
				pushPreFloor(1152, 0, 8);
				fillPreThing(Brick, 1152, Global.jumplev1, 3, 1, 8);
				fillPreThing(Brick, 1160, Global.jumplev2, 2, 1, 8);
				pushPreThing(Stone, 1192, 8);
				pushPreThing(Stone, 1200, 16, 1, 2);
				pushPreThing(Stone, 1208, 24, 1, 3);
				
				pushPreFloor(1224, 0, 87);
				pushPrePipe(1224, 0, 24, true, 8); // enter second underworld
				pushPreThing(Stone, 1248, 32, 1, 4);
				pushPreThing(Stone, 1256, 16, 1, 2);
				fillPreThing(Brick, 1280, Global.jumplev1, 3, 2, 8, 32);
				pushPreThing(Beetle, 1304, 8.5);
				pushPreThing(Stone, 1336, Global.jumplev1, 2);
				pushPrePipe(1336, Global.jumplev1, 24, true);
				pushPreThing(Goomba, 1352, 8);
				pushPrePipe(1392, 0, 32, true);
				pushPrePipe(1432, 0, 16, true, false, 4); // exit second underworld
				pushPrePipe(1448, 0, 24, true);
				pushPrePipe(1464, 0, 32, true);
				pushPrePipe(1512, 0, 24, true);
				pushPreThing(Stone, 1592, 8);
				pushPreThing(Stone, 1600, 16, 1, 2);
				pushPrePipe(1608, 0, 32, true);
				pushPreThing(Stone, 1624, 40, 1, 5);
				pushPreThing(Stone, 1632, 48, 1, 6);
				pushPreThing(Stone, 1640, 56, 1, 7);
				pushPreThing(Stone, 1648, 64, 2, 8);
				pushPreThing(Koopa, 1648, 84, false, true);
				endCastleOutside(1724);
			}),
			new Area("Underworld", function() { // first underworld
				setLocationGeneration(5);
				
				makeCeiling(32, 7);
				pushPreFloor(0, 0, 17);
				fillPreThing(Brick, 0, 8, 1, 11, 8, 8);
				fillPreThing(Brick, 32, 48, 7, 1, 8);
				pushPreThing(Brick, 32, 56);
				fillPreThing(Coin, 42, 55, 5, 2, 8, 8);
				fillPreThing(Brick, 80, 56, 1, 4, 8, 8);
				fillPreThing(Brick, 88, 56, 2, 1, 8);
				pushPreThing(Brick, 112, 48, Coin);
				pushPreThing(PipeSide, 104, 16, 1);
				pushPreThing(PipeVertical, 120, 88, 88);
			}),
			new Area("Underwater", function() { // underwater
				setLocationGeneration(6);
				goUnderWater();
				
				pushPreFloor(0, 0, 22);
				pushPreThing(Stone, 88, 56, 5);
				pushPreThing(Coral, 96, 24, 3);
				pushPreThing(Coral, 120, 72, 2);
				pushPreThing(Blooper, 136, 24);
				pushPreThing(Coral, 160, 32, 4);
				fillPreThing(Coin, 177, 47, 10, 1, 8, 8);
				
				pushPrePlatformGenerator(186, 4, 1);
				pushPreFloor(208, 24, 2);
				pushPreThing(Stone, 208, 88, 2, 3);
				pushPreThing(CheepCheep, 220, 60);
				pushPrePlatformGenerator(234, 4, 1);
				pushPreFloor(256, 24, 2);
				pushPreThing(Stone, 256, 88, 2, 3);
				pushPreFloor(272, 0, 4);
				pushPreThing(Blooper, 272, 24);
				
				pushPreThing(Coral, 304, 64, 4);
				pushPreThing(Stone, 304, 72, 6);
				pushPreThing(CheepCheep, 312, 20);
				pushPreFloor(320, 0, 2);
				fillPreThing(Coin, 321, 7, 2, 1, 8);
				pushPreThing(Coral, 344, 64, 4);
				pushPreThing(Blooper, 348, 22);
				pushPreFloor(352, 0, 21);
				pushPreThing(Coral, 368, 16, 2);
				
				pushPreThing(CheepCheep, 388, 40, true);
				pushPreThing(Stone, 400, 32, 4);
				fillPreThing(Coin, 401, 39, 4, 1, 8);
				pushPreThing(CheepCheep, 424, 84);
				pushPreThing(Stone, 432, 56, 4);
				fillPreThing(Coin, 433, 63, 4, 1, 8);
				
				pushPreThing(Stone, 472, 8);
				pushPreThing(Stone, 480, 16, 1, 2);
				pushPreThing(Stone, 488, 32, 2, 4);
				pushPreThing(Stone, 488, 88, 2, 4);
				pushPreThing(PipeSide, 496, 48, 2);
				pushPreThing(Stone, 504, 88, 2, 11);
			}),
			new Area("Sky", function() { // cloud world
				setLocationGeneration(7);
				
				pushPreThing(Stone, 0, 0, 4);
				pushPreThing(Stone, 40, 0, 78);
				pushPreThing(Platform, 128, 24, 6, collideTransport);
				fillPreThing(Coin, 121, 55, 16, 1, 8);
				pushPreThing(Stone, 256, 40);
				fillPreThing(Coin, 273, 55, 16, 1, 8);
				pushPreThing(Stone, 408, 48, 1, 2);
				fillPreThing(Coin, 425, 63, 7, 1, 8);
				pushPreThing(Stone, 488, 48, 1, 2);
				pushPreThing(Stone, 536, 56, 2);
				fillPreThing(Stone, 568, 56, 5, 1, 16);
				fillPreThing(Coin, 569, 63, 10, 1, 8);
				fillPreThing(Coin, 681, 15, 3, 1, 8);
				
				setExitLoc(3);
			}),
			new Area("Underworld", function() { // second underworld
				setLocationGeneration(8);
				
				makeCeiling(32, 11);
				pushPreFloor(0, 0, 17);
				fillPreThing(Brick, 0, 8, 1, 11, 8, 8);
				fillPreThing(Brick, 24, 16, 1, 3, 8, 8);
				fillPreThing(Coin, 25, 39, 8, 1, 8);
				fillPreThing(Coin, 25, 7, 10, 1, 8);
				fillPreThing(Brick, 32, 32, 6, 1, 8);
				fillPreThing(Brick, 80, 16, 1, 3, 8, 8);
				pushPreThing(PipeSide, 104, 16, 4);
				pushPreThing(Brick, 104, 32, Mushroom);
				pushPreThing(PipeVertical, 120, 88, 88);
			})
		];
	},
	World63(map) {
		map.time = 300;
		map.locs = [
			new Location(0, true)
		];
		map.areas = [
			new Area("Overworld Night Alt2", function() {
				setLocationGeneration(0);
				pushPreCastle();
				pushPrePattern("backcloud", 0, 4, 4);
				pushPreFloor(0, 0, 16);
				
				pushPreTree(144, 0, 3);
				pushPreTree(168, 32, 3);
				pushPreTree(192, 0, 3);
				pushPreThing(Platform, 224, 0, 4, [moveFloating, 0, 56]); // should move up and down
				fillPreThing(Coin, 226, 87, 2, 1, 8);
				
				pushPreTree(248, 32, 4);
				pushPreTree(296, 0, 3);
				pushPreThing(Springboard, 304, 14.5);
				pushPreTree(344, 0, 3);
				fillPreThing(Coin, 345, 71, 7, 1, 8);
				pushPreThing(Platform, 348, 64, 4, [moveSliding, 312, 364]);
				pushPreThing(Platform, 388, 47, 4, [moveSliding, 356, 400]);
				pushPreTree(392, 16, 4);
				
				pushPreThing(Block, 440, 80, Mushroom);
				pushPreThing(Platform, 444, 56, 4, [moveSliding, 408, 464]);
				pushPreThing(Platform, 480, 7, 4, [moveFloating, -8, 52]);
				pushPreTree(520, 32, 5);
				
				pushPreScale(572, 86, 8, [4, 4, 12]);
				pushPreScale(636, 86, 6, [4, 4, 12]);
				
				pushPreTree(680, 24, 5);
				pushPreTree(680, 80, 3);
				fillPreThing(Coin, 681, 87, 3, 1, 8);
				pushPreTree(720, 40, 3);
				pushPreTree(744, 0, 3);
				pushPreTree(776, 0, 4);
				fillPreThing(Coin, 801, 39, 4, 1, 8);
				pushPreTree(824, 0, 3);
				pushPreTree(856, 32, 5);
				pushPreTree(904, 0, 5);
				pushPreThing(Springboard, 928, 14.5);
				
				pushPreThing(Platform, 972, 63, 4, [moveSliding, 940, 992]);
				pushPreTree(984, 0, 3);
				pushPreScale(1020, 86, 6, [4, 6, 12]);
				pushPreTree(1056, 0, 4);
				pushPreTree(1056, 64, 3);
				pushPreTree(1080, 32, 4);
				
				pushPreThing(Platform, 1128, 47, 4, moveFalling);
				pushPreThing(Platform, 1160, 55, 4, moveFalling);
				fillPreThing(Coin, 1161, 47, 2, 1, 8);
				pushPreThing(Platform, 1192, 39, 4, moveFalling);
				pushPreThing(Platform, 1224, 47, 4, moveFalling);
				fillPreThing(Coin, 1233, 79, 2, 1, 8);
				pushPreTree(1248, 64, 3);
				
				pushPreFloor(1280, 0, 32);
				endCastleOutside(1332, 0, true, 13, 28);
			})
		];
	},
	World64(map) {
		map.time = 300;
		map.locs = [
			new Location(0, startCastle)
		];
		map.areas = [
			new Area("Castle", function() {
				setLocationGeneration(0);
				
				startCastleInside();
				
				makeCeilingCastle(40, 19, 3);
				pushPreFloor(40, 24, 8);
				fillPreWater(104, 8, 4);
				
				pushPreFloor(120, 24, 11);
				pushPreThing(Stone, 184, 64, 1, 1);
				pushPreThing(CastleBlock, 184, 56, 6);
				makeCeilingCastle(192, 136);
				fillPreWater(208, 0, 6);
				pushPreThing(Podoboo, 216, -32);
				
				pushPreFloor(232, 24, 3);
				pushPreThing(CastleBlock, 240, 24, 6);
				pushPreThing(Block, 240, 56, Mushroom);
				fillPreWater(256, 0, 6);
				pushPreThing(Podoboo, 264, -32);
				
				pushPreThing(Stone, 280, 32, 37, 1);
				pushPreThing(Stone, 280, 24, 69, 3);
				pushPreFloor(280, 0, 93);
				pushPreThing(Stone, 296, 80, 35, 3);
				pushPreThing(CastleBlock, 296, 56, 6);
				pushPreThing(CastleBlock, 392, 56, 6);
				pushPreThing(CastleBlock, 480, 56, 6);
				pushPreThing(CastleBlock, 536, 56, 6);
				pushPreThing(CastleBlock, 608, 32, 6);
				pushPreThing(Stone, 640, 80, 1, 1);
				pushPreThing(CastleBlock, 640, 72, 6);
				pushPreThing(CastleBlock, 672, 32, 6);
				pushPreThing(Stone, 704, 80, 1, 1);
				pushPreThing(CastleBlock, 704, 72, 6, true);
				pushPreThing(CastleBlock, 736, 32, 6);
				pushPreThing(Stone, 776, 80, 7, 2);
				pushPreThing(Block, 848, 32, Coin, true);
				pushPreThing(Block, 872, 32, Coin, true);
				pushPreThing(Block, 896, 32, Coin, true);
				pushPreThing(Block, 856, 64, Coin, true);
				pushPreThing(Block, 880, 64, Coin, true);
				pushPreThing(Block, 904, 64, Coin, true);
				pushPreThing(Stone, 928, 24, 4, 3);
				pushPreThing(Stone, 984, 24, 5, 3);
				pushPreThing(Stone, 984, 80, 5, 2);
				
				endCastleInside(1024);
			})
		];
	},
	World71(map) {
		map.locs = [
			new Location(0, true),
			new Location(0, exitPipeVert),
			new Location(1)
		];
		map.areas = [
			new Area("Overworld Alt", function() {
				setLocationGeneration(0);
				
				pushPreCastle(0, 0, true);
				pushPrePattern("backfence", 0, 0, 6);
				pushPreFloor(0, 0, 73);
				pushPreThing(Cannon, 152, 16, 2);
				pushPreThing(Koopa, 208, 22, false, true);
				pushPreThing(Brick, 216, Global.jumplev2, Mushroom);
				pushPreThing(Cannon, 224, 8, 1);
				pushPreThing(Cannon, 224, 24, 2);
				fillPreThing(Brick, 224, Global.jumplev2, 2, 1, 8);
				pushPreThing(Cannon, 288, 16, 2);
				fillPreThing(Block, 312, Global.jumplev1, 4, 1, 8);
				pushPreThing(Koopa, 352, 28, false, true);
				pushPreThing(Cannon, 368, 24, 3);
				pushPreThing(Koopa, 424, 22, false, true);
				pushPreThing(Cannon, 448, 8);
				pushPreThing(Cannon, 448, 24, 2);
				fillPreThing(Brick, 496, Global.jumplev1, 2, 1, 8);
				pushPreThing(Stone, 512, Global.jumplev1);
				pushPreThing(Cannon, 512, 48, 2);
				pushPreThing(Koopa, 520, 16, false, true);
				pushPreThing(Brick, 520, Global.jumplev1, Coin);
				pushPreThing(Brick, 528, Global.jumplev1);
				pushPreThing(Cannon, 544, 16, 2);
				
				pushPreFloor(600, 0, 77);
				pushPrePipe(608, 0, 24, true);
				fillPreThing(Brick, 656, Global.jumplev1, 7, 2, 8, 32);
				pushPreThing(HammerBro, 680, 44);
				pushPreThing(HammerBro, 692, 76);
				pushPrePipe(744, 0, 24, true, 2);
				pushPreThing(Block, 744, Global.jumplev2, [Mushroom, 1], true);
				pushPreThing(Cannon, 832, 16, 2);
				pushPrePipe(872, 0, 24, true);
				pushPreThing(Koopa, 912, 12);
				pushPrePipe(920, 0, 16, true, false, 1);
				pushPreThing(Cannon, 976, 16, 2);
				pushPrePipe(1024, 0, 16, true);
				fillPreThing(Brick, 1072, Global.jumplev1, 5, 2, 8, 32);
				pushPreThing(HammerBro, 1080, 12);
				pushPreThing(HammerBro, 1096, 44);
				pushPreThing(Stone, 1128, 24, 1, 3);
				pushPreThing(Cannon, 1168, 8);
				pushPreThing(Cannon, 1168, 24, 2);
				fillPreThing(Brick, 1192, 40, 2, 1, 8);
				pushPreThing(Springboard, 1208, 14.5);
				pushPreThing(Brick, 1208, 88, Mushroom);
				
				pushPreFloor(1224, 0, 50);
				pushPreThing(Stone, 1224, 8);
				fillPreThing(Brick, 1224, 56, 2, 1, 8);
				pushPreThing(Stone, 1232, 16, 1, 2);
				pushPreThing(Stone, 1240, 24, 1, 3);
				pushPreThing(Stone, 1248, 32, 1, 4);
				pushPreThing(Stone, 1256, 40, 1, 5);
				pushPreThing(Stone, 1264, 48, 1, 6);
				
				pushPreThing(Stone, 1296, 8);
				pushPreThing(Stone, 1304, 16, 1, 2);
				pushPreThing(Stone, 1312, 24, 1, 3);
				pushPreThing(Stone, 1320, 32, 1, 4);
				pushPreThing(Stone, 1328, 40, 1, 5);
				pushPreThing(Stone, 1336, 48, 1, 6);
				pushPreThing(Stone, 1344, 56, 1, 7);
				pushPreThing(Stone, 1352, 64, 2, 8);
				pushPreThing(Beetle, 1352, 72.5);
				
				endCastleOutside(1428);
			}),
			new Area("Underworld", function() {
				setLocationGeneration(2);
				
				makeCeiling(32, 7);
				pushPreFloor(0, 0, 17);
				fillPreThing(Brick, 0, 8, 1, 11, 8, 8);
				fillPreThing(Brick, 32, 8, 7, 3, 8, 8);
				fillPreThing(Coin, 33, 31, 7, 2, 8, 16);
				fillPreThing(Coin, 41, 63, 5, 1, 8, 8);
				pushPreThing(PipeSide, 104, 16, 1);
				pushPreThing(PipeVertical, 120, 88, 88);
			})
		];
	},
	World72(map) {
		map.locs = [
			new Location(0, walkToPipe),
			new Location(1),
			new Location(2, exitPipeVert)
		];
		map.areas = [
			new Area("Overworld", function() {
				setLocationGeneration(0);
				
				pushPreCastle();
				pushPrePattern("backcloud", 0, 4, 2);
				pushPreFloor(0, 0, 24);
				pushPreThing(PipeSide, 80, 16, 1);
				pushPrePipe(96, 0, 32);
			}),
			new Area("Underwater", function() {
				setLocationGeneration(1);
				goUnderWater();
				
				pushPreFloor(0, 0, 67);
				pushPreThing(Coral, 96, 24, 3);
				fillPreThing(Coin, 120, 7, 2, 1, 8);
				pushPreThing(Stone, 152, Global.jumplev1, 3, 1);
				pushPreThing(Blooper, 184, 16);
				pushPreThing(Blooper, 208, 46);
				fillPreThing(Coin, 224, Global.jumplev2, 3, 1, 8);
				pushPreThing(Coral, 272, 40, 5);
				fillPreThing(Coin, 296, 7, 3, 1, 8);
				pushPreThing(Stone, 344, Global.jumplev1, 2, 1);
				pushPreThing(Coral, 344, Global.jumplev1 + 16, 2);
				pushPreThing(Blooper, 376, Global.jumplev1);
				pushPreThing(Coral, 408, 32, 4);
				pushPreThing(Blooper, 424, 46);
				pushPreThing(Blooper, 448, 24);
				pushPreThing(Stone, 520, 24, 1, 3);
				pushPreThing(Stone, 528, 40, 1, 5);
				fillPreThing(Coin, 546, 23, 3, 1, 8);
				
				pushPreFloor(576, 0, 60);
				pushPreThing(Stone, 576, 40, 1, 5);
				pushPreThing(Stone, 584, 24, 1, 3);
				pushPreThing(CheepCheep, 616, 24, false, false);
				pushPreThing(Stone, 632, 24, 2, 3);
				pushPreThing(Stone, 632, 88, 2, 3);
				pushPreThing(Blooper, 624, 54);
				pushPreThing(CheepCheep, 640, 48, false, false);
				pushPreThing(CheepCheep, 656, 16, false, false);
				pushPreThing(Stone, 664, 64, 3, 1);
				pushPreThing(Blooper, 672, 40, false, false);
				pushPreThing(Coral, 672, 80, 2);
				pushPreThing(Coral, 720, 24, 3);
				pushPreThing(Blooper, 728, 16);
				pushPreThing(Blooper, 760, 80);
				pushPreThing(CheepCheep, 760, 56, false, false);
				pushPreThing(CheepCheep, 784, 80, true, false);
				fillPreThing(Coin, 816, 15, 3, 1, 8);
				pushPreThing(CheepCheep, 816, 24, false, false);
				pushPreThing(Stone, 824, 32, 2, 1);
				pushPreThing(Coral, 824, 64, 4);
				pushPreThing(Blooper, 848, 16);
				fillPreThing(Coin, 912, 55, 3, 1, 8, 8);
				pushPreThing(Stone, 928, 40, 2, 1);
				pushPreThing(CheepCheep, 944, 72, false, false);
				pushPreThing(Coral, 968, 32, 4);
				pushPreThing(CheepCheep, 1032, 24, true, false);
				pushPreThing(Stone, 1040, 32, 1, 4);
				pushPreThing(Stone, 1048, 16, 1, 2);
				pushPreThing(CheepCheep, 1056, 16, false, false);
				pushPreThing(Stone, 1056, 88, 1, 3);
				pushPreThing(Stone, 1064, 72, 8, 1);
				pushPreThing(Coin, 1072, 15);
				fillPreThing(Coin, 1080, 7, 3, 1, 8);
				pushPreThing(Coin, 1104, 15);
				pushPreThing(CheepCheep, 1100, 40, false, false);
				pushPreFloor(1128, 0, 17);
				pushPreThing(Stone, 1128, 16, 1, 2);
				pushPreThing(Stone, 1136, 32, 1, 4);
				pushPreThing(CheepCheep, 1160, 32, false, false);
				pushPreThing(Coral, 1184, 16, 2);
				pushPreThing(Coral, 1200, 24, 3);
				pushPreThing(CheepCheep, 1206, 56, true, false);
				pushPreThing(Blooper, 1208, 38);
				pushPreThing(Stone, 1256, 64, 1, 8);
				pushPreThing(Stone, 1264, 64, 2, 1);
				fillPreThing(Coin, 1281, 32, 3, 2, 8, -24);
				pushPreThing(Stone, 1304, 64, 2, 1);
				pushPreFloor(1320, 0, 40);
				pushPreThing(Stone, 1320, 64, 1, 8);
				pushPreThing(CheepCheep, 1320, 80, false, false);
				pushPreThing(CheepCheep, 1344, 16, true, false);
				fillPreThing(Stone, 1384, 32, 1, 2, 0, 32, 5, 1);
				pushPreThing(Blooper, 1392, 14);
				pushPreThing(Coral, 1392, 80, 2);
				pushPreThing(CheepCheep, 1408, 40, false, false);
				pushPreThing(Blooper, 1440, 14);
				fillPreThing(Stone, 1448, 32, 1, 2, 0, 32, 4, 1);
				pushPreThing(CheepCheep, 1472, 72, true, false);
				pushPreThing(CheepCheep, 1496, 48, true, false);
				
				pushPreThing(Stone, 1488, 8, 5, 1);
				pushPreThing(Stone, 1496, 16, 4, 1);
				pushPreThing(Stone, 1504, 24, 3, 1);
				pushPreThing(Stone, 1512, 32, 2, 1);
				pushPreThing(Stone, 1512, 88, 2, 4);
				pushPreThing(PipeSide, 1520, 48, 2);
				pushPreThing(Stone, 1528, 88, 14, 11);
			}),
			new Area("Overworld", function() {
				setLocationGeneration(2);
				
				pushPrePattern("backreg", 104, 0, 1);
				pushPreFloor(0, 0, 42);
				pushPrePipe(0, 0, 16, true, false, 2);
				pushPreThing(Stone, 16, 8);
				pushPreThing(Stone, 24, 16, 1, 2);
				pushPreThing(Stone, 32, 24, 1, 3);
				pushPreThing(Stone, 40, 32, 1, 4);
				pushPreThing(Stone, 48, 40, 1, 5);
				pushPreThing(Stone, 56, 48, 1, 6);
				pushPreThing(Stone, 64, 56, 1, 7);
				pushPreThing(Stone, 72, 64, 1, 8);
				pushPreThing(Stone, 80, 64, 1, 8);
				endCastleOutside(148);
			})
		];
	},
	World73(map) {
		map.time = 300;
		map.locs = [
			new Location(0, true)
		];
		map.areas = [
			new Area("Overworld", function() {
				setLocationGeneration(0);
				
				pushPreCastle();
				pushPrePattern("backcloud", 0, 4, 5);
				
				pushPreFloor(0, 0, 7);
				zoneStartCheeps(64);
				pushPreTree(64, 0, 8);
				pushPreThing(Stone, 80, 8);
				pushPreThing(Stone, 88, 16, 1, 2);
				pushPreThing(Stone, 96, 24, 1, 3);
				pushPreThing(Stone, 104, 24, 1, 3);
				pushPreThing(Stone, 112, 24, 1, 3);
				pushPreBridge(120, 24, 16);
				pushPreThing(Stone, 248, 24, 1, DtB(24, 8));
				pushPreBridge(256, 24, 15);
				fillPreThing(Coin, 290, 63, 4, 1, 8, 8);
				pushPreThing(Koopa, 312, 36);
				pushPreThing(Stone, 376, 24, 1, DtB(24, 8));
				pushPreBridge(384, 24, 16);
				pushPreThing(Koopa, 416, 44, false, true);
				fillPreThing(Coin, 441, 63, 3, 1, 16);
				fillPreThing(Coin, 449, 55, 2, 1, 16);
				pushPreThing(Stone, 504, 24, 1, DtB(24, 8));

				
				pushPreThing(Stone, 544, 24, 1, DtB(24, 8));
				pushPreBridge(552, 24, 10);
				fillPreThing(Coin, 578, 63, 2, 1, 24);
				fillPreThing(Coin, 586, 71, 2, 1, 8);
				pushPreThing(Stone, 632, 24, 1, DtB(24, 8));
				pushPreThing(Koopa, 632, 36, true, false);
				
				
				pushPreThing(Stone, 672, 24, 1, DtB(24, 8));
				pushPreBridge(680, 24, 10);
				pushPreThing(Stone, 760, 24, 1, DtB(24, 8));
				pushPreThing(Koopa, 760, 36, true, false);
				
				fillPreThing(Coin, 777, 63, 3, 1, 8);
				pushPreThing(Stone, 792, 32, 1, DtB(24, 8));
				pushPreBridge(800, 32, 5, [true, true]);
				pushPreThing(Block, 816, 64, Mushroom);
				
				fillPreThing(Coin, 865, 63, 3, 1, 8);
				pushPreTree(896, 0, 8);
				pushPreThing(Koopa, 952, 12, true);
				pushPreBridge(976, 24, 3);
				
				pushPreBridge(1024, 24, 15, [true, true]);
				fillPreThing(Coin, 1065, 63, 6, 1, 8);
				pushPreThing(Koopa, 1120, 52, false, true);
				
				pushPreBridge(1176, 8, 8, [true, true]);
				fillPreThing(Coin, 1193, 39, 4, 1, 8);
				pushPreThing(Koopa, 1248, 36, false, true);
				
				pushPreBridge(1280, 24, 8, [true, true]);
				
				pushPreBridge(1368, 24, 2);
				fillPreThing(Coin, 1385, 55, 6, 1, 8);
				pushPreBridge(1400, 24, 2);
				pushPreBridge(1432, 24, 2);
				pushPreBridge(1472, 24, 9, [true]);
				pushPreTree(1536, 0, 13);
				pushPreThing(Stone, 1544, 24, 1, 3);
				pushPreThing(Stone, 1552, 24, 1, 3);
				pushPreThing(Stone, 1560, 16, 1, 2);
				pushPreThing(Stone, 1568, 8);
				zoneStopCheeps(1600);
				
				pushPreFloor(1656, 0, 35);
				pushPreThing(Stone, 1664, 8);
				pushPreThing(Stone, 1672, 16, 1, 2);
				pushPreThing(Stone, 1680, 24, 1, 3);
				pushPreThing(Stone, 1688, 32, 1, 4);
				pushPreThing(Stone, 1696, 40, 1, 5);
				pushPreThing(Stone, 1704, 48, 1, 6);
				pushPreThing(Stone, 1712, 56, 1, 7);
				pushPreThing(Stone, 1720, 64, 1, 8);
				pushPreThing(Stone, 1728, 64, 1, 8);
				
				endCastleOutside(1796, 0, true, 6);
			})
		];
	},
	World74(map) {
		map.locs = [
			new Location(0, startCastle)
		];
		map.areas = [
			new Area("Castle", function() {
				setLocationGeneration(0);
				startCastleInside();

				makeCeilingCastle(40, 11, 3);
				pushPreFloor(40, 24, 11);
				fillPreWater(128, 0, 22);
				makeCeilingCastle(128, 16);
				pushPreThing(Platform, 144, 48, 4, moveFalling); // falling
				pushPreThing(Podoboo, 160, -32);
				pushPreThing(Platform, 176, 40, 4, moveFalling); // falling
				
				pushPreThing(Stone, 216, 24, 5, DtB(24, 8));
				pushPreThing(Stone, 224, 80, 4, 2)
				
				this.sections = {
					start: 256,
					0: function(xloc) {
						pushPreFloor(xloc, 0, bstretch * 3 + 31);
						makeCeilingCastle(xloc, bstretch * 3 + 31);
						
						pushPreThing(Stone, xloc + 16, 32, 5);
						pushPreThing(Stone, xloc + 32, 40, 3);
						pushPreThing(Stone, xloc + 40, 48, 2);
						pushPreThing(Stone, xloc + 48, 56, 1);
						pushPreThing(Stone, xloc + 56, 56, bstretch, 4);
						
						pushPreSectionPass(xloc + (bstretch + 1) * 8, 24, 40, 24);
						pushPreSectionFail(xloc + (bstretch + 1) * 8, 80, 40, 24);

						pushPreThing(Stone, xloc + (bstretch + 11) * 8, 24, bstretch + 2);
						pushPreThing(Stone, xloc + (bstretch + 12) * 8, 56, bstretch);
						pushPreSectionFail(xloc + (bstretch * 2 + 6) * 8, 16, 40, 16);
						pushPreSectionPass(xloc + (bstretch * 2 + 6) * 8, 48, 40, 24);
						pushPreSectionFail(xloc + (bstretch * 2 + 6) * 8, 80, 40, 24);
						
						pushPreThing(Stone, xloc + (bstretch * 2 + 16) * 8, 56, bstretch + 7, 4);
						pushPreSectionFail(xloc + (bstretch * 2 + 17) * 8, 24, 40, 24);
						pushPreSectionPass(xloc + (bstretch * 2 + 17) * 8, 80, 40, 24);
						pushPreThing(Stone, xloc + (bstretch * 3 + 23) * 8, 40, 1);
						pushPreThing(Stone, xloc + (bstretch * 3 + 23) * 8, 48, 2);
						pushPreThing(Stone, xloc + (bstretch * 3 + 23) * 8, 56, 4);
						
						pushPreThing(Stone, xloc + (bstretch * 3 + 28) * 8, 24, 3, 3);
						pushCastleDecider(xloc + (bstretch * 3 + 31) * 8, 0);
					},
					1: function(xloc) {
						pushPreFloor(xloc, 24, 3);
						makeCeilingCastle(xloc, 17);
						pushPreFloor(xloc + 24, 0, 4);
						pushPreThing(Stone, xloc + 48, 56, 2);
						fillPreWater(xloc + 56, 0, 6);
						pushPreThing(Stone, xloc + 72, 56, 3);
						pushPreFloor(xloc + 80, 0);
						pushPreThing(CastleBlock, xloc + 80, 48, 6, true);
						fillPreWater(xloc + 88, 0, 6);
						pushPreThing(Stone, xloc + 104, 56, 4, 1);
						pushPreFloor(xloc + 112, 0, 3);
						
						pushPreSectionFail(xloc + 96 + (bstretch - 6) * 8, 24, 40, 24);
						pushPreSectionPass(xloc + 96 + (bstretch - 6) * 8, 80, 40, 24);
						pushPreFloor(xloc + 136, 0, bstretch - 5);
						pushPreThing(Stone, xloc + 136, 56, bstretch - 5, 4);
						makeCeilingCastle(xloc + 136, bstretch - 5);
						
						pushPreSectionFail(xloc + (bstretch * 2 + 9) * 8, 80, 40, 24);
						pushPreSectionPass(xloc + (bstretch * 2 + 10) * 8, 48, 32, 24);
						pushPreSectionFail(xloc + (bstretch * 2 + 10) * 8, 16, 40, 16);
						pushPreFloor(xloc + (bstretch + 12) * 8, 0, bstretch + 10);
						makeCeilingCastle(xloc + (bstretch + 12) * 8, bstretch + 10);
						pushPreThing(Stone, xloc + (bstretch + 14) * 8, 56, 3);
						pushPreThing(Stone, xloc + (bstretch + 15) * 8, 24, 3);
						pushPreThing(Stone, xloc + (bstretch + 19) * 8, 56, bstretch - 4);
						pushPreThing(Stone, xloc + (bstretch + 20) * 8, 24, bstretch - 4);
						pushPreThing(Stone, xloc + (bstretch * 2 + 17) * 8, 56, 3);
						pushPreThing(Stone, xloc + (bstretch * 2 + 18) * 8, 24, 3);
						
						pushPreFloor(xloc + (bstretch * 2 + 22) * 8, 0, bstretch + 12);
						makeCeilingCastle(xloc + (bstretch * 2 + 22) * 8, bstretch + 12);
						pushPreThing(Stone, xloc + (bstretch * 2 + 22) * 8, 48, 1, 3);
						pushPreThing(Stone, xloc + (bstretch * 2 + 22) * 8, 56, bstretch + 5);
						pushPreThing(Stone, xloc + (bstretch * 2 + 24) * 8, 8, bstretch + 10);
						pushPreThing(Stone, xloc + (bstretch * 2 + 25) * 8, 16, bstretch + 9);
						pushPreThing(Stone, xloc + (bstretch * 2 + 26) * 8, 24, bstretch + 8);
						pushPreSectionFail(xloc + (bstretch * 2 + 28) * 8, 48, 40, 24);
						pushPreSectionPass(xloc + (bstretch * 2 + 28) * 8, 80, 40, 24);
						pushCastleDecider(xloc + (bstretch * 3 + 34) * 8, 1);
					},
					2: function(xloc) {
						pushPreFloor(xloc, 0, 3);
						makeCeilingCastle(xloc, 32);
						pushPreFloor(xloc + 24, 24, 3);
						pushPreFloor(xloc + 48, 0, 2);
						pushPreFloor(xloc + 64, 24, 8);
						pushPreFloor(xloc + 128, 0, 2);
						pushPreFloor(xloc + 144, 24, 2);
						pushPreFloor(xloc + 160, 0, 2);
						pushPreFloor(xloc + 176, 24, 2);
						pushPreFloor(xloc + 192, 0, 2);
						pushPreFloor(xloc + 208, 24, 6);
						endCastleInside(xloc + 256);
					}
				}
			})
		];
	},
	World81(map) {
		map.time = 300;
		map.locs = [
			new Location(0, true),
			new Location(0, exitPipeVert),
			new Location(1)
		];
		map.areas = [
			new Area("Overworld", function() {
				setLocationGeneration(0);
			
				pushPrePattern("backfence", 0, 0, 10);
				pushPreCastle(0, 0, true);
				pushPreFloor(0, 0, 46);
				pushPreThing(Beetle, 144, 8.5);
				fillPreThing(Goomba, 184, 8, 3, 1, 12);
				fillPreThing(Goomba, 240, 8, 3, 1, 12);
				pushPrePipe(280, 0, 32, true);
				fillPreThing(Koopa, 344, 12, 2, 1, 12);
				pushPreFloor(376, 0, 1);
				pushPreFloor(392, 0, 2);
				pushPreFloor(416, 0, 2);
				pushPreFloor(440, 0, 2);
				pushPreFloor(464, 0, 111);
				pushPreThing(Koopa, 488, 12);
				pushPreThing(Coin, 513, 39);
				fillPreThing(Goomba, 552, 8, 3, 1, 12);
				pushPrePipe(608, 0, 32, true);
				pushPreThing(Block, 640, 40, [Mushroom, 1], true);
				pushPreThing(Beetle, 648, 8.5);
				pushPrePipe(656, 0, 24, true);
				pushPreThing(Coin, 713, 39);
				pushPrePipe(752, 0, 32, true);
				pushPreThing(Coin, 786, 39);
				pushPrePipe(832, 0, 32, true, 2);
				fillPreThing(Goomba, 864, 8, 3, 1, 12);
				fillPreThing(Coin, 873, 71, 2, 1, 8);
				pushPrePipe(920, 0, 16, true, false, 1);
				pushPreThing(Koopa, 952, 12);
				fillPreThing(Koopa, 992, 12, 3, 1, 12);
				fillPreThing(Koopa, 1040, 12, 3, 1, 12);
				pushPrePipe(1120, 0, 24, true);
				fillPreThing(Goomba, 1184, 8, 3, 1, 12);
				pushPreThing(Stone, 1224, 32, 1, 4);
				fillPreThing(Brick, 1232, Global.jumplev2, 4, 1, 8);
				pushPreThing(Block, 1264, Global.jumplev1, Coin, true);
				pushPreThing(Brick, 1264, Global.jumplev2, Mushroom);
				fillPreThing(Brick, 1272, Global.jumplev2, 3, 1, 8);
				pushPreThing(Koopa, 1288, Global.jumplev1, false, true);
				pushPreThing(Stone, 1304, 32, 1, 4);
				
				pushPreFloor(1360, 0, 1);
				pushPreFloor(1376, 0, 2);
				pushPreThing(Koopa, 1376, 32, false, true);
				pushPreFloor(1400, 0, 1);
				pushPreFloor(1416, 0, 2);
				pushPreThing(Koopa, 1416, 28, false, true);
				pushPreFloor(1416, 0, 2);
				
				pushPreFloor(1440, 0, 17);
				fillPreThing(Brick, 1472, 40, 2, 1, 8);
				pushPreThing(Brick, 1488, 40, Star);
				fillPreThing(Brick, 1496, 40, 5, 1, 8);
				pushPreFloor(1584, 0, 1);
				pushPreFloor(1600, 0, 1);
				pushPreFloor(1616, 0, 19);
				fillPreThing(Koopa, 1656, 12, 2, 1, 12);
				pushPreThing(Stone, 1680, 16, 1, 2);
				
				fillPreThing(Coin, 1785, 39, 2, 1, 8);
				
				pushPreFloor(1816, 0, 10);
				fillPreThing(Goomba, 1856, 8, 3, 1, 12);
				pushPreFloor(1904, 0, 2);
				pushPrePipe(1904, 0, 24, true);
				pushPreFloor(1936, 0, 2);
				pushPrePipe(1936, 0, 32, true);
				
				pushPreFloor(1968, 0, 44);
				pushPrePipe(1968, 0, 40);
				pushPreThing(Beetle, 2032, 8.5);
				fillPreThing(Goomba, 2056, 8, 3, 1, 12);
				fillPreThing(Goomba, 2112, 8, 3, 1, 12);
				fillPreThing(Goomba, 2176, 8, 2, 1, 12);
				pushPreThing(Stone, 2200, 8);
				pushPreThing(Stone, 2208, 16, 1, 2);
				pushPreThing(Stone, 2216, 24, 1, 3);
				pushPreThing(Stone, 2224, 32, 1, 4);
				pushPreThing(Stone, 2232, 40, 1, 5);
				pushPreThing(Stone, 2240, 48, 1, 6);
				pushPreThing(Beetle, 2264, 8.5);
				fillPreThing(Coin, 2265, 39, 2, 1, 8);
				
				fillPreThing(Coin, 2329, 39, 2, 1, 40);
				pushPreFloor(2344, 0, 2);
				pushPreFloor(2384, 0, 16);
				fillPreThing(Stone, 2424, 16, 2, 1, 32, 8, 1, 2);
				pushPreThing(Koopa, 2440, 12);
				fillPreThing(Coin, 2529, 39, 2, 1, 8);
				pushPreFloor(2552, 0, 1);
				fillPreThing(Coin, 2569, 39, 2, 1, 8);
				
				pushPreFloor(2592, 0, 35);
				pushPreThing(Koopa, 2656, 12);
				fillPreThing(Koopa, 2712, 12, 3, 1, 12);
				pushPrePipe(2752, 0, 24, true);
				pushPrePipe(2840, 0, 16, true);
				
				pushPreFloor(2880, 0, 1);
				pushPreThing(Stone, 2880, 16, 1, 2);
				pushPreFloor(2896, 0, 1);
				pushPreThing(Stone, 2896, 32, 1, 4);
				pushPreFloor(2912, 0, 1);
				pushPreThing(Stone, 2912, 48, 1, 6);
				pushPreFloor(2928, 0, 34);
				pushPreThing(Stone, 2928, 64, 2, 8);
				endCastleOutside(3004);
			}),
			new Area("Underworld", function() {
				setLocationGeneration(2);
				
				pushPreFloor(0, 0, 17);
				fillPreThing(Brick, 0, 8, 1, 11, 8, 8);
				fillPreThing(Coin, 25, 7, 9, 1, 8, 8);
				fillPreThing(Brick, 24, 32, 9, 1, 8, 8);
				fillPreThing(Coin, 33, 39, 8, 1, 8, 8);
				pushPreThing(Brick, 96, 32, Coin);
				fillPreThing(Brick, 24, 64, 10, 4, 8, 8);
				fillPreThing(Brick, 104, 24, 2, 9, 8, 8);
				pushPreThing(PipeSide, 104, 16, 1);
				pushPreThing(PipeVertical, 120, 100, 100);
			})
		];
	},
	World82(map) {
		map.locs = [
			new Location(0, true),
			new Location(0, exitPipeVert),
			new Location(1)
		];
		map.areas = [
			new Area("Overworld", function() {
				setLocationGeneration(0);
				
				pushPrePattern("backfencemin2", 0, 0, 5);
				pushPreCastle();
				pushPreFloor(0, 0, 15);
				pushPreFloor(128, 0, 5);
				pushPreThing(Lakitu, 128, 84);
				pushPreThing(Stone, 136, 8, 1);
				pushPreThing(Stone, 144, 16, 1, 2);
				pushPreThing(Stone, 152, 24, 1, 3);
				pushPreThing(Stone, 160, 32, 1, 4);
				pushPreFloor(176, 0, 14);
				pushPreThing(Stone, 176, 48, 1, 6);
				pushPreThing(Stone, 184, 56, 1, 7);
				pushPreThing(Stone, 192, 64, 2, 8);
				fillPreThing(Block, 232, 32, 4, 1, 8);
				
				pushPreFloor(296, 0, 8);
				pushPreThing(Brick, 344, 64);
				pushPreThing(Springboard, 352, 14.5);
				pushPreThing(Brick, 352, 64, [Mushroom, 1]);
				fillPreThing(Brick, 360, 64, 31, 1, 8);
				pushPreFloor(368, 0, 4);
				pushPreFloor(408, 0, 1);
				pushPreFloor(424, 0, 3);
				pushPreFloor(456, 0, 6);
				pushPreThing(Koopa, 456, 26, false, true);
				pushPreFloor(512, 0, 14);
				fillPreThing(Brick, 616, 32, 2, 1, 8);
				pushPreScenery("PlantLarge", 552, 0);
				pushPreFloor(640, 0, 4);
				
				pushPreFloor(680, 0, 53);
				pushPreThing(Cannon, 680, 16, 2);
				pushPreThing(Koopa, 736, 32, false, true);
				pushPreThing(Cannon, 744, 8, 1, true);
				pushPreThing(Cannon, 744, 24, 2);
				pushPreThing(Koopa, 760, 24, false, true);
				pushPreThing(Brick, 792, Global.jumplev1);
				pushPreThing(Brick, 800, Global.jumplev1, Mushroom);
				pushPreThing(Cannon, 840, 16, 2);
				fillPreThing(Brick, 880, Global.jumplev1, 2, 1, 8);
				pushPreScenery("Fence", 888, 0);
				pushPreThing(Beetle, 888, 8.5);
				pushPreThing(Cannon, 920, 8, 1);
				pushPreThing(Brick, 944, Global.jumplev1);
				pushPreScenery("PlantLarge", 936, 0);
				pushPreThing(Stone, 952, Global.jumplev1);
				pushPreThing(Cannon, 952, 40);
				pushPreThing(Brick, 960, Global.jumplev1, Mushroom);
				pushPreThing(Beetle, 968, 8.5);
				pushPreThing(Beetle, 984, 8.5);
				pushPreThing(Cannon, 1000, 24, 3);
				pushPrePipe(1048, 0, 16, true);
				
				pushPreFloor(1112, 0, 5);
				pushPreThing(Koopa, 1112, 12, false, true);
				pushPrePipe(1136, 0, 16, true);
				pushPreFloor(1160, 0, 1);
				pushPreFloor(1176, 0, 1);
				
				pushPreFloor(1232, 0, 20);
				pushPreScenery("Fence", 1272, 0);
				pushPrePipe(1248, 0, 32, true, 2);
				pushPrePipe(1304, 0, 16, true, false, 1);
				pushPreScenery("PlantLarge", 1320, 0);
				pushPreThing(Koopa, 1360, 32, false, true);
				pushPreThing(Koopa, 1376, 24, false, true);
				pushPreFloor(1400, 0, 1);
				pushPreThing(Cannon, 1400, 16, 2);
				pushPreThing(Koopa, 1400, 48, false, true);
				
				pushPreFloor(1432, 0, 23);
				pushPreThing(Stone, 1456, 8, 1);
				pushPreThing(Stone, 1464, 16, 1, 2);
				pushPreThing(Stone, 1472, 24, 1, 3);
				pushPreThing(Goomba, 1472, 32);
				pushPreThing(Stone, 1480, 32, 1, 4);
				pushPreThing(Stone, 1488, 40, 1, 5);
				pushPreThing(Goomba, 1488, 48);
				pushPreThing(Beetle, 1512, 8.5);
				pushPreThing(Cannon, 1528, 8, 1, true);
				pushPreThing(Cannon, 1528, 24, 2);
				pushPreThing(Stone, 1592, 8);
				pushPreThing(Stone, 1600, 16, 1, 2);
				pushPreThing(Stone, 1608, 24, 1, 3);
				pushPreFloor(1624, 0, 1);
				pushPreThing(Stone, 1624, 40, 1, 5);
				pushPreThing(Koopa, 1624, 72, false, true);
				
				pushPreThing(SceneryBlocker, 1640, 24, 8, 24);
				pushPreFloor(1648, 0, 40);
				pushPreFuncCollider(1648, zoneDisableLakitu);
				pushPreThing(Stone, 1648, 64, 2, 8);
				pushPreScenery("PlantLarge", 1704, 0);
				endCastleOutside(1724);
			}),
			new Area("Underworld", function() {
					setLocationGeneration(2);
					
					makeCeiling(32, 7);
					pushPreFloor(0, 0, 17);
					fillPreThing(Brick, 0, 8, 1, 11, 8, 8);
					fillPreThing(Brick, 32, 48, 7, 1, 8);
					pushPreThing(Brick, 32, 56);
					fillPreThing(Coin, 42, 55, 5, 2, 8, 8);
					fillPreThing(Brick, 80, 56, 1, 4, 8, 8);
					fillPreThing(Brick, 88, 56, 2, 1, 8);
					pushPreThing(Brick, 112, 48, Coin);
					pushPreThing(PipeSide, 104, 16, 1);
					pushPreThing(PipeVertical, 120, 88, 88);
			})
		];
	},
	World83(map) {
		map.time = 300;
		map.locs = [
			new Location(0, true)
		];
		map.areas = [
			new Area("Overworld", function() {
				setLocationGeneration(0);
				
				pushPrePattern("backfencemin3", -384, 0, 7);
				pushPreCastle();
				pushPreFloor(0, 0, 69);
				// pushPreScenery("Fence", 120, 0);
				pushPreThing(Cannon, 144, 16, 2);
				pushPreScenery("CastleWall", 192, 0, 8);
				pushPreThing(Koopa, 240, 32, false, true);
				pushPreThing(Cannon, 272, 24, 3);
				pushPreScenery("CastleWall", 296, 0, 14);
				pushPrePipe(424, 0, 32, true);
				fillPreThing(Brick, 480, Global.jumplev1, 8, 1, 8);
				fillPreThing(Brick, 480, Global.jumplev2, 6, 1, 8);
				// pushPreScenery("Fence", 504, 0);
				pushPreThing(HammerBro, 504, 12);
				pushPreThing(HammerBro, 520, 44);
				pushPreThing(Brick, 528, Global.jumplev2, Mushroom);
				pushPreThing(Brick, 536, Global.jumplev2);
				
				pushPreFloor(568, 0, 4);
				pushPreThing(Stone, 568, 32, 1, 4);
				pushPreThing(Stone, 576, 24, 1, 3);
				pushPreThing(Stone, 584, 16, 1, 2);
				pushPreThing(Stone, 592, 8, 1, 1);
				
				pushPreFloor(616, 0, 47);
				pushPreScenery("CastleWall", 632, 0, 6);
				pushPreThing(Cannon, 688, 16, 2);
				pushPreScenery("CastleWall", 704, 0, 6);
				pushPreThing(Koopa, 744, 24, false, true);
				pushPreThing(Stone, 760, 24, 1, 3);
				pushPreScenery("CastleWall", 776, 0, 10);
				pushPreThing(Stone, 872, 32, 2, 4);
				fillPreThing(Brick, 920, Global.jumplev1, 8, 1, 8);
				pushPreThing(Brick, 920, Global.jumplev2);
				pushPreThing(Brick, 928, Global.jumplev2, Mushroom);
				pushPreThing(HammerBro, 936, 44);
				fillPreThing(Brick, 936, Global.jumplev2, 6, 1, 8);
				pushPreThing(HammerBro, 952, 12);
				
				pushPreFloor(1008, 0, 2);
				pushPrePipe(1008, 0, 32, true);
				
				pushPreFloor(1040, 0, 67);
				pushPreScenery("CastleWall", 1056, 0, 34);
				pushPreThing(Koopa, 1096, 12);
				pushPreThing(HammerBro, 1168, 12);
				pushPreThing(HammerBro, 1270, 12);
				pushPrePipe(1344, 0, 24, true);
				pushPreScenery("CastleWall", 1376, 0, 20);
				pushPreThing(HammerBro, 1416, 12);
				pushPreThing(HammerBro, 1480, 12);
				pushPreThing(Brick, 1520, Global.jumplev1, Coin);
				pushPreThing(Stone, 1560, 16, 1, 2);
				
				pushPreThing(Stone, 1584, 16);
				pushPreThing(Stone, 1600, 32);
				pushPreThing(Stone, 1616, 48);
				pushPreThing(SceneryBlocker, 1624, 24, 40, 24);
				pushPreThing(Stone, 1632, 64, 2, 1);
				pushPreFloor(1664, 0, 32);
				endCastleOutside(1708, 0, true, 11, 44);
			})
		];
	},
	World84(map) {
		map.locs = [
			new Location(0, startCastle),
			new Location(0, exitPipeVert), // Pipe 1
			new Location(1, exitPipeVert), // Past B
			new Location(2, exitPipeVert), // Past D
			new Location(3, exitPipeVert, 24), // Underwater
			new Location(4, exitPipeVert)  // Pipe 2
		];
		map.areas = [
			new Area("Castle", function() { // Area 0
				setLocationGeneration(0);
				
				startCastleInside();
				pushPreThing(Stone, 40, 24, 1, DtB(24, 8));
				makeCeilingCastle(40, 32);
				fillPreWater(48, 0, 10);
				pushPreThing(Stone, 88, 0, 8, DtB(0, 8));
				pushPrePipe(152, 16, Infinity, true, false, 1); // Pipe 1
				pushPreFloor(168, 0, 11);
				
				this.sections = {
					start: 256,
					0: function(xloc) {
						pushPreFloor(xloc, 0, bstretch);
						makeCeilingCastle(xloc, bstretch + 53);
						pushPreSectionFail(xloc, 80, 40, 80);
						pushPrePipe(xloc + bstretch * 8, 16, Infinity, true, 1); // Back to Pipe 1
						pushPreFloor(xloc + bstretch * 8 + 16, 0, 9);
						fillPreThing(Goomba, xloc + bstretch * 8 + 36, 8, 3, 1, 12);
						pushPreFloor(xloc + bstretch * 8 + 88, 24, 4);
						fillPreWater(xloc + bstretch * 8 + 120, 0, 34);
						// To do: make sure this is correct
						pushPreThing(Platform, xloc + bstretch * 8 + 152, 0, 4, [moveSliding, xloc + bstretch * 8 + 140, xloc + bstretch * 8 + 232, 2]);
						pushPreFloor(xloc + bstretch * 8 + 256, 24, 6);
						pushPreThing(Stone, xloc + bstretch * 8 + 264, 56, 4);
						pushPrePipe(xloc + bstretch * 8 + 304, 40, Infinity, true, 2); // Goes to Past B
						pushPreFloor(xloc + bstretch * 8 + 320, 24, 7);
						pushPrePipe(xloc + bstretch * 8 + 376, 48, Infinity, true);
						pushPreFloor(xloc + bstretch * 8 + 392, 24, 4);
						pushCastleDecider(xloc + bstretch * 8 + 424, 0);
					}
				}
			}),
			new Area("Castle", function() { // Area 1
				setLocationGeneration(2);
				
				setBStretch();
				pushPreFloor(0, 0, bstretch);
				makeCeilingCastle(0, bstretch);
				this.sections = {
					start: bstretch * 8,
					0: function(xloc) {
						pushPreSectionFail(xloc, 80, 40, 80);
						pushPrePipe(xloc, 16, Infinity, true, false, 2); // Past B
						makeCeilingCastle(xloc, bstretch + 45);
						pushPreFloor(xloc + 16, 0, 5);
						pushPrePipe(xloc + 56, 24, Infinity, true);
						pushPreFloor(xloc + 72, 0, 8);
						fillPreThing(Beetle, xloc + 104, 8.5, 2, 1, 16);
						pushPrePipe(xloc + 136, 16, Infinity, true, 1); // Back to Pipe 1
						pushPreFloor(xloc + 152, 0, 8);
						pushPreThing(Koopa, xloc + 192, 32, false, true);
						pushPreThing(Koopa, xloc + 208, 24, false, true);
						pushPrePipe(xloc + 216, 24, Infinity, true);
						fillPreWater(xloc + 232, 0, 6);
						pushPreFloor(xloc + 256, 0, 13 + bstretch);
						pushPreThing(Block, xloc + 280, Global.jumplev1, Coin, true);
						pushPreThing(Stone, xloc + 296, Global.jumplev1, 2);
						pushPrePipe(xloc + 296, Global.jumplev1, 24, true, 3); // Goes Past C
						pushPreThing(Koopa, xloc + 320, 20, false, true);
						pushPreThing(Koopa, xloc + 336, 24, false, true);
						pushCastleDecider(xloc + 360 + bstretch * 8, 0);
					}
				}
			}),
			new Area("Castle", function() {  // Area 2
				setLocationGeneration(3);
				
				pushPreFloor(0, 0, 3);
				makeCeilingCastle(0, 3);
				this.sections = {
					start: 24,
					0: function(xloc) {
						pushPreSectionFail(xloc, 80, 40, 80);
						pushPrePipe(xloc, 16, Infinity, true, false, 3);
						makeCeilingCastle(xloc, bstretch + 38);
						pushPreFloor(xloc + 16, 0);
						pushPreFloor(xloc + 24, 24, 6);
						pushPrePipe(xloc + 72, 40, Infinity, true);
						// start cheeps here
						pushPreFloor(xloc + 88, 24, 6);
						pushPrePipe(xloc + 136, 48, Infinity, true, 1); // Back to Pipe 1
						pushPreFloor(xloc + 152, 24, 6);
						// end cheeps here
						fillPreWater(xloc + 200, 0, 8);
						pushPreFloor(xloc + 232, 24, 4);
						pushPrePipe(xloc + 264, 40, Infinity, true, 4); // To Underwater (Area 3)
						pushPreFloor(xloc + 280, 24, bstretch);
						pushPreFloor(xloc + 280 + bstretch * 8, 0, 3);
						pushCastleDecider(xloc + 304 + bstretch * 8, 0);
					}
				}
			}),
			new Area("Underwater Castle", function() { // Area 3 (Underwater)
				setLocationGeneration(4);
				
				goUnderWater();
				pushPreThing(Stone, 0, 88, 2, DtB(88, 8));
				pushPreFloor(16, 0, 1, 62);
				pushPrePipe(24, -200, 216, false, false, 4);
				pushPreFloor(40, 0, 67);
				pushPreThing(Stone, 48, 24, 5, 3);
				pushPreThing(Stone, 48, 80, 5, 2);
				pushPreThing(Stone, 48, 88, 66, 1);
				pushPreThing(Stone, 88, 32, 7, 4);
				pushPreThing(Stone, 88, 80, 7, 3);
				pushPreThing(CastleBlock, 160, 46, [6, 1], true);
				pushPreThing(Blooper, 224, 16);
				pushPreThing(CastleBlock, 248, 22, [6, 1], true);
				pushPreThing(Stone, 312, 24, 3, 3);
				pushPreThing(Stone, 312, 80, 3, 3);
				pushPreThing(CastleBlock, 320, 54, [6, 1], true);
				pushPreThing(Blooper, 408, 24);
				pushPreThing(Blooper, 424, 56);
				pushPreThing(CastleBlock, 446, 38, [6, 1], true);
				pushPreThing(CastleBlock, 512, 44, [6, 1], true);
				pushPreThing(Stone, 536, 32, 5, 4);
				pushPreThing(Stone, 536, 80, 5, 3);
				pushPreThing(PipeSide, 544, 48, 5);
				pushPreThing(Stone, 552, 56, 3, 3);
			}),
			new Area("Castle", function() { // Area 4
				setLocationGeneration(5);
				
				pushPrePipe(0, 16, Infinity, true, false, 5);
				makeCeilingCastle(0, 29);
				pushPreFloor(16, 0, 5);
				pushPrePipe(56, 16, Infinity, true);
				pushPreFloor(72, 0, 9);
				pushPreThing(HammerBro, 112, 12);
				fillPreWater(128, 0, 14);
				pushPreThing(Podoboo, 160, -32);
				pushPreFloor(184, 24, 6);
				pushPreThing(Stone, 184, 80, 6, 2);
				endCastleInside(232, 0)
			}),
		];
	}
}