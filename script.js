const toolbox = document.getElementById('toolbox');
const filterButtons = document.getElementById('filter-buttons');

// URL of your JSON file hosted on GitHub
const jsonUrl = 'https://raw.githubusercontent.com/Muhammad-Usama-1/DevOpsToolbox/refs/heads/master/data.json';

let allData = [];
let categories = new Set();  // Keep track of categories dynamically

// Fetch data from JSON and initialize the page
fetch(jsonUrl)
  .then(response => response.json())
  .then(data => {
    allData = data;
    getCategories(data);
    createButtons(categories);
    displayTools(data);  // Display all tools initially
  })
  .catch(error => console.error('Error fetching tools:', error));

// Extract unique categories from data
function getCategories(data) {
  data.forEach(tool => {
    categories.add(tool.category);  // Add category to Set (ensures uniqueness)
  });
}

// Create category filter buttons
function createButtons(categories) {
  const allButton = document.createElement('button');
  allButton.textContent = 'All';
  allButton.classList.add('active');
  allButton.onclick = () => {
    setActiveButton(allButton);
    displayTools(allData);  // Show all tools
  };
  filterButtons.appendChild(allButton);

  categories.forEach(category => {
    const button = document.createElement('button');
    button.textContent = category;
    button.onclick = () => {
      setActiveButton(button);
      filterByCategory(category);
    };
    filterButtons.appendChild(button);
  });
}

// Set the active button style
function setActiveButton(activeButton) {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => button.classList.remove('active'));
  activeButton.classList.add('active');
}

// Display tools on the page based on filtered data
function displayTools(data) {
  toolbox.innerHTML = '';
  data.forEach(tool => {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');

    const categoryTitle = document.createElement('h2');
    categoryTitle.textContent = tool.category;
    // categoryDiv.appendChild(categoryTitle);

    const toolTitle = document.createElement('h3');
    toolTitle.textContent = tool.title;
    categoryDiv.appendChild(toolTitle);

    const toolDescription = document.createElement('p');
    toolDescription.textContent = tool.description;
    categoryDiv.appendChild(toolDescription);

    const toolLink = document.createElement('a');
    toolLink.href = tool.link;
    toolLink.target = '_blank';
    toolLink.textContent = tool.link;
    categoryDiv.appendChild(toolLink);

    toolbox.appendChild(categoryDiv);
  });
}

// Filter tools by category
function filterByCategory(categoryName) {
  const filteredData = allData.filter(tool => tool.category === categoryName);
  displayTools(filteredData);
}
