const searchInput = document.getElementById('search-input');
const btnSearch = document.getElementById('search-btn');
const dictionaryList = document.getElementById('dictionary-list');

btnSearch.addEventListener('click', search);

async function search(e) {
  e.preventDefault();
  const searchText = searchInput.value.trim();

  console.log(searchText);

  if (searchInput) {
    try {
      const data = await lookupDictionary(searchText);
      renderDictionaryResult(data);
    } catch (error) {
      console.log(error);
    }
  }
}

function renderDictionaryResult(resultList) {
  if (resultList.length > 0) {
    resultList.forEach((item) => {
      const dictionaryItem = document.createElement('li');
      dictionaryItem.classList.add('list-item', 'dictionary-item');
      const itemTitle = document.createElement('h2');
      itemTitle.classList.add('item-title');
      itemTitle.textContent = item.word;
      dictionaryItem.appendChild(itemTitle);

      if (item.phonetics.length > 0) {
        const phoneticsList = document.createElement('ul');
        phoneticsList.classList.add('list', 'phonetic-list');
        item.phonetics.forEach((item) => {
          const phoneticItem = document.createElement('li');
          phoneticItem.classList.add('list-item', 'phonetic-item');
          phoneticItem.textContent = item.text;
          phoneticsList.appendChild(phoneticItem);
        });
        dictionaryItem.appendChild(phoneticsList);
      }
      if (item.meanings.length > 0) {
        const meaningList = document.createElement('ul');
        meaningList.classList.add('meaning-list');
      }

      dictionaryList.appendChild(dictionaryItem);
    });
  }
}

async function lookupDictionary(key) {
  const API_URL = 'https://api.dictionaryapi.dev';
  try {
    const res = await fetch(`${API_URL}/api/v2/entries/en/${key}`);
    const data = await res.json();

    console.log('data: ', data);
    return data;
  } catch (error) {
    console.log('error: ', error);
  }
}

// lookupDictionary('hello');
