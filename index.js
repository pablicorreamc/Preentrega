// Alumno: Pablo Correa
//Tema: Preentrega

const URL = 'https://fakestoreapi.com/';
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log (data);
  } catch (error) {
    console.error(error);
  }
}


import fetch from 'node-fetch';

const [, , method, resource, ...args] = process.argv;
const BASE_URL = 'https://fakestoreapi.com';

// Funciones de acción
async function getAllProducts() {
  const response = await fetch(`${BASE_URL}/${resource}`);
  const data = await response.json();
  console.log(data);
}

async function getProductById(id) {
  const response = await fetch(`${BASE_URL}/${resource}/${id}`);
  const data = await response.json();
  console.log(data);
}

async function createProduct(title, price, category) {
  const response = await fetch(`${BASE_URL}/${resource}`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      price: parseFloat(price),
      description: 'A nice product',
      image: 'https://i.pravatar.cc',
      category
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  console.log(data);
}

async function deleteProduct(id) {
  const response = await fetch(`${BASE_URL}/${resource}/${id}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  console.log(data);
}

// Controlador principal
(async () => {
  try {
    if (method === 'GET') {
      if (args.length === 0) {
        await getAllProducts();
      } else {
        await getProductById(args[0]);
      }
    } else if (method === 'POST') {
      const [title, price, category] = args;
      if (!title || !price || !category) {
        console.error('Faltan parámetros: <title> <price> <category>');
        return;
      }
      await createProduct(title, price, category);
    } else if (method === 'DELETE') {
      await deleteProduct(args[0]);
    } else {
      console.error('Método no soportado. Usa GET, POST o DELETE.');
    }
  } catch (err) {
    console.error('Error al ejecutar la operación:', err.message);
  }
})();