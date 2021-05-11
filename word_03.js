// 바01~05 게임
var SVG = Snap('#my-svg');

// 최상위 그룹
var Paper = SVG.g();

// 이미지
var home = Paper.image('home.png', 0, 0, 30, 30).toDefs();

var Library = {
  //SVG 외곽선
  drawLayout: function() {
    Paper.rect(0, 0, 360, 640, 6).attr({
      'stroke': 'gray',
      'fill': 'none'
    });

    // 상단 바 부분
    var topBox = Paper.g();

    topBox.path('M1 40 L359 40 L359 0 Q358 1 358 1 L1 1').attr({
        'fill': '#BAD7CF',
        'opacity' : '0.8'
    });

    home.use().transform('t12, 6').appendTo(topBox).click(handlerHome).attr({
      'cursor': 'pointer'
    });

    function handlerHome() {
      location.replace('main.html');
    }

    topBox.text(270, 27, '한자 학습 03').attr({
      'font-size': 16
    });
  },

  //////////////////////////////////////////////////////////////////////////////////////////////
  generateMatchgame: function(params) {
    var condition = params.condition;
    var count = params.choiceCount;
    var pairInfo = {};
    var conData = data.slice(24, 40);
    var paper = Paper.g();

    conData = conData.filter(function(el) {
      if (el.jei_set.indexOf(condition.grade) === -1) return false;
      var setNum = Number(el.jei_set.substring(1, 3));
      if (setNum < condition.setRange[0] || condition.setRange[1] < setNum) return false;
      return true;
    });

    conData = shuffle(conData).slice(0, count);

    var choiceData = conData.map(function(el) {
      return {
        hanja: el.hanja,
        removed: false
      };
    });

    var meanData = conData.map(function(el) {
      return el.mean;
    });

    meanData = shuffle(meanData);

    meanData = meanData.map(function(el) {
      return {
        mean: el,
        answer: findIndex(el, conData)
      };
    });

    function findIndex(mean, data) {
      var index;
      for (var i = 0; i < data.length; i++) {
        if (data[i].mean === mean) {
          index = i;
          break;
        }
      }
      return index;
    }

    function shuffle(arr) {
      return (arr.slice()).sort(function() {
        return Math.random() - 0.5;
      });
    }

    return {
      choiceData: choiceData,
      meanData: meanData,

    };
  },

  drawQuestion04: function(params) {
    var paper = params.paper.g();
    var questionInfo = params.questionInfo; //mean

    paper.text(180, 125, questionInfo).attr({
      'font-size': 40,
      'text-anchor': 'middle'
    });

    return paper;
  },

  drawChoice04: function(params) {
    var paper = params.paper.g();
    var exampleInfo = params.exampleInfo;
    var choices = [];

    for (var i = 0; i < exampleInfo.length; i++) {
      choices[i] = paper.g();
      choices[i].attr({
        'cursor': 'pointer',
        'visibility': (exampleInfo[i].removed ? 'hidden' : 'visible')
      });
      choices[i].rect(15 + (i % 4) * 85, 170 + Math.floor(i / 4) * 85, 75, 75, 6, 6).attr({
        'fill': 'white',
        'stroke': '#339DA6',
        'stroke-width': 1.5
      });
      choices[i].text(52 + (i % 4) * 85, 220 + Math.floor(i / 4) * 85, exampleInfo[i].hanja).attr({
        'font-family': 'sans-serif',
        'font-size': 35,
        'text-anchor': 'middle'
      });
    }

    // 시간 체크
    paper.rect(40, 574, 280, 7, 5).attr({
      'fill': '#dcdcdc'
    });
    var maskBar = paper.mask();
    var mBar = maskBar.rect(40, 573, 280, 8, 5).attr({
      'fill': 'white'
    });
    mBar.animate({
      'width': 8
    }, 15000);
    var myBar = paper.rect(40, 573, 280, 8, 5).attr({
      'fill': '#8AB59A',
      'mask': maskBar
    });
    paper.image('clock.png', 32, 568, 17, 17);

    return choices;
  },

  choiceCheck04: function(params) {
    var choices = params.choices;
    var rightAnswer = params.answer;
    var callback = params.callback;

    for (var i = 0; i < choices.length; i++) {
      choices[i].data('i', i).click(handler);
    }

    function handler() {
      var userChoice = this.data('i');
      var check = userChoice === rightAnswer;
      var self = this;

      this.select('rect').attr({
        'fill': (check ? 'LemonChiffon' : 'gray')
      });

      setTimeout(function() {
        if (check) {
          self.remove();
          var code01 = new Audio('aud/code01.wav');
          code01.play();
          callback();
        } else {
          clearColor();
          var code02 = new Audio('aud/code02.wav');
          code02.play();
        }
      }, 500);
    }

    function clearColor() {
      for (var i = 0; i < choices.length; i++) {
        choices[i].select('rect').attr({
          'fill': 'white'
        });
      }
    }
  },
};

Library.drawLayout();
