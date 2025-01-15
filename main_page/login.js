const container = document.getElementById('container');
const registerbtn = document.getElementById('register');
const loginbtn = document.getElementById('login');


registerbtn.addEventListener('click', ()=>{
    container.classList.add('active');
})

loginbtn.addEventListener('click', ()=>{
    container.classList.remove('active');
})

const signUp = document.getElementById('signUp');
signUp.addEventListener('click', (e)=>{
    e.preventDefault()
})