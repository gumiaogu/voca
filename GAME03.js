var GAME03 = {
  paper: Paper.g(),
  type: 0, // 0: 한자 gen, 1: 뜻음 gen
  count: 0,
  repeatCount: 28,
  progress: {},
  gen: {},
  condition: {
    grade: '라',
    setRange: [1, 20]
  },
  choiceCount: 4,
  result: [],
  configure: function() {
    var self = GAME03;

    // progress 인스턴스 생성
    self.progress = new Library.Progress(self.repeatCount);

    // generate 인스턴스 생성
    self.gen = new Library.Generate({
      type: self.type,
      condition: self.condition,
      choiceCount: self.choiceCount
    });
  },

  generate: function() {
    var self = GAME03;
    self.gen.generate();
  },

  makeQuestion: function() {
    var self = GAME03;
    type = self.type;
    self.questionInfo = type === 0 ? self.gen.hanja : self.gen.meanexample;

    Library.drawQuestion({
      paper: self.paper,
      type: self.type,
      questionInfo: self.questionInfo,
    });
  },

  makeChoice: function() {
    var self = GAME03;
    var exampleInfo = self.gen.choiceInfo;
    self.feed = self.gen.idiom;

    var choices = Library.drawChoice({
      paper: self.paper,
      type: self.type,
      exampleInfo: exampleInfo
    });

    Library.choiceCheck({
      type: self.type,
      choices: choices,
      exampleInfo: exampleInfo,
      callback: self.control,
      feed: self.feed
    });
  },

  control: function(bool, userChoice) {
    var self = GAME03;

    self.result.push({
      result: bool,
      userChoice: userChoice,
      question: self.questionInfo,
      choiceInfo: self.gen.choiceInfo
    });

    self.count += 1;

    if (self.count === self.repeatCount) {
      self.report();
    } else {
      self.paper.clear();
      self.generate();
      self.makeQuestion();
      self.makeChoice();
      self.progress.countUp();
    }
  },

  report: function() {
    var self = GAME03;
    self.paper.clear();
    self.progress.remove();

    var code03 = new Audio('aud/code03.wav');
    code03.play();

    var result = self.result;
    var reportG = self.paper.g();

    var rightCount = 0;
    result.forEach(function(el) {
      if (el.result) rightCount += 1;
    });

    reportG.rect(0, 0, 360, 640, 6).attr({
      'stroke': 'gray',
      'fill': '#F6F6F6'
    });

    reportG.image('cha03.png', 100, 160, 160, 160);

    var blueB = reportG.rect(40, 380, 120, 50).attr({
      'fill': 'skyblue',
      'rx': 8,
      'ry': 8
    });
    var blueBT = reportG.text(100, 412, '재도전').attr({
      'font-size': 20,
      'text-anchor': 'middle'
    });
    var blue = reportG.g(blueB, blueBT).click(handler01).attr({
      'cursor': 'pointer'
    });

    function handler01() {
      location.reload();
    }

    var greenB = reportG.rect(200, 380, 120, 50).attr({
      'fill': '#86e07f',
      'rx': 8,
      'ry': 8
    });
    var greenBT = reportG.text(262, 412, '처음으로').attr({
      'font-size': 20,
      'text-anchor': 'middle'
    });
    var red = reportG.g(greenB, greenBT).click(handler02).attr({
      'cursor': 'pointer'
    });

    function handler02() {
      location.replace('main.html');
    }
  },

  start: function() {
    var self = GAME03;
    self.configure();
    self.generate();
    self.makeQuestion();
    self.makeChoice();
  }
};

GAME03.start();
