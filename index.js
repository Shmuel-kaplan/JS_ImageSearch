document.addEventListener('DOMContentLoaded', ()=>{
    
    const apiKey = "44413622-f4980ea162b61dbf813bd1fb3";

    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const imageResults = document.getElementById("imageResults");
    const buttonsContainer = document.querySelector(".buttons");
    
    const tags = [
        'trees', 'beach', 'ice-cream', 'mountain', 'river', 'apple', 'banana', 'cat', 
        'dog', 'car', 'bicycle', 'house', 'lamp', 'book', 'pencil', 'notebook', 'guitar', 
        'piano', 'drums', 'chocolate', 'cookie', 'bread', 'butter', 'cheese', 'milk', 
        'coffee', 'tea', 'computer', 'phone', 'watch', 'table', 'chair', 'sofa', 'window', 
        'door', 'painting', 'vase', 'flower', 'garden', 'park', 'bridge', 'boat', 'train', 
        'airplane', 'rocket', 'star', 'moon', 'sun', 'cloud', 'rain'
    ];

    function displayImages(images){
        imageResults.innerHTML = null;
        images.forEach(
            image => {
                const card = document.createElement('div');
                card.className = "col-12 col-sm-6 col-md-4 image-card mb-4";
                card.innerHTML = `
                    <div class="card h-100">
                        <img src="${image.webformatURL}" class="card-img-top" alt="${image.tags} "/>
                        <div class="card-body">
                            <p class="card-text"> Downloads: ${image.downloads}</p>
                            <p class="card-text"> Views: ${image.views}</p>
                            <a href="${image.pageURL}" target="_blank" class="btn btn-primary">Download</a>
                        </div>
                     </div>
                `;
                imageResults.appendChild(card);
            }
        );
    };

    function fetchImages(query){

        fetch(`https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo`)
        .then(responce =>responce.json())
        .then(data =>{
            displayImages(data.hits);
        })
        .catch(error => console.error("Error in fetchImages function: ", error));
        
    };

    tags.forEach(tag => {
        const button = document.createElement("buttom");
        button.className = "btn btn-secondary m-2";
        button.innerText = tag;
        button.addEventListener('click', () =>{
            fetchImages(tag);
        });
        buttonsContainer.appendChild(button);
    });

    searchButton.addEventListener('click', ()=> {
        const query = searchInput.value;
        if (query) {
            fetchImages(query);
        }
    });
});