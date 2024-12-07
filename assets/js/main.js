const getCategories = async ()=>{
    const {data} = await axios.get('https://dummyjson.com/products/category-list');
    return data;
};

const displayCategories = async ()=>{
    const categories = await getCategories();
    const result = categories.map( (category)=>{
        return `
        <div class="category">
        <h2>${category}</h2>
        <a href="categoriesDetails.html?category=${category}">Details</a>
        </div>
        `
        

    }).join('');
    document.querySelector(".categories .row").innerHTML = result;
   
}
const getproducts= async (page)=>{
    const skip = ( page - 1 ) * 30;
    const {data} = await axios.get(`https://dummyjson.com/products?limit=20&skip=${skip}`);
    return data;
}
const displayproducts =async (page = 1)=>{
    
    const data = await getproducts(page);
    console.log(page)
    const numberOfPage= Math.ceil(data.total / 30);
    const result = data.products.map( (product)=>{
        return `
        <div class="product">
        <img src="${product.thumbnail}"/>
        <h2>${product.title}</h2>
        </div>
        `
    }).join('');
    document.querySelector(".products .row").innerHTML = result;
    let paginationLink = `<li class="page-item"><button onclick=displayproducts('${page - 1}') class="page-link"  href="#">&laquo;</button></li>`;

     for(let i =1 ; i<=numberOfPage;i++){
        paginationLink += `<li class="page-item"><button onclick=displayproducts(${i}) class="page-link" >${i}</button></li>`
     }

    paginationLink += 
    `<li class="page-item"><button onclick=displayproducts('${parseInt(page) + 1}') class="page-link"  href="#">&raquo;</button></li>`;
    
    document.querySelector(".pagination").innerHTML = paginationLink;

    console.log(data);
    console.log(numberOfPage);
}
displayproducts();

displayCategories();
