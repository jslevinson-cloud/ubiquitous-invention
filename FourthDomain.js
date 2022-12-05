var lookup;
function lookupWord() {
    lookup = document.getElementById('TEXTBOX_ID').value;
    textarea = document.getElementById('outputkjv');
    //textarea.value = "";
    kjv = "http:localhost:8000/kjv.csv";
    readTextFile(kjv);
    /*
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        kjv.src = event.target.result;
        var data = $.csv.toObjects(kjv.src)
        alert(data.length)
        alert(data[0])
    
    });
    */
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
                    //console.log("reference="+reference)
                    //console.log(String(text));
                    if (typeof(text) != 'undefined' && String(text.toUpperCase()).search(lookup.toUpperCase()) != -1) {
                        var newText = document.createTextNode(text+'\n');
                        var textarea = document.getElementById('outputkjv');
                        textarea.appendChild(newText);
                        console.log("text="+text);
                    }
                    /*
                    if (Number.isInteger(Number(reference))&&Number(reference)!=0) {
                        var data = $.csv.toObjects(datasplit[p]);
                        console.log(data);  
                    }
                    */
                    
                }
                //console.log(Object.getOwnPropertyNames(datasplit));
                //alert(allText);
                //var data = $.csv.toObjects(allText);
                var textarea = document.getElementById("outputkjv")
                //alert(data[0][0]);
               //console.log(data);
               //console.log(typeof datasplit);
               //console.log(Object.getOwnPropertyNames(datasplit));
               /*
                for (i=0; i < data.length; i++) {
                    //console.log(data[i].toObject());
                    for (j=0; j < data[i].length; j++) {
                        for (p in data[i][j]) {
                            console.log(p);
                        }
                    }
                    //textarea.value +=  data[i];
                    //if (data[i].length >= 2) {
                        //textarea.value += data[i][5];
                        //console.log("%o", data[i]);
                    //}
                }
                */
  
            }
        }
    }
    rawFile.send(null);
}
