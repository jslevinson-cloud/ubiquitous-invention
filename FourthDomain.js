function lookupWord() {
    alert('here')
    var textBox = document.getElementById('TEXTBOX_ID');
    text = textBox.innerText;
    alert(text)
    kjv = "kjv.csv"
    var data = $.csv.toObjects(kjv)
    alert(data)
}