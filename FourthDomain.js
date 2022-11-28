function sayHello() {
    alert("hello world jon in separate file!")
    kjv = "kjv.csv"
    alert("using cvs toObjects")
    var data = $.csv.toObjects(kjv)
    alert(data)
}