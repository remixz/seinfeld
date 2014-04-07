

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function init () {
    // make buttons fast
    FastClick.attach(document.body);

    // setup preload queue
    var queue = window.queue = new createjs.LoadQueue(true);
        queue.installPlugin(createjs.Sound);
        queue.setMaxConnections(50);

    queue.on('progress', function () {
        $('.percent').text(Math.round(queue.progress * 100) + '%');
        $('.loader').css('transform', 'translate3d(' + -(100 - Math.round(queue.progress * 100)) + '%, 0, 0)');
    });
    queue.on('complete', function () {
        $('.loader').addClass('done');
        $('.loading').hide();
        $('.controls').show();
    });

    // load sounds
    var items = [ { id: 'skrill', src: 'audio/skrillfeld.mp3' } ];
    for (var i = 1; i < 15; i++) {
        items.push({ id: 'riff' + i, src: 'audio/riffs/' + i + '.mp3' });
        items.push({ id: 'laugh' + i, src: 'audio/laughs/' + i + '.mp3' });
    }
    queue.loadManifest(items, true);

    // event listeners

    // keys
    $('body').on('keydown', function (e) {
        var key = e.keyCode;
        var id = getRandomInt(1, 14);
        if (key === 37 || key === 38 || key === 39 || key === 40) {
            createjs.Sound.play('laugh' + id, { volume: 0.5 });
        } else if (key === 32) {
            createjs.Sound.play('riff' + id);
        }
    });

    // buttons
    $('button').on('click', function (e) {
        var className = e.target.className;
        var id = getRandomInt(1, 14);

        if (className === 'riff') {
            createjs.Sound.play('riff' + id);
        } else if (className === 'laugh') {
            createjs.Sound.play('laugh' + id, { volume: 0.5 });
        }
    });

    // shake
    window.addEventListener('shake', function () {
        createjs.Sound.play('skrill');
    }, false);
}

$(document).ready(init);
