// Target Element
const categoryEl = document.getElementById('categories')
const productsEl = document.getElementById('products-section')

const fetchCategories = async () => {
    const res = await fetch('https://medic-commerce.vercel.app/categories')
    const data = await res.json()
    displayCategories(data.data)
}
fetchCategories()

const displayCategories = (data) => {
    categoryEl.innerHTML = ''
    const categories = data.map((category) => {
        const { categoryId, icon, name } = category
        const button = document.createElement('button')
        button.classList.add('category-btn')
        button.innerHTML = `
            <img class="w-20 h-20 rounded-full border-2 border-primary" src="${ icon }" alt="">
            <h3 class="text-lg text-secondary text-center text-secondary font-medium">${ name }</h3>
        `
        // Add onClick event for each button and send category ID
        button.addEventListener('click', () => fetchProducts(categoryId))

        return button
    })
    categories.forEach((category) => categoryEl.appendChild(category))
}

const fetchProducts = async (categoryID) => {
    const res = await fetch(
        `https://medic-commerce.vercel.app/products?categoryId=${ categoryID }`,
    )
    const data = await res.json()
    displayProducts(data.data)
}

const displayProducts = (data) => {
    productsEl.innerHTML = ''
    data.forEach((product) => {
        const {
            _id,
            name,
            image,
            category,
            categoryId,
            price,
            description,
            brand,
            color,
            material,
            productType,
            stock,
            quantity,
            rating,
            tags,
            seller,
        } = product

        productsEl.innerHTML += `
         <div class="border border-slate-200 rounded-md overflow-hidden">
                    <div class="h-72">
                        <img class="w-full h-full object-cover bg-slate-300" src="${ image }" alt="" />
                    </div>
                    <div class="text-center space-y-4 py-5">
                        <div class="flex justify-center gap-1 py-2 text-slate-400">
                            <span class="hover:underline hover:text-primary font-medium cursor-pointer">Capsules,</span>
                            <span class="hover:underline hover:text-primary font-medium cursor-pointer">Medicine,</span>
                            <span class="hover:underline hover:text-primary font-medium cursor-pointer">Pills</span>
                        </div>
                        <h3
                            class="text-xl font-bold font-secondary hover:text-btn-hover color-transition cursor-pointer">
                            ${ name }
                        </h3>
                        <p class="text-yellow-500 text-lg">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </p>
                        <p class="text-lg text-primary font-semibold">$${ price }.00</p>
                        <button
                            class="btn btn-primary bg-btn-hover btn-lg uppercase text-xs border-btn-hover text-white rounded-full hover:bg-primary hover:border-primary color-transition">add
                            to cart
                        </button>

                    </div>
                </div>
        `
    })
}
// fetchProducts('001')


