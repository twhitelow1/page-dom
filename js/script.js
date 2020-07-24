/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const students = document.querySelectorAll('.student-list li');
const pageDiv = document.querySelector('.page');
const totalPages = Math.round(students.length / 10);

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/


   /*
   Loop over items in the list parameter
   -- If the index of a list item is >= the index of the first
   item that should be shown on the page
   -- && the list item index is <= the index of the last item
   that should be shown on the page, show it
   */
const showPage = (list, page) => {
  lastItem = (page * 10) - 1;
  firstItem = (page * 10) - 10;
   for(let i = 0; i < list.length; i ++){
      if(i >= firstItem && i <= lastItem){
         list[i].style.display = 'list-item';
      } else {
         list[i].style.display = 'none';
      }
   }

}
showPage(students, 1);
/*
 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.

*/


   /*
   1. Determine how many pages are needed for the list by dividing the
   total number of list items by the max number of items per page
   2. Create a div, give it the “pagination” class, and append it to the .page div
   3. Add a ul to the “pagination” div to store the pagination links
   4. for every page, add li and a tags with the page number text
   5. Add an event listener to each a tag. When they are clicked
   call the showPage function to display the appropriate page
   6. Loop over pagination links to remove active class from all links
   7. Add the active class to the link that was just clicked. You can identify that
   clicked link using event.target
   */

   const appendPageLinks = (list) => {
      
      const div = document.createElement('div');
      div.className = "pagination";
      pageDiv.appendChild(div);
      const ul = document.createElement('ul')
      div.appendChild(ul);
      for(let i = 0; i <= totalPages; i ++){
         pageNum = i + 1;
         const li = document.createElement('li');
         if(pageNum === 1){
            li.innerHTML = ` <a class="active">${pageNum}</a> `;
         } else {
            li.innerHTML = ` <a>${pageNum}</a> `
         }
         ul.appendChild(li); 
      }
   };

   
   // Set Original Pagelinks
   appendPageLinks(students);

   
   const pagination = document.querySelector('.pagination ul')
   pagination.addEventListener('click', () => {
      
      // Grab the lis of the pagination ul
      pageLinks = pagination.children;    

      // Grab the number clicked on set as int and save as current page
      currentPageNum =  parseInt(event.target.textContent); 
      
      /* Refresh Pagination Loop
      /
      // Loop through each link 
      //    If the current selectedLink is the same as the current page numnber add active class
      //    Else remove the active class from that links tag.
      */

      for(let i = 0; i < totalPages; i ++){
         const selectedLink = pageLinks[i].children[0];
         if(i === (currentPageNum - 1)){
            selectedLink.classList.add('active');
         } else {
            console.log('inside else');
            selectedLink.classList.remove('active');
         }
      }
      
      // Switch to the correct page
      showPage(students, currentPageNum);
   });
