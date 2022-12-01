function lookupWord() {
    var text = document.getElementById('TEXTBOX_ID').value;
    kjv = "http:localhost:8000/kjv.csv"
    readTextFile(kjv)
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
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                console.log(allText);
                //alert(allText);
                var data = $.csv.toObjects(allText);
                var textarea = document.getElementById("outputkjv")
                //alert(data[0][0]);
               //console.log(data);
                for (i=0; i < data.length; i++) {
                    textarea.value +=  data[i];
                    if (data[i].length >= 2) {
                        textarea.value += data[i][5];
                    }
                }
  
            }
        }
    }
    rawFile.send(null);
}
