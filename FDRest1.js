function lookupWord() {
    var lookup = document.getElementById("TEXTBOX_ID").value;
    var textarea;
    var thesaurus;
    var kjv;
    var thesaurus_text;
    var allText;

    if (lookup === "") {
        return;
    }
    textarea = document.getElementById("outputkjv");
    //textarea.value = "";
    thesaurus = "http:localhost:8000/Thesaurus/WordnetThesaurus.csv";
    kjv = "http:localhost:8000/kjv.csv";
    thesaurus_text = readFile(thesaurus);
    allText = readFile(kjv);
    processTextFile(lookup, textarea, allText, thesaurus_text);
 }

function processTextFile(lookup, textarea, allText, thesaurus)
{
    var thesaurus_split = thesaurus.split("\n");
    var prop;
    var p;
    var thesaurus_line;

    thesaurus_split[thesaurus_split.length] = lookup;
    datasplit = allText.split("\n");
    seen = {};
    for (i = 0; i < thesaurus_split.length; i++) {
        thesaurus_line = thesaurus_split[i];
        if ((typeof(thesaurus_line) !== "undefined") && thesaurus_line.toUpperCase().search(lookup.toUpperCase()) !== -1) {
            //console.log(thesaurus_line);
            words = thesaurus_line.split(",");
            for (j = 0; j < words.length; j++) {
                word = words[j];
                if (seen[word] != 1) {
                //console.log("word="+words[word]);
                //console.log("j="+j+" word="+word);
                    for (k = 0; k < datasplit.length; k++) {
                        //reference = datasplit[p].split(",")[0];
                        text = datasplit[k].split(",")[5];
                        if ((typeof(text) !== "undefined" && text.length > 0 && word.length > 0) 
                            && text.toUpperCase().search(" " + word.toUpperCase()+" ") !== -1) {
                            var newText = document.createTextNode(text+" word="+word+"\n");
                            textarea.appendChild(newText);
                            //console.log("text="+text+" word="+word);
                        }
                    }
                }
                seen[word] = 1;
            }
        }

    }

}


function readFile(url)
{
    var rawFile = new XMLHttpRequest();
    var allText;
    rawFile.open("GET", url, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status === 0)
            {
                    allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return allText;
}


