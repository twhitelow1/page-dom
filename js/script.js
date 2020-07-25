/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
AUTHOR: TODD WHITELOW JR.
DATE: 7/24/20

A SIMPLE PROGRAM MEANT TO DISPLAY THE POWER OF THE DOM AND EVENT HANDLERS.
******************************************/

/******************************************************
*    GLOBAL SCOPE VARIABLES
*********************************************************/
const students = document.querySelectorAll('.student-list li');
const pageDiv = document.querySelector('.page');
const totalPages = Math.round(students.length / 10);
const studentsDetails = document.querySelectorAll('.student-details h3');
/******************************************************
*    
* START  showPage Function
* 
*********************************************************/
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

/******************************************************
*    END  showPage Function
*********************************************************/


/******************************************************
*        
*     appendPageLinks Function
*
*********************************************************/

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

   /******************************************************
   *    END  appendPageLinks Function
   *********************************************************/

   
   // Set Original Pagelinks
   appendPageLinks(students);

   /******************************************************
   *        
   *     EVENT LISTENER FOR PAGINATION LINKS
   *
   *********************************************************/
   
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

     /******************************************************
   *       END EVENT LISTENER FOR PAGINATION LINKS
   *********************************************************/

   
   /******************************************************
   *        
   *     buildSearchBar Function
   *
   *********************************************************/
   const buildSearchBar = () => {
      const pageHeader = document.querySelector('.page-header');
      const div = document.createElement('div');
      div.classList.add('student-search');
      const input = document.createElement('input');
      input.classList.add("search-input");
      input.setAttribute("placeholder", "Search for students...");
      const button = document.createElement('button');
      button.setAttribute("id", "submit");
      button.textContent = "Search";
      pageHeader.appendChild(div);
      div.appendChild(input);
      div.appendChild(button);
   }

   buildSearchBar();   

   /* Variables to reference the `input` and search `button` elements */
   const search = document.querySelector('.search-input');
   const submit = document.querySelector('#submit');
   
   const searchBar = (searchInput, names) => {
      
      for(let i = 0; i < names.length; i++) { 
         const studentName = students[i].children[0].children[1].textContent
         const name = names[i].textContent.toLowerCase();
         const searchValue = searchInput.value;

         if(searchInput.value.length !== 0 && name.includes(searchValue.toLowerCase())){
           names[i].classList.add('match');
            console.log(studentName);
         }
      }
   };

   /* submit listener */
submit.addEventListener('click', (event) => {
   event.preventDefault();
 
   // Invoke your search function here - Arguments: search, tableCells
  searchBar(search, students);
 
   // Helpful log statement to test function
   console.log('Submit button is functional!');
 });
 
 /* submit listener */
   




  