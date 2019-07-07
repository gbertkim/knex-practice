require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})

// Drill 1
function searchByProduceName(searchTerm) {
    knexInstance
      .select('name', 'price', 'category', 'checked', 'date_added')
      .from('shopping_list')
      .where('name', 'ILIKE', `%${searchTerm}%`)
      .then(result => {
        console.log('Drill 1')
        console.log(result)
      })
  }

  searchByProduceName('fish');

// Drill 2
function paginateProducts(pageNumber) {
    const productsPerPage = 5
    const offset = productsPerPage * (pageNumber - 1)
    knexInstance
      .select('name', 'price', 'category', 'checked', 'date_added')
      .from('shopping_list')
      .limit(productsPerPage)
      .offset(offset)
      .then(result => {
        console.log('Drill 2')
        console.log(result)
      })
  }

paginateProducts(6);

// Drill 3
function addedSince(daysAgo) {
    knexInstance
      .select('name', 'price', 'category', 'checked', 'date_added')
      .from('shopping_list')
      .where(
        'date_added',
        '>',
        knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
      )
      .then(result => {
        console.log('Drill 3')
        console.log(result)
      })
  }
  
  addedSince(30);

// Drill 4

function categoryCost() {
    knexInstance
      .select('category')
      .sum('price as total')
      .from('shopping_list')
      .groupBy('category')
      .then(result => {
        console.log('Drill 4')
        console.log(result)
      })
  }

  categoryCost();

console.log('connection successful');