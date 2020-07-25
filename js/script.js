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
const totalPages = Math.ceil(students.length / 10);
const studentsDetails = document.querySelectorAll('.student-details h3');
let   visibileStudents = students;

students.forEach(function (element) { 
   console.log(element); 
 }); 

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
   };
};


/******************************************************
*    END  showPage Function
*********************************************************/


/******************************************************
*        
*     appendPageLinks Function
*
*********************************************************/

const appendPageLinks = (list) => {
   const totPages = Math.ceil(students.length / 10);
   const div = document.createElement('div');

   // If there's only one page, do not display pagination
   if (totPages === 1) {
      return;
   };

   div.className = "pagination";
   pageDiv.appendChild(div);
   const ul = document.createElement('ul')
   div.appendChild(ul);


   for(let i = 0; i < totPages; i ++){
      pageNum = i + 1;
      const li = document.createElement('li');
      if(pageNum === 1){
         li.innerHTML = ` <a class="active">${pageNum}</a> `;
      } else {
         li.innerHTML = ` <a>${pageNum}</a> `
      }
      ul.appendChild(li); 
   };

   /******************************************************
   *        
   *     EVENT LISTENER FOR PAGINATION LINKS
   *
   *********************************************************/

   const pagination = document.querySelector('.pagination ul')
   pagination.addEventListener('click', () => {
   
   // Grab the list of the pagination ul
   pageLinks = pagination.children;    

   // Grab the number clicked on set as int and save as current page
   currentPageNum =  parseInt(event.target.textContent); 
   
   /* Refresh Pagination Loop
   /
   //    Loop through each link 
   //    If the current selectedLink is the same as the current page numnber add active class
   //    Else remove the active class from that links tag.
   */

   for(let i = 0; i < totalPages; i ++){
      const selectedLink = pageLinks[i].children[0];
      if(i === (currentPageNum - 1)){
         selectedLink.classList.add('active');
      } else {
         selectedLink.classList.remove('active');
      }
   }
   
   // Switch to the correct page
   showPage(matchItems, currentPageNum);
   });

   /******************************************************
   *       END EVENT LISTENER FOR PAGINATION LINKS
   *********************************************************/
};

   /******************************************************
   *    END  appendPageLinks Function
   *********************************************************/

   
   // Set Original Pagelinks
   appendPageLinks(visibileStudents);

  

   
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

   /******************************************************
   *        
   *     searchBar Function
   *
   *********************************************************/
   /* Variables to reference the `input` and search `button` elements */
   const search = document.querySelector('.search-input');
   const submit = document.querySelector('#submit');
   
   const searchBar = (searchInput, names) => {
      // Clear any current pagination
      const pagination = document.querySelector('div.pagination');
      if (pagination) {
      pagination.parentNode.removeChild(pagination);
      };
      
      for(let i = 0; i < names.length; i++) { 
         const studentName = students[i].children[0].children[1].textContent;
         const name = names[i].textContent.toLowerCase();
         const searchValue = searchInput.value;

         if(searchInput.value.length !== 0 && name.includes(searchValue.toLowerCase())){
           names[i].classList.add('match');
            console.log(studentName);
         } else {
            names[i].classList.remove('match');
         }
      }

      if (searchInput.value.length === 0) {
         showPage(students, 1);
         appendPageLinks(students);
         return;
       };

      const matchItems = document.querySelectorAll('.match');
         console.log(matchItems);
         showPage(matchItems, 1);
         appendPageLinks(matchItems);
   };

   /* submit listener */
submit.addEventListener('click', (event) => {
   event.preventDefault();

   // Invoke your search function here - Arguments: search, tableCells
  searchBar(search, students);
 
 });
 
   /* submit listener */
   

   showPage(students, 1);