function lookupWord() {
    alert('here')
    var text = document.getElementById('TEXTBOX_ID').value;
    alert(text)
    kjv = "kjv.csv"
    var data = $.csv.toObjects(kjv)
    alert(data)
}