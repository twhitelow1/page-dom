/******************************************
- List Filter and Pagination -
Uses unobtrusive JavaScript to add pagination and search
to an HTML unordered list of student records. The number of records
to show per page can be adjusted via the itemsPerPage variable.
******************************************/


const listItems = document.querySelectorAll('.student-item'); // Select all student li elements
const itemsPerPage = 10;

// Disploy one page of a given list
function showPage(list, page) {
  const startIndex = (page * itemsPerPage) - itemsPerPage;
  const endIndex = page * itemsPerPage;

  // Display the items that are within our range,
  // hide those that are not.
  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    if ((i >= startIndex) && (i < endIndex)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    };
  };
};

function doSearch(searchInput, list) {
  // clear any earlier No Matches state
  const noMatchesDiv = document.getElementById('noMatches');
  noMatchesDiv.style.display = 'none';

  // Clear earlier pagination, if any
  const pagination = document.querySelector('div.pagination');
  if (pagination) {
    pagination.parentNode.removeChild(pagination);
  };

  // find our new matches
  list.forEach((entry) => {
    // first, reset things from previous searches
    entry.classList.remove('match');
    entry.style.display = 'none';
    if ( (searchInput.value.length !== 0)
    && (entry.textContent.toLowerCase().includes(searchInput.value.toLowerCase())) ) {
      entry.classList.add('match');
      entry.style.display = '';
    };
  });

  // if search input is empty, take us back to non-search-filtered state
  if (searchInput.value.length === 0) {
    showPage(listItems, 1);
    appendPageLinks(listItems);
    return;
  };

  const matchItems = document.querySelectorAll('.match');

  // if we have no matches, display the "No Matches" state
  if (matchItems.length === 0) {
    noMatchesDiv.style.display = '';
    return;
  };

  // Otherwise, paginate and display our matching results
  showPage(matchItems, 1);
  appendPageLinks(matchItems);
};

// Create search input and button
function appendSearch() {
  const pageDiv = document.querySelector('.page');
  const header = document.querySelector('.page-header');

  const searchDiv = document.createElement('div');
  searchDiv.className = "student-search";

  const searchInput = document.createElement('input');
  searchInput.placeholder = "Search for students...";

  const searchSubmit = document.createElement('button');
  searchSubmit.textContent = "Search";

  // Prepare a "no matches" message and hide it for now
  const noMatches = document.createElement('div');
  noMatches.id = 'noMatches';
  noMatches.textContent = "No matches found.";
  noMatches.style.textAlign = 'center';
  noMatches.style.display = 'none';

  searchDiv.appendChild(searchInput);
  searchDiv.appendChild(searchSubmit);
  header.appendChild(searchDiv);
  pageDiv.appendChild(noMatches);

  searchSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    doSearch(searchInput, listItems);
  });

  searchInput.addEventListener('keyup', (event) => {
    doSearch(searchInput, listItems);
  });
}

// Create pagination control for a given element list (full or search-filtered)
function appendPageLinks(list) {
  const pageCount = Math.ceil(list.length / itemsPerPage);
  const pageDiv = document.querySelector('.page');

  // If there's only one page, do not display pagination
  if (pageCount === 1) {
    return;
  };

  function createPaginationLI(pageNumber) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.href = '#';
    a.textContent = pageNumber;
    li.appendChild(a);
    return li;
  };

  // Indicate which page we're actively viewing
  function setActiveClass(pageNumber) {
    const previousActive = paginationUL.querySelector('.active');
    const newActiveIndex = pageNumber - 1;
    const newActive = paginationUL.getElementsByTagName('a')[newActiveIndex];
    if (previousActive) {
      previousActive.className = '';
    };
    newActive.className = 'active';
  };

  // Start building our pagination HTML structure
  const paginationDiv = document.createElement('div');
  const paginationUL = document.createElement('ul');
  paginationDiv.className = 'pagination';
  paginationDiv.appendChild(paginationUL);
  pageDiv.appendChild(paginationDiv);

  // Add the pagination items and set the first page to active
  for (let i = 1; i <= pageCount; i++) {
    let li = createPaginationLI(i);
    paginationUL.appendChild(li);
  };
  setActiveClass(1);

  paginationDiv.addEventListener('click', (e) => {
    if (e.target.nodeName = 'a') {
      const clickedPageNumber = e.target.textContent;
      setActiveClass(clickedPageNumber);
      showPage(list, clickedPageNumber);
    };
  });

};

// Load page with starting state
showPage(listItems, 1);
appendSearch();
appendPageLinks(listItems);