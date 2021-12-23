const addBtn = document.querySelector("#liveToastBtn")
const input = document.querySelector("#task")
const list = document.querySelector("#list")
const toastSucces = document.querySelector("#liveToast")
const toastUnSucces = document.querySelector("#liveToastErr")
let defaultLi = document.getElementsByTagName("li");

addBtn.addEventListener("click", newEelement)
list.addEventListener("click", deleteElement)
list.addEventListener("click", missonComplite)

loadPage()

//Mevcut listede olanlara X butonu ekleme
for (let i = 0; i < defaultLi.length; i++) {
    if (defaultLi[i].className == "close") {
        console.log("hatalı")
    } else {
        let span = document.createElement("span")
        span.classList.add("close")
        span.innerHTML = "SİL"
        defaultLi[i].appendChild(span)
        console.log("test")
    }
}

function missonComplite(e) {
    e.target.classList.toggle("checked")

}
// yeni inputlar için element etiketlerini(li,span,X)   oluşturma
function crtElement() {
    const li = document.createElement("li")
    const span = document.createElement("span")
    span.innerHTML = "SİL"
    span.classList.add("close")
    li.innerHTML = `<span>${input.value} </span> `
    li.appendChild(span)
    list.appendChild(li)

}
// girilen imputla yeni element oluşturma
function newEelement() {
    if (input.value.trim() != "" && input.value.trim() != " ") {
        crtElement()
        loadStorage(input.value)
        $(".success").toast("show");  // başarılı başarısız mesajları için toast mesajları
        input.value = ""
    } else {
        $(".error").toast("show");
    }
}
//element silme 
function deleteElement(e) {
    if (e.target.className === "close") {
        if (confirm("Are you Sure ?")) {
            e.target.parentElement.remove();  // tıklandığı yerdeki "x" parantElementi kaldır(parant element = li)
            let prm = e.target.parentElement.firstChild.nextElementSibling.textContent.trim();
            //tıkladıgımız yerin bir üst elementine git(li) first childina gel(span) bu span'ın nextelemnent ile içerisine gir ve textContentini al(metin) ve deletestorage fonksiyonunda çağırdık.
            deleteStorage(prm);
        }

    }
}
//inputa gerilen veriyi localStorage'ye ekledik 
function loadStorage(prm) {
    let storage = JSON.parse(localStorage.getItem("todo"))
    let toDos;
    if (storage == null) {
        toDos = [];
        console.log("if test ")
    } else {
        toDos = getStorage()
    }
    toDos.push(prm)
    localStorage.setItem("todo", JSON.stringify(toDos))
    console.log("todos  test : " + toDos)
}
// loadStorage da var olan localStorage'ı döndürmek için
function getStorage() {
    let toDo = JSON.parse(localStorage.getItem("todo"))
    return toDo
}
// Sayfayı yenilediğimizde localStorage verileri listeye ekledik ve  başlangıçta bu fonksiyonu çağırdık
function loadPage() {
    let toDo = getStorage()
    if (toDo != null) {
        let html
        for (let i = 0; i < toDo.length; i++) {
            html = `<li>
             <span>
             ${toDo[i]}
             </span>
             <span class = "close"> X </span>
             </li>`
            list.innerHTML += html
        }
    }
}
// local storage veri silme  ( deleteElement() fonksiyonunda  çağırılıyor)
function deleteStorage(prm) {
    let toDo = getStorage()
    toDo.forEach((element, id) => {
        if (element == prm) {
            toDo.splice(id, 1)
        }
    });
    localStorage.setItem("todo", JSON.stringify(toDo))
}