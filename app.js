
async function fetchData() {
    const response = await fetch('./data.json');
    try {
        const data = await response.json(); 
        return data
    } catch(e) {
        console.log('error');
        console.log(e);
        const grid = document.querySelector('main');
        const section = document.createElement('section');
        section.innerHTML =
        `<div class="card-content">
        <h1>There's an error !</h1>
        <p class="last-week"> ${e}</p>
        </div>` ;

        grid.append(section);
    }
}

async function createCards(option) {
    const data = await fetchData();
    const grid = document.querySelector('main');  
    data.forEach(el => {
        const name = el.title;
        const nameClass = name.toLowerCase().replace(' ', '-');
        const currentTime = el.timeframes[option].current;
        const previousTime = el.timeframes[option].previous;
        //check what to display before the previous time
        const calcPreviousTimeText = (option) =>{
            if (option === 'daily') return 'Yesterday';
            if (option === 'weekly') return 'Last week';
            if (option === 'monthly') return 'Last month';    
        };
        const previousTimeText = calcPreviousTimeText(option);

        const section = document.createElement('section');
        section.classList.add('card', nameClass);
        section.innerHTML = `
        <div class="card-illustration"></div>
        <div class="card-content">
        <h1>${name}</h1>
        <button class="dots">...</button>
        <p class="time">${currentTime}hrs</p>   
        <p class="last-week"> ${previousTimeText} - ${previousTime}hrs</p>
        </div>`;
        
        grid.append(section);
    });
};


//styling the active timeframe btn
let timeframeBtn = document.querySelectorAll('.timeframe-btn');
timeframeBtn.forEach(el => {
    el.addEventListener('click', () => {
    timeframeBtn.forEach(el => el.classList.remove('active'));
    el.classList.add('active')
    });
});

//grab the timeframe option of the clicked btn and delete the previous cards
timeframeBtn.forEach (el => {
    el.addEventListener('click', () => {
        const timeframeOption = el.dataset.option;
        const cardsToDelete = document.querySelectorAll('.card');
        cardsToDelete.forEach(el => el.remove());
        createCards(timeframeOption);
    })
});

window.onload = createCards('daily');
