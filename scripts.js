
const baseEndpoint = `https://api.spoonacular.com/food/products/`;
const proxy = `https://cors-anywhere.herokuapp.com/`
const form = document.querySelector('form.search');
const productsGrid = document.querySelector('.products');

require('dotenv').config();


async function fetchProducts(query){
  //response
  const res = await fetch(`${proxy}${baseEndpoint}search?query=${query}&apiKey=${process.env.API_KEY}`, {
    //converts data to JSON
    headers: {
      Accept: 'application/json',
    }
  });
  const data = await res.json();
  return data;
};

async function handleSubmit(e){
  e.preventDefault();
  fetchAndDisplay(form.query.value);

};


//displays products on page load
async function fetchAndDisplay(query){
  if(form.submit.disabled === true){
      alert('Must Unlock Temporary Access in Console');
  };
    //turn the form off
  form.submit.disabled = true;
  //submitting the search
  const products = await fetchProducts(query);
  //turn the form on
  form.submit.disabled = false;
  displayProducts(products.products);
  
};


function displayProducts(products){
  const html = products.map((product) =>  `
      <div>
        <h2>${product.title}<h2>
        ${product.image && `<img src="${product.image}" alt="${product.title}"/>`}
      </div>`
  );
  //displaying Products as a grid
  productsGrid.innerHTML = html.join(' ');
};



form.addEventListener('submit', handleSubmit);
//Display product on page load
fetchAndDisplay('Strawberry');

