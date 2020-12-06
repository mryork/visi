let tests = [
    {background: "linear-gradient(to right, #f7dc8f, #f5d373)",
    colorLeft: "hsl(39, 90%, 61%)",
    colorRight: "hsl(59, 90%, 61%)",
    scaleBegin: 20,
    scaleEnd: 120
    },
    {background: "linear-gradient(to right, #37cc7a, #00d45f)",
    colorLeft: "hsl(147, 93%, 73%)",
    colorRight: "hsl(197, 93%, 73%)",
    scaleBegin: 100,
    scaleEnd: 200
    },
    {background: "linear-gradient(to right, #694cad, #8271ab)",
    colorLeft: "hsl(258, 100%, 61%)",
    colorRight: "hsl(218, 100%, 61%)",
    scaleBegin: 200,
    scaleEnd: 300
    },
    {background: "linear-gradient(to right, #ff6bc9, #ffbde7)",
    colorLeft: "hsl(322, 23%, 31%)",
    colorRight: "hsl(325, 23%, 31%)",
    scaleBegin: 300,
    scaleEnd: 400
    },
    {background: "linear-gradient(to right, #9c0606, #6e1818)",
    colorLeft: "hsl(0, 9%, 39%)",
    colorRight: "hsl(10, 9%, 39%)",
    scaleBegin: 0,
    scaleEnd: 100
    },
];

let results = [];

let currentTest = 0;
let begin = false;

function change(e) {
    let s = document.getElementById("slide");
    let r = document.getElementById("right");

    r.style.backgroundColor = chroma(r.style.backgroundColor).set('hsl.h', s.value);
}

function next(e) {
    if(currentTest !== 4) {
        currentTest++;
        let pick = document.getElementById("slide").value;
        let correct = chroma(tests[currentTest-1].colorLeft).get('hsl.h');
        let diff = Math.abs(pick-correct);
        results.push(diff);
        beginTest(currentTest)
    } else {
        let pick = document.getElementById("slide").value;
        let correct = chroma(tests[currentTest].colorLeft).get('hsl.h');

        let diff = Math.abs(pick-correct);
        results.push(diff);

        let sum = 0;

        for(var i = 0; i < 5; i++){
            sum += Number(results[i]);
        }

        let avg = sum/5;
        let score = 100-Number(avg);

        let rez = document.getElementById("results");
        rez.innerHTML = "<center><b>Your score is " + Math.floor(score) + "%!</b></center>"
    }
}

function beginTest(num) {
    let l = document.getElementById("left");
    let r = document.getElementById("right");
    let s = document.getElementById("slide");
    let b = document.getElementById("bg");
    let u = document.getElementById("butt");

    l.style.backgroundColor = tests[num].colorLeft;
    r.style.backgroundColor = tests[num].colorRight;
    b.style.backgroundImage = tests[num].background;

    s.min = tests[num].scaleBegin;
    s.max = tests[num].scaleEnd;
    s.value = chroma(tests[num].colorRight).get('hsl.h');
    s.addEventListener('input', change);
    u.addEventListener('click', next);
}

window.onload = function() {
    beginTest(0)
}