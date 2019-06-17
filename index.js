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

    this.init = function() {
        self.runCurrentTimer();
        self.runDepthTimer();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var game = new Level({
        container: document.querySelector('.js-game-container'),
        levelTime: 60000,
        depth: 1500,
    }).init();
});
