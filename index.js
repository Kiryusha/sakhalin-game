function Level(opt) {
    var options = opt || {};
    var self = this;

    this.levelTime = options.levelTime || 6000;
    this.container = options.container;

    if (!this.container) {
        this.init = function () {
            return false;
        };
        return;
    }

    this.currentTime = this.levelTime;

    this.DOM = {
        currentTime: this.container.querySelector('.js-time'),
    };

    this.runCurrentTimer = function() {
        var currentTimeTimer = setInterval(function () {
            var percentage = (self.currentTime * 100) / self.levelTime;
            if (self.currentTime > 0) {
                self.currentTime -= 10;
            } else {
                clearInterval(currentTimeTimer);
            }
            if (percentage < 25) {
                self.DOM.currentTime.classList.add('_alarm');
            } else if (percentage < 50) {
                self.DOM.currentTime.classList.add('_warning');
            }
            self.DOM.currentTime.innerHTML = Math.floor(self.currentTime / 100);
        }, 100);
    }

    this.init = function() {
        self.runCurrentTimer();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var game = new Level({
        container: document.querySelector('.js-game-container'),
    }).init();
});
