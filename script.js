const defaultBookSelf = [{ id: 123, title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K Rowling', year: 1997, isComplete: false }, { id: 321, title: 'the beginning', author: 'steve', year: 2000, isComplete: true }]
let rakBuku = [
    // {
    //     id: 123,
    //     title: 'Buku belum',
    //     author: 'anonymous',
    //     year: 1999,
    //     isComplete: false
    // },
    // {
    //     id: 321,
    //     title: 'the beginning',
    //     author: 'steve',
    //     year: 2000,
    //     isComplete: true
    // }
]
let buku = []
// storage
let chacheKey = 'bookSelf'
if (localStorage.getItem(chacheKey) == null) {
    localStorage.setItem(chacheKey, JSON.stringify(defaultBookSelf))
}
function saveBookself() {
    localStorage.setItem(chacheKey, JSON.stringify(rakBuku))
}

// code
document.getElementById('buatBuku').addEventListener('submit', (event) => {
    event.preventDefault()

    rakBuku.push({
        id: +new Date(),
        title: document.getElementById('judul').value,
        author: document.getElementById('penulis').value,
        year: document.getElementById('tahun').value,
        isComplete: document.getElementById('isComplete').checked
    })

    document.dispatchEvent(new Event('renderBook'))
})

window.addEventListener('load', () => {
    rakBuku = JSON.parse(localStorage.getItem('bookSelf'))
    document.dispatchEvent(new Event('renderBook'))
    document.getElementById('loader').style.display = 'none'
})

document.addEventListener('renderBook', () => {
    document.getElementById('belum').innerHTML = ''
    document.getElementById('sudah').innerHTML = ''
    document.getElementById('result').innerHTML = ''
    createElement()
    saveBookself()
})

document.getElementById('search').addEventListener('click', () => {
    let key = document.getElementById('search-key').value
    key.toLowerCase().split(' ').join('')
    buku.map(x => {
        if (x.dataset.name == key) {
            document.getElementById('result').innerHTML = ''
            document.getElementById('result').append(x)
        }
    })
})

function createElement() {
    rakBuku.map(x => {
        // card text
        const judul = document.createElement('h4')
        judul.innerText = x.title

        const penulis = document.createElement('p')
        penulis.innerText = x.author

        const tahun = document.createElement('p')
        tahun.innerText = x.year

        const cardText = document.createElement('div')
        cardText.classList.add('card-text')
        cardText.append(judul, penulis, tahun)

        // card edit
        const newTitle = document.createElement('input')
        newTitle.setAttribute('type', 'text')
        newTitle.setAttribute('id', 'newTitle')
        newTitle.value = x.title

        const newAuthor = document.createElement('input')
        newAuthor.setAttribute('type', 'text')
        newAuthor.setAttribute('id', 'newAuthor')
        newAuthor.value = x.author

        const newYear = document.createElement('input')
        newYear.setAttribute('type', 'number')
        newYear.setAttribute('id', 'newYear')
        newYear.value = x.year

        const newComplete = document.createElement('input')
        newComplete.setAttribute('type', 'checkbox')
        newComplete.setAttribute('id', 'newSelesai')
        newComplete.checked = x.isComplete

        const toggleLabel = document.createElement('label')
        toggleLabel.innerHTML = 'Selesai dibaca '

        const toggleSelesai = document.createElement('div')
        toggleSelesai.classList.add('input-inline')
        toggleSelesai.append(toggleLabel, newComplete)

        const hapusBuku = document.createElement('p')
        hapusBuku.classList.add('hapus-buku')
        hapusBuku.setAttribute('title', 'yakin?')
        hapusBuku.innerText = 'Hapus'
        hapusBuku.addEventListener('click', () => {
            hapus(x.id)
        })

        const cardEdit = document.createElement('div')
        cardEdit.classList.add('card-edit')
        cardEdit.append(newTitle, newAuthor, newYear, toggleSelesai, hapusBuku)
        cardEdit.style.display = 'none'

        // edit button
        const editButton = document.createElement('button')
        editButton.innerHTML = 'Ubah'
        editButton.classList.add('btn-edit')

        editButton.addEventListener('click', (e) => {
            e.preventDefault()
            e.target.style.display = 'none'
            saveButton.style.display = 'inline'
            cardText.style.display = 'none'
            cardEdit.style.display = 'inline'
        })

        // save Button
        const saveButton = document.createElement('button')
        saveButton.innerHTML = 'simpan'
        saveButton.classList.add('btn-save')
        saveButton.style.display = 'none'

        saveButton.addEventListener('click', (e) => {
            e.preventDefault()
            e.target.style.display = 'none'
            editButton.style.display = 'inline'
            cardText.style.display = 'inline'
            cardEdit.style.display = 'none'

            saveState(x.id, newTitle.value, newAuthor.value, newYear.value, newComplete.checked)
            document.dispatchEvent(new Event('renderBook'))
        })


        // grouping
        const card = document.createElement('article')
        card.setAttribute('id', x.id)
        card.setAttribute('data-name', x.title.toLowerCase().split(' ').join(''))
        card.classList.add('card')
        card.append(cardText, cardEdit, editButton, saveButton)

        // buku
        buku.push(card)

        // taro ke habitat nya
        if (x.isComplete) {
            document.getElementById('sudah').append(card)
        } else {
            document.getElementById('belum').append(card)
        }
    })
}


function saveState(idTarget, newTitle, newAuthor, newYear, newComplete) {
    rakBuku.map(buku => {
        if (buku.id == idTarget) {
            buku.title = newTitle
            buku.author = newAuthor
            buku.year = newYear
            buku.isComplete = newComplete
        }
    })
}

function hapus(targetID) {
    for (let i in rakBuku) {
        if (rakBuku[i].id == targetID) {
            rakBuku.splice(i, 1)
            document.dispatchEvent(new Event('renderBook'))
        }
    }
}