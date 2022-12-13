var lookup;
 
function lookupWord() {
    lookup = document.getElementById('TEXTBOX_ID').value;
    if (lookup == "") {
        return;
    }
    textarea = document.getElementById('outputkjv');
    //textarea.value = "";
    kjv = "http:localhost:8000/kjv.csv";
    readTextFile(kjv);
}
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    console.log("lookup1="+lookup);
    rawFile.onreadystatechange = function ()
    {
        console.log("lookup2 = "+lookup);
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                //console.log(allText);
                datasplit = allText.split("\n");
                for (p in datasplit) {
                    //reference = datasplit[p].split(",")[0];
                    text = datasplit[p].split(",")[5];
                    if (typeof(text) != 'undefined' && String(text.toUpperCase()).search(lookup.toUpperCase()) != -1) {
                        var newText = document.createTextNode(text+'\n');
                        var textarea = document.getElementById('outputkjv');
                        textarea.appendChild(newText);
                        console.log("text="+text);
                    }
                }
                var textarea = document.getElementById("outputkjv")
  
            }
        }
    }
    rawFile.send(null);
}

