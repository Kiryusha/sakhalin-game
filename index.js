function Level(opt) {
    var options = opt || {};
    var self = this;

    this.levelTime = options.levelTime || 6000;
    this.depth = options.depth || 1500;
    this.container = options.container;

    if (!this.container) {
        this.init = function () {
            return false;
        };
        return;
    }

    this.currentTime = this.levelTime;
    this.currentDepth = 0;

    this.DOM = {
        currentTime: this.container.querySelector('.js-time'),
        depth: this.container.querySelector('.js-depth'),
        index: this.container.querySelectorAll('.js-index'),
    };

    this.runCurrentTimer = function() {
        var currentTimeTimer = setInterval(function () {
            var percentage = (self.currentTime * 100) / self.levelTime;
            if (self.currentTime > 0) {
                self.currentTime -= 100;
            } else {
                clearInterval(currentTimeTimer);
            }
            if (percentage < 25) {
                self.DOM.currentTime.classList.add('_alarm');
            } else if (percentage < 50) {
                self.DOM.currentTime.classList.add('_warning');
            }
            self.DOM.currentTime.innerHTML = Math.floor(self.currentTime / 1000);
        }, 100);
    }

    this.runDepthTimer = function() {
        var depthTimer = setInterval(function () {
            var percentage = (self.currentDepth * 100) / self.depth;
            var step = (self.depth / self.levelTime) * 100;

            if (self.currentDepth < self.depth) {
                self.currentDepth += step;
            } else {
                clearInterval(depthTimer);
                if (percentage === 100) {
                    self.DOM.depth.classList.add('_finish');
                } else if (percentage >= 75) {
                    self.DOM.depth.classList.add('_almost');
                } else {
                    self.DOM.depth.classList.add('_failed');
                }
            }
            self.DOM.depth.innerHTML = Math.floor(self.currentDepth);
        }, 100);
    }

    this.runIndexesTimer = function() {
        self.DOM.index.forEach(function(index) {
            var currentValue = 0;
            var absoluteMax = 100;
            var currentMax = Math.floor(Math.random() * (absoluteMax - (absoluteMax / 2)) + (absoluteMax / 2));
            var endTime = Math.floor(Math.random() * 2 + 2);
            var trigger = false;

            var indexTimer = setInterval(function () {
                var percentage = Math.floor((currentValue * 100) / absoluteMax);
                var step = (currentMax / (self.levelTime / endTime)) * 100;

                if (currentValue >= currentMax) {
                    if (currentValue > 0) {
                        currentValue -= step;
                    }
                    trigger = true;
                    console.log(percentage);
                } else if (currentValue < 2 && trigger) {
                    currentValue = 0;
                    clearInterval(indexTimer);
                } else if (currentValue < currentMax) {
                    if (trigger) {
                        currentValue -= step;
                    } else {
                        currentValue += step;
                    }
                }
                index.innerHTML = Math.floor(currentValue);
            }, 100);
        });
    }

    this.init = function() {
        self.runCurrentTimer();
        self.runDepthTimer();
        self.runIndexesTimer();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var game = new Level({
        container: document.querySelector('.js-game-container'),
        levelTime: 10000,
        depth: 1500,
    }).init();
});
