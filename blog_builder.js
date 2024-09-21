var converter = new showdown.Converter();

const postTitle = document.getElementById("posttitle");
const postDetails = document.getElementById("whenwho");

var postProperties = ['title', 'date', 'author'];

const url = "/posts/0.md"
fetch(url)
   .then( r => r.text() )
   .then( t => {
        t = "title:Titolo del post\n\
date:21/09/2024\n\
author:RickySHD\n\
# ciao mondo\n\
questo è un post di prova\n\
## come va\n\
chissà se funzionerà";
        
        toHtml = "";

        for (const line of t.split('\n')) {
            if (postProperties.includes(line.split(':')[0])) {
                var prop = line.split(':')[0];
                var value = line.split(':')[1];

                if (prop == 'title')
                    postTitle.innerText = value;
                else if (prop == 'date')
                    postDetails.innerText = value;
                else if (prop == 'author') {
                    if (postDetails.innerText.length == 0)
                        postDetails.innerText = value;
                    else
                        postDetails.innerText += " · " + value;
                }

                console.log(value);
            } else {
                toHtml += line + '\n';
            }
        }

        var html = converter.makeHtml(toHtml);
        document.getElementById("content").innerHTML = html;
   });