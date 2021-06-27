const array_topic = ['Topic 1', 'Topic 2 ', 'Topic 3', 'Topic 4'];

/* baki sob */
document.querySelector('button.spin').onclick = function () {
    document.querySelector('.spinner').style.transition = `0s`;
    document.querySelector('.spinner').style.transform = `rotateZ(0deg)`;
    setTimeout(function () {
        document.querySelector('.spinner').style.transition = `4s`;
        let degrees = 0;
        degrees = Math.ceil(Math.random() * 16) * 47;
        degrees += 7200;
        document.querySelector(
            '.spinner'
        ).style.transform = `rotateZ(${degrees}deg)`;
    }, 10);
};

document.querySelectorAll('.spinner-element').forEach(elem => {
    elem.onclick = function () {
        document.querySelector('.popout-text').innerText =
            array_topic[parseInt(elem.innerText) - 1];
        document.querySelector('.popout').classList.add('show');
    };
});
document.querySelector('.close').onclick = function () {
    document.querySelector('.popout').classList.remove('show');
};

const coin = document.querySelector('.coin');
const head = document.querySelector('.head');
const tail = document.querySelector('.tail');

head.style.zIndex = 3;
tail.style.zIndex = 2;

document.querySelector('.toss').onclick = function () {
    let tmp1 = Math.floor(Math.random() * 2) + 1;
    let tmp2 = Math.floor(Math.random() * 2) + 1;
    let tmp = 0;
    if (tmp1 == tmp2) {
        tmp = 1;
    }
    rotate(20 + tmp);
};
function rotate(count) {
    let c = 0;
    let interval = setInterval(() => {
        c++;
        if (head.style.zIndex > tail.style.zIndex) {
            coin.style.transform = `rotateX(180deg)`;
            tail.style.zIndex = 3;
            head.style.zIndex = 2;
        } else {
            coin.style.transform = `rotateX(360deg)`;
            tail.style.zIndex = 2;
            head.style.zIndex = 3;
        }

        if (count == c) clearInterval(interval);
    }, 100);
}

const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');

const playButton = document.querySelector('.play-pause');
const stopButton = document.querySelector('.stop');
const shortBell = document.querySelector('.bell-short');
const midBell = document.querySelector('.bell-mid');
const longBell = document.querySelector('.bell-long');

let secVal = 0;
let minVal = 0;

let timeNewStart = true;
playButton.onclick = playbuttonFunction;

function playbuttonFunction() {
    if (!playButton.classList.contains('pause')) {
        if (timeNewStart) {
            shortBell.play();
            document.querySelector('.timer').classList.add('playing');
            timeNewStart = false;
        }
        playButton.classList.add('pause');
        var timerInterval = setInterval(() => {
            if (secVal == 60) {
                minVal++;
                if (minVal == 2) {
                    midBell.play();
                }
                if (minVal == 3) {
                    longBell.play();
                    clearInterval(timerInterval);
                    playButton.classList.remove('pause');
                }
                secVal = 0;
            } else secVal++;
            updateTime();
        }, 1000);
        stopButton.onclick = function () {
            playButton.classList.remove('pause');
            playButton.onclick = playbuttonFunction;
            clearInterval(timerInterval);
            secVal = 0;
            minVal = 0;
            timeNewStart = true;
            updateTime();
            document.querySelector('.timer').classList.remove('playing');
        };
        playButton.onclick = function () {
            playButton.classList.remove('pause');
            clearInterval(timerInterval);
            playButton.onclick = playbuttonFunction;
        };
    }
}

function updateTime() {
    minutes.innerText = minVal.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
    seconds.innerText = secVal.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
}
