const navLinks = document.querySelectorAll('nav a'); 
const contentSections = document.querySelectorAll('.content-section');

// Color changing functionality 
const colors = ['#E2FA69', '#39DD95', '#39C9DD', '#C9D54D', '#70D54D']; // Your new colors
let colorIndex = 0; 

function changeBackgroundColor() {
 document.body.style.backgroundColor = colors[colorIndex]; 
 colorIndex = (colorIndex + 1) % colors.length; 
}

setInterval(changeBackgroundColor, 3000); // Continuous color change

// Filter Functionality
navLinks.forEach(link => {
 link.addEventListener('click', (event) => {
  event.preventDefault();

  const sectionId = link.getAttribute('href');

  if (sectionId === '#overall') {
   contentSections.forEach(section => {
    section.style.display = 'block';
   });
  } else {
   contentSections.forEach(section => {
    section.style.display = 'none';
   });

   const sectionToShow = document.querySelector(sectionId);
   sectionToShow.style.display = 'block'; 
  }
 });
});
