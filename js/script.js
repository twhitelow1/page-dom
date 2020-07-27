/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
@author TODD WHITELOW JR.
DATE: 7/24/20

A SIMPLE PROGRAM MEANT TO DISPLAY THE POWER OF THE DOM AND EVENT HANDLERS.

AIMING TO RECIEVE EXCEEDING EXPECTATIONS
******************************************/

/******************************************************
*    GLOBAL SCOPE VARIABLES
*********************************************************/

const students = document.querySelectorAll('.student-item');
const search = document.querySelector('.search-input');
const submit = document.querySelector('#submit');
const studentsDetails = document.querySelectorAll('.student-details h3');
const pageDiv = document.querySelector('.page');
const matches = document.querySelectorAll('.match');
let   itemsPerPage = 10;


/******************************************************
*    
* START  showPage Function
*  @author: Todd Whitelow
*  @param list {HTMLCollection} = HTML collection passed in
*  @param page {number} = Page number
*  @param lastItem {number} = number of the last item in list that should be on current page
*  @param firstItem {number} = number of the first item in the list that should be on current page
* 
*  @return none.
* 
*  Function loops through the list and displays only the items that are supposed to be on page
*********************************************************/

const showPage = (list, page) => {
  lastItem = (page * itemsPerPage);
  firstItem = (page * itemsPerPage) - 10;
   
  // Cycle through all list items and check if is in between firstItem and lastItem
   for(let i = 0; i < list.length; i ++){
      let item = list[i];
      if(i >= firstItem && i < lastItem){
         item.style.display = 'list-item';
      } else {
         item.style.display = 'none';
      }
   };
};
 
/******************************************************
*        
*  appendPageLinks Function
*  @param list {htmlCollection} = HTML collection that is passed into the function and is the list that should be on page
*  @param totalPages {number} = length of the list divided by itemsPerPage and then rounded up to nearest int.
*  @param div {HTML Element} = pagination div created in function
*  @param pageDiv {HTML Element} = global const that holds the .page div element
*  @param ul {HTML Element} = UL that lists the page links
*  @param li {HTML Element} = li element that has each link tag as a child.
* 
*  @return no return. This function builds the pagelinks pagaination at the bottom of the list.
*
*********************************************************/

const appendPageLinks = (list) => {
   const totalPages = Math.ceil(list.length / itemsPerPage);

   // if only one page then don't make links
   if (totalPages === 1) {
      return;
   };

   // Build Div for pagination
   const div = document.createElement('div');
   div.className = "pagination";
   pageDiv.appendChild(div);

   // Build UL and add to pagination div
   const ul = document.createElement('ul')
   div.appendChild(ul);

   // Build Pagination Links
   for(let i = 0; i < totalPages; i ++){
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
   *     EVENT LISTENER FOR PAGINATION LINKS
   *********************************************************/
   div.addEventListener('click', () => {
      const pagination = document.querySelector('.pagination ul');
      // Grab the list of the pagination ul
      pageLinks = pagination.children;    

      // Grab the number clicked on set as int and save as current page
      currentPageNum =  parseInt(event.target.textContent); 
      
      /* Refresh Pagination Loop
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
      if(matches){
         showPage(matches, currentPageNum);
      }else{
         showPage(students, currentPageNum);
      }
   });
};

   /******************************************************
   *        
   *     buildSearchBar Function
   *  @param pageHeader {HTML Element} = HTML element that  the search bar will be placed in
   *  @param div {HTML element} = div created to be the student-search class div that holds the 
   *  @param input {HTML Element} = input created to accept search parameters
   *  @param button {HTML Element} = search button for search bar function
   *  @param noMatch {HTML Element} = div created to display the message that no match was found
   * 
   *  @returns nothing Builds the search bar html using javascript.
   *********************************************************/
const buildSearchBar = () => {
      // Grab pageHeader div to place the searchbar
      const pageHeader = document.querySelector('.page-header');

      // Create search div
      const div = document.createElement('div');
      div.classList.add('student-search');

      // Create text input for searchbar
      const input = document.createElement('input');
      input.classList.add("search-input");
      input.setAttribute("placeholder", "Search for students...");

      // Create submit button for searchbar
      const button = document.createElement('button');
      button.setAttribute("id", "submit");
      button.textContent = "Search";

      // Ammend the elments to the page
      pageHeader.appendChild(div);
      div.appendChild(input);
      div.appendChild(button);

      // Build a no matches screen that is hidden at first
         const noMatch = document.createElement('div');
         noMatch.id = 'no-matches';
         noMatch.textContent = "Sorry I couldn't find any results that match your search.";
         noMatch.style.display = 'none';
         noMatch.style.textAlign = 'center';

      // Append the no match div
      pageDiv.appendChild(noMatch);

         /* submit listener */
      button.addEventListener('click', (event) => {
         event.preventDefault();
         searchBar(input, students);
      });

      /* key listener */
      input.addEventListener('keyup', (event) => {
         event.preventDefault();
         searchBar(input, students);
      });
}

// Build The Search Bar
buildSearchBar();

   /******************************************************
   *        
   *     searchBar Function
   *  @variable noMatchesNode {HTML Element} = Grabs the element wit no-matches id. 
   *  @variable pagination {HTML element} = div that holds the pagination 
   *  @variable searchValue {string} = vale of the search bar input
   *  @variable studentName {string} = textContent of the student H3 which is the students name
   *  @variable matches {HTML Collection} = collection of HTML elements that holds all the search result matches
   *  @param searchInput = param passed to the function that holds the input from the search bar
   *  @param names = HTML collection of the student list items  that is passed into the function
   * 
   *  @returns nothing function that gives the action to the searchbar
   *********************************************************/

const searchBar = (searchInput, names) => {
   // Clear any no results messages
  const noMatchesNode = document.getElementById('no-matches');
  noMatchesNode.style.display = 'none';


   // Clear any current pagination
   const pagination = document.querySelector('div.pagination');

   //Remove any old pagination
   if (pagination) {
   pagination.parentNode.removeChild(pagination);
   };


   // loop through each student and add class name match if a match
   for(let i = 0; i < names.length; i++) { 
      const studentName = students[i].children[0].children[1].textContent;
      const name = names[i].textContent.toLowerCase();
      const searchValue = searchInput.value;

      // If input isn't empty and the search input is a substring to any name on list
      if(searchInput.value.length !== 0 && name.includes(searchValue.toLowerCase())){
         // True -> Set name as a match and display
         names[i].classList.add('match');
         names[i].style.display = 'list-item';
         console.log(studentName);
      } else {
         // False -> Remove match class and turn off display
         names[i].classList.remove('match');
         names[i].style.display = 'none';
      }
   }

   // If search input value is an empty string then show default page and pagination
   if (searchInput.value.length === 0) {
      showPage(students, 1);
      appendPageLinks(students);
      return;
      };

   // If no matches
  if (matches.length === 0) {
   noMatchesNode.style.display = '';
   return;
 };

   // Build The Screen
   showPage(matches, 1);
   appendPageLinks(matches);
};

 
// Set original Page
showPage(students, 1);
     
// Set Original Pagelinks
appendPageLinks(students);