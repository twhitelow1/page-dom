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
