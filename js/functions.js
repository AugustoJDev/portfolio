function typeWrite(element, titles) {
    let currentTitleNumber = 0;
    let textArray = [];
    
    function typeTitle() {
      if (currentTitleNumber < titles.length) {
        const currentTitle = titles[currentTitleNumber];
        textArray = currentTitle.split('');
        element.innerHTML = ' ';
        
        textArray.forEach(function (letra, i) {
          setTimeout(function () {
            element.innerHTML += letra;
          }, 75 * i);
        });
  
        setTimeout(function () {
          deleteTitle();
        }, 75 * textArray.length + 1000);
      }
    }
    
    function deleteTitle() {
        textArray.forEach(function (_, i) {
          setTimeout(function () {
            element.innerHTML = element.innerHTML.slice(0, -1);
          }, 50 * i);
        });
        
        setTimeout(function () {
          currentTitleNumber++;
          if (currentTitleNumber >= titles.length) {
            currentTitleNumber = 0;
          }
          typeTitle();
        }, 50 * textArray.length);
      }
  
    typeTitle();
  }
  
  const titleElement = document.querySelector('#hobbies');
  const titles = ["Developer", "Student", "Freelancer"];
  
  typeWrite(titleElement, titles);