var lookup;
 
function lookupWord() {
    lookup = document.getElementById('TEXTBOX_ID').value;
    if (lookup == "") {
        return;
    }
    textarea = document.getElementById('outputkjv');
    //textarea.value = "";
    thesaurus = "http:localhost:8000/Thesaurus/WordnetThesaurus.csv"
    kjv = "http:localhost:8000/kjv.csv";
    thesaurus_text = readThesaurus(thesaurus)
    allText = readTextFile(kjv);
    processTextFile(textarea, allText, thesaurus_text);
 }

function processTextFile(textarea, allText, thesaurus)
{
    thesaurus += lookup +'\n';
    var thesaurus_split = thesaurus.split("\n");
    for (prop in thesaurus_split) {
        thesaurus_line = thesaurus_split[prop];
        if (typeof(thesaurus_line) != 'undefined' && thesaurus_line.toUpperCase().search(lookup.toUpperCase()) != -1) {
            console.log(thesaurus_line);
            words = thesaurus_line.split(",");
            for (word in words) {
                //console.log("word="+words[word]);
                datasplit = allText.split("\n");
                for (p in datasplit) {
                    //reference = datasplit[p].split(",")[0];
                    text = datasplit[p].split(",")[5];
                    if (typeof(text) != 'undefined' && String(text.toUpperCase()).search(words[word].toUpperCase()) != -1) {
                        var newText = document.createTextNode(text+'\n');
                        //textarea.appendChild(newText);
                        console.log("text="+text);
                    }
                }
            }
        }

    }

}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    var allText;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                    allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return allText;
}

function readThesaurus(thesaurus)
{
    var rawFile = new XMLHttpRequest();
    var allText;
    rawFile.open("GET", thesaurus, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return allText;
}

