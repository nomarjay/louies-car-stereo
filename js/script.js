const navbar = document.getElementById('navbar');

function openSidebar(){
 navbar.classList.add('show');
    console.log("clicked open")
}


function closeSidebar(){
 navbar.classList.remove('show');
    console.log("clicked close")
}
