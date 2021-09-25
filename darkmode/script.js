// Toggle button
const toggleSwitch = document.querySelector('input[type="checkbox"]');

// Element
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const img1 = document.getElementById('image1');
const img2 = document.getElementById('image2');
const img3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

// Dark mode function
function darkMode() {
    nav.style.backgroundColor='rgb(0 0 0 / 50%)';
    textBox.style.backgroundColor='rgb(255 255 255 / 50%)';
    // Switch toggle icon from childern
    toggleIcon.children[0].textContent = 'Dark Mode';
    toggleIcon.children[1].classList.remove('fa-sun');
    toggleIcon.children[1].classList.add('fa-moon');
    img1.src='img/undraw_proud_coder_dark.svg';
    img2.src='img/undraw_feeling_proud_dark.svg';
    img3.src='img/undraw_conceptual_idea_dark.svg';
}
// Light mode function
function lightMode() {
    nav.style.backgroundColor='rgb(255 255 255 / 50%)';
    textBox.style.backgroundColor='rgb(0 0 0 / 50%)';
    // Switch toggle icon from childern
    toggleIcon.children[0].textContent = 'Light Mode';
    toggleIcon.children[1].classList.remove('fa-moon');
    toggleIcon.children[1].classList.add('fa-sun');
    img1.src='img/undraw_proud_coder_light.svg';
    img2.src='img/undraw_feeling_proud_light.svg';
    img3.src='img/undraw_conceptual_idea_light.svg';
}

// Switch theme
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark')
        localStorage.setItem('theme', 'dark');
        darkMode()
    } else {
        document.documentElement.setAttribute('data-theme', 'light')
        localStorage.setItem('theme', 'light');
        lightMode();
    }
}

if(localStorage.getItem('theme') == 'dark') {
    toggleSwitch.checked = true;
    document.documentElement.setAttribute('data-theme', 'dark')
    darkMode()
};
if(localStorage.getItem('theme') == 'light') {
    document.documentElement.setAttribute('data-theme', 'light')
    lightMode()
};
// Event listener
toggleSwitch.addEventListener('change', switchTheme);