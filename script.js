const html = document.getElementById("html");
const body = document.getElementById("body");
const txt = document.getElementById("txt");
const btns = document.getElementById("btns");
const next_btn = document.getElementById("next_btn");
const progress_bar = document.getElementById("progress_bar");
const texts = [
    "2桁の<span>いずれかの数字を</span><span>1つ思い浮かべて､</span><span>紙に書いてください｡</span>",
    "それに5を<span>足し､</span>",
    "それの1の位のみを<span>取り出します｡</span>",
    "それに3を掛けた数を､<span>紙の裏側に書いて</span><span>おきます｡</span>",
    "紙の表側に戻り､<span>そこに書かれている</span><span>数の10の位に200を掛けて､</span>",
    "その数と､先ほど紙の<span>裏側に</span><span>書いた数を</span><span>足すと､どうなりますか?</span><br><input class='input' id='input_number' type='number'/>",
    "<span id='result'></span>"];
const textcount = texts.length;
const answers = [215,218,221,224,227,200,203,206,209,212,415,418,421,424,427,400,403,406,409,412,615,618,621,624,627,600,603,606,609,612,815,818,821,824,827,800,803,806,809,812,1015,1018,1021,1024,1027,1000,1003,1006,1009,1012,1215,1218,1221,1224,1227,1200,1203,1206,1209,1212,1415,1418,1421,1424,1427,1400,1403,1406,1409,1412,1615,1618,1621,1624,1627,1600,1603,1606,1609,1612,1815,1818,1821,1824,1827,1800,1803,1806,1809,1812];
let currentIndex = 0;

function update_progress_bar(progress_bar_index) {
    const progress_bar_percentage = Math.min(((progress_bar_index) / textcount) * 100, 100);
    progress_bar.style.width = `${progress_bar_percentage}%`
    progress_bar.innerHTML = `${progress_bar_index}/${textcount}`;

        if (progress_bar_percentage == 100) {
            setTimeout(() => {
                progress_bar.style.borderRadius = "0";
            }, 500)
        } else {
            progress_bar.style.borderTopRightRadius = "10px";
            progress_bar.style.borderBottomRightRadius = "10px";
        }
    console.log(`progress_bar_%: ${progress_bar_percentage}`);
    console.log(`currentIndex: ${currentIndex}`);
};

function applyTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
    } else if (window.matchMedia('(display-mode: standalone)').matches) {
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark-mode");
    } else {
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark-mode");
    }
};

function detectTheme(theme) {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return isDarkMode ? 'dark' : 'light';
}

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    const newTheme = event.matches ? "dark" : "light";
    applyTheme(newTheme);
});

applyTheme(detectTheme());

let lastMousePosition = { x: 0, y: 0 };
let mouseMoved = false;
txt.innerHTML = texts[currentIndex];
txt.style.opacity = "0";
txt.style.top = "calc(30vh - 5em)";
txt.style.transition = "1s";
btns.style.transition = "1s";
next_btn.disabled = true;
btns.style.opacity = "0";
update_progress_bar(currentIndex + 1);

html.addEventListener("mousemove", (event) => {
    const mousePosition = { x: event.clientX, y: event.clientY };
    // console.log(mousePosition);
    if (mousePosition.x !== lastMousePosition.x || mousePosition.y !== lastMousePosition.y) {
        mouseMoved = true;
        lastMousePosition = mousePosition;
    }
});
setInterval(() => {
    if(mouseMoved) {
        html.style.cursor = "auto";
        console.log(mouseMoved);
        mouseMoved = false;
    }
}, 100);

setTimeout(() => {
    body.style.opacity = "1";
    progress_bar.style.opacity = "1";
    txt.style.opacity = "1";
    txt.style.top = "calc(50vh - 5em)";
    next_btn.disabled = false;
    btns.style.opacity = "1";
}, 1100);

function next() {
    if (currentIndex >= textcount - 1) {
        currentIndex = -1;
    }
    if (currentIndex < textcount - 1) {
        txt.style.opacity = "0";
        txt.style.top = "calc(30vh - 5em)";
        next_btn.disabled = true;
        btns.style.opacity = "0";
        const input = document.getElementById("input_number")?.value;
        update_progress_bar(currentIndex + 2);
        setTimeout(() => {
            currentIndex++;
            txt.innerHTML = texts[currentIndex];
        }, 1000);
        setTimeout(() => {
            txt.style.opacity = "1";
            txt.style.top = "calc(50vh - 5em)";
            txt.style.transition = "0";
            btns.style.transition = "0";
            next_btn.disabled = false;
            btns.style.opacity = "1";
            next_btn.innerHTML = "<span class='material-symbols-outlined'>arrow_forward</span>";
            if (document.getElementById("input_number")) {
                document.getElementById("input_number")?.focus()
            }
            if (document.getElementById("result")){
                const answersindex = (answers.indexOf(Number(input)) + 10);
                if (answersindex == 9) {
                    document.getElementById("result").innerHTML = `Error.<br><span id="answernumber" style="font-size: .5em;">どこかに計算の誤りがある可能性があります｡</span>`;
                } else {
                    document.getElementById("result").innerHTML = `思い浮かべた数は､<br><span id="answernumber" style="font-size: 3em;">${answersindex}</span><br>ですか?`;
                }
                setTimeout(() => {
                    answernumber.style.opacity = "1";
                }, 500);
                next_btn.innerHTML = "<span class='material-symbols-outlined'> refresh </span>";
            }
        }, 1100);
    }
}
document.getElementById("next_btn").addEventListener("click", (event) => {
        next();
        html.style.cursor = "auto"
    });
document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && next_btn.disabled == false) {
        event.preventDefault();
        next();
        html.style.cursor = "none";
    }
});