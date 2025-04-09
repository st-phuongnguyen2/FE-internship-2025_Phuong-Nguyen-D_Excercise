const searchInput = document.getElementById('search-input');
const btnSearch = document.getElementById('search-btn');
const dictionaryList = document.getElementById('dictionary-list');
const sectionMessage = document.getElementById('section-message');

btnSearch.addEventListener('click', search);

async function search(e) {
  e.preventDefault();
  const searchText = searchInput.value.trim();

  console.log(searchText);

  if (searchInput) {
    try {
      renderDictionaryResult(undefined, 'Loading...');
      const data = await lookupDictionary(searchText);
      if (Array.isArray(data)) {
        renderDictionaryResult(data);
      } else {
        renderDictionaryResult(undefined, data.message);
      }
    } catch (error) {
      console.log(error);
      renderDictionaryResult(error.message);
    }
  }
}

function renderDictionaryResult(resultList, message) {
  dictionaryList.innerHTML = '';
  sectionMessage.innerHTML = '';

  if (!message && resultList.length > 0) {
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
        meaningList.classList.add('list', 'meaning-list');

        item.meanings.forEach((item) => {
          const meaningItem = document.createElement('li');
          meaningItem.classList.add('list-item', 'meaning-item');

          const typeWord = document.createElement('p');
          typeWord.classList.add('type-word');
          typeWord.textContent = item.partOfSpeech;
          meaningItem.appendChild(typeWord);

          const meaningText = document.createElement('p');
          meaningText.classList.add('meaning-text');
          meaningText.textContent = 'Meaning';
          meaningItem.appendChild(meaningText);

          const definitionList = document.createElement('ul');
          definitionList.classList.add('list', 'definition-list');
          meaningItem.appendChild(definitionList);

          item.definitions.forEach((item) => {
            const definitionItem = document.createElement('li');
            definitionItem.classList.add('list-item', 'definition-item');
            definitionItem.textContent = item.definition;
            definitionList.appendChild(definitionItem);
          });
          meaningList.appendChild(meaningItem);
        });
        dictionaryItem.appendChild(meaningList);
      }

      dictionaryList.appendChild(dictionaryItem);
    });
  } else {
    let customMesage =
      "Sorry pal, we couldn't find definitions for the word you were looking for.";
    if (message) {
      customMesage = message;
    }
    sectionMessage.textContent = customMesage;
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
