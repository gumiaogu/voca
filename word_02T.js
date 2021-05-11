// Game1
var HT006 = {
    paper: Paper.g(),
    count: 0,
    repeatCount: 12,
    genInfo: {},
    condition: {
        grade: '다',
        setRange: [3, 4]
    },
    startTime: new Date().getTime(),
    configure: function() {
        var self = HT006;

        self.genInfo = Library.generateMatchgame({
            condition: self.condition,
            choiceCount: self.repeatCount,
        });
        console.log(self.genInfo);
    },

    makeQuestion: function() {
        var self = HT006;
        var mean = self.genInfo.meanData[self.count].mean;

        // 문제 그리기
        Library.drawQuestion01({
            paper: self.paper,
            questionInfo: mean,
        });
    },

    makeChoice: function() {
        var self = HT006;

        var exampleInfo = self.genInfo.choiceData;

        // 보기 그리기
        var choices = Library.drawChoice01({
            paper: self.paper,
            exampleInfo: exampleInfo
        });

        var answer = self.genInfo.meanData[self.count].answer;
        Library.choiceCheck01({
            choices: choices,
            answer: answer,
            callback: self.control,
        });
    },

    control: function() {
        var self = HT006;

        var answer = self.genInfo.meanData[self.count].answer;
        self.genInfo.choiceData[answer].removed = true;

        self.count += 1;

        if (self.count === self.repeatCount) {
            self.report();
        } else {
            self.paper.clear();
            self.makeQuestion();
            self.makeChoice();
        }
    },

    report: function() {
        var self = HT006;
        self.paper.clear();

        setTimeout(function() {
          var code03 = new Audio('aud/code03.wav');
          code03.play();
        }, 400);

        var userTime = new Date().getTime() - self.startTime;

        var reportG = self.paper.g();
        var record = (userTime / 1000).toFixed(1);

        reportG.text(180, 170, record + '초').attr({
            'fill': 'orange',
            'font-size': 40,
            'font-wieght': 'bold',
            'text-anchor': 'middle'
        });
        reportG.image('cha05.png', 105, 220, 140, 140);

        var redB = reportG.rect(36, 410, 120, 30).attr({
          'fill': '#f8371f',
          'rx': 8,
          'ry': 8
        });
        var redBT = reportG.text(80, 430, '재도전').attr({
          'fill': 'white',
          'font-size': 13
        });
        var red = reportG.g(redB, redBT).click(handler01).attr({
          'cursor': 'pointer'
        });
        var orangeB = reportG.rect(200, 410, 120, 30).attr({
          'fill': '#fe9b00',
          'rx': 8,
          'ry': 8
        });
        var orangeBT = reportG.text(238, 430, '처음으로').attr({
          'fill': 'white',
          'font-size': 13
        });
        var orange = reportG.g(orangeB, orangeBT).click(handler02).attr({
          'cursor': 'pointer'
        });

        function handler01() {
          location.reload();
        }

        function handler02() {
          location.replace('main.html');
        }
    },

    start: function() {
        var self = HT006;
        self.configure();
        self.makeQuestion();
        self.makeChoice();
    },
};

HT006.start();
