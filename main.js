var SVG = Snap('#my-svg');

// 최상위 그룹
var Paper = SVG.g();

// 이미지
var bi = Paper.image('bi.jpg', 0, 0, 220, 36).toDefs();
var start = Paper.image('cha04.png', 0, 0, 130, 130).toDefs();
var title = Paper.image('textimg.png', 0, 0, 210, 45).toDefs();
var cross = Paper.image('cross.png', 0, 0, 130, 130).toDefs();

// SVG 외곽선
Paper.rect(0, 0, 360, 640, 6).attr({
  'stroke': 'gray',
  'fill': 'none'
});

// 상단 바 부분
var topArea = Paper.g();

bi.use().transform('t70, 40').appendTo(topArea);

topArea.rect(15, 115, 330, 260).attr({
  'fill': 'white',
  'stroke-width': 1,
  'stroke': 'gray',
  'rx': 5,
  'ry': 5
});

start.use().transform('t110, 135').appendTo(topArea).attr({
  'cursor': 'pointer'
});

title.use().transform('t75, 305').appendTo(topArea);

//
var study1C = topArea.circle(100, 430, 23).attr({
  'fill': 'skyblue'
});
var study1T = topArea.text(97, 437, '1').attr({
  'font-size': 17
});
var study1 = topArea.g(study1C, study1T).click(handler01).attr({
  'cursor': 'pointer'
});

function handler01() {
  location.replace('word_01.html');
}

var study2C = topArea.circle(50, 480, 23).attr({
  'fill': '#D7D0ED'
});
var study2T = topArea.text(45, 487, '2').attr({
  'font-size': 17
});
var study2 = topArea.g(study2C, study2T).click(handler02).attr({
  'cursor': 'pointer'
});

function handler02() {
  location.replace('word_02.html');
}

var study3C = topArea.circle(100, 530, 23).attr({
  'fill': '#FDDF78'
});
var study3T = topArea.text(95, 537, '3').attr({
  'font-size': 17
});
var study3 = topArea.g(study3C, study3T).click(handler03).attr({
  'cursor': 'pointer'
});

function handler03() {
  location.replace('word_03.html');
}

var study4C = topArea.circle(150, 480, 23).attr({
  'fill': '#FDC39B'
});
var study4T = topArea.text(145, 487, '4').attr({
  'font-size': 17
});
var study4 = topArea.g(study4C, study4T).click(handler04).attr({
  'cursor': 'pointer'
});

function handler04() {
  location.replace('word_04.html');
}
topArea.text(84, 488, '한자').attr({
  'font-size': 18
});


cross.use().transform('t210, 415').appendTo(topArea);
var gameC = topArea.rect(250, 463, 50, 35).attr({
  'fill': '#C3CE42',
  'opacity': 0
});
var gameT = topArea.text(253, 488, '한자어').attr({
  'font-size': 17
});
var game = topArea.g(gameC, gameT).click(handler05).attr({
  'cursor': 'pointer'
});

function handler05() {
  location.replace('GAME03.html');
}
