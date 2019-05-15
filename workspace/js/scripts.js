/*
Renault - Code by Zsolt Király
v1.0.1 - 2018-06-25
*/

'use scrict'
var renault = function() {
    
    var starttime;

    var easeInQuad = function(t) { return t * t }
    var easeOutQuad = function(t) { return t * (2 - t) }

    function moveit(timestamp, rC, dist, duration, position, ease) {

        var timestamp = timestamp || new Date().getTime();
        var runtime = timestamp - starttime;
        var progress = runtime / duration;

        progress = Math.min(progress, 1);
        progress = ease(progress);

        rC.style.right = (position + dist * progress).toFixed(2) + 'px';

        if (runtime < duration) {
            requestAnimationFrame(function(timestamp) {
                moveit(timestamp, rC, dist, duration, position, ease);
            });

            rC.classList.add('rotating');

        } else {
            rC.classList.remove('slow');
            rC.classList.remove('rotating');
        }
    }

    var startPosition = -600,
        startDuration = 2000,
        startDistance = 820,
        finishPosition = startPosition + startDistance,
        finishDuration = 2000,
        finishDistance = 1080 - (startPosition + startDistance);


    function startAnimation(rC) {
        requestAnimationFrame(function(timestamp) {
            starttime = timestamp || new Date().getTime();
            moveit(timestamp, rC, startDistance, startDuration, startPosition, easeOutQuad);
        });
    }

    function finishAnimation(rC) {
        setTimeout(function() {

            rC.classList.add('rotating');
            rC.classList.add('slow');

            requestAnimationFrame(function(timestamp) {
                starttime = timestamp || new Date().getTime();
                moveit(timestamp, rC, finishDistance, finishDuration, finishPosition, easeInQuad);
            });

        }, startDuration * 2);
    }

    function renaultAnimation(rC) {
        setTimeout(function() {
            startAnimation(rC);
            finishAnimation(rC);
        }, 2000);
    }

    function app() {

        var renaultContent = document.querySelector('.renault-content');

        renaultAnimation(renaultContent);

        setInterval(function() {
            renaultAnimation(renaultContent);
        }, 8000);
    }

    return {
        app: app
    }

}();

window.addEventListener('load', function() {
    renault.app();
}, false);