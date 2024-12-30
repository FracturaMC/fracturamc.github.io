const post = document.getElementById("post");
const postPrev = document.getElementById("prev");
const postNext = document.getElementById("next");
const postTitle = document.getElementById("posttitle");
const postDetails = document.getElementById("whenwho");

const postProperties = ['title', 'date', 'author'];
const latest = 2;

const slugIdMap = {
    "introduzione-blog": 0,
    "annuncio-closed-beta": 1,
    "aggiornamento-inverno-2024" : 2
};

const idSlugMap = Object.fromEntries(Object.entries(slugIdMap).map(a => a.reverse()));

const classMap = {
    a: "link"
}

const bindings = Object.keys(classMap)
.map(key => ({
    type: 'output',
    regex: new RegExp(`<${key}(.*)>`, 'g'),
    replace: `<${key} class="${classMap[key]}" $1>`
}));

const converter = new showdown.Converter({
extensions: [...bindings]
});

var current = latest;

function buildPost(id) {
    const url = "/posts/" + id + ".md"

    post.classList.add("opacity-0");

    fetch(url)
        .catch(reason => window.location.href = "/404")
        .then(r => r.text())
        .then(t => { 
            setTimeout(() => {
                generatePostHtml(id, t);
            }, 600);
         }); 
}

function generatePostHtml(id, t) {
    toHtml = "";

    postPrev.classList.add("hidden");
    postNext.classList.add("hidden");

    postTitle.innerText = "";
    postDetails.innerText = "";

    if (id > 0) postPrev.classList.remove("hidden");
    if (id < latest) postNext.classList.remove("hidden");

    for (const line of t.split('\n')) {
        if (postProperties.includes(line.split(':')[0])) {
            var prop = line.split(':')[0];
            var value = line.split(":").toSpliced().splice(1).join(":").trim();

            if (prop == 'title')
                postTitle.innerText = value;
            else if (prop == 'date')
                postDetails.innerText = "pubblicato il " + value;
            else if (prop == 'author') {
                if (postDetails.innerText.length == 0)
                    postDetails.innerText = "da " + value;
                else
                    postDetails.innerText += " · " + value;
            }

        } else {
            toHtml += line + '\n';
        }
    }

    var html = converter.makeHtml(toHtml);
    document.getElementById("content").innerHTML = html;
    post.classList.remove("opacity-0");
}

postPrev.onclick = (e) => {
    window.location.hash = "#/" + idSlugMap[--current];
};

postNext.onclick = (e) => {
    window.location.hash = "#/" + idSlugMap[++current];
};

document.addEventListener("DOMContentLoaded", handleRouting);
window.addEventListener("hashchange", handleRouting);

function handleRouting() {
    var slug = window.location.hash.replace("#/","");
    if (slug !== "") {
        if (slug in slugIdMap) {
            buildPost(current = slugIdMap[slug]);
        } else {
            window.location.href = "/404";
        }
    } else {
        buildPost(latest);
        window.location.hash = "#/" + idSlugMap[latest];
    }
}
