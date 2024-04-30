const bands = ['Nirvana', 'Nine Inch Nails', 'Backstreet Boys', 'N Sync', 'Night Club', 'Apashe', 'STP'];
const features = ['Grunge', 'Rock', 'Industrial', 'Boy Band', 'Dance', 'Techno'];
const user_votes = [];

// Function to dynamically generate bands and vote inputs
function generateBandInputs() {
  const bandsList = document.getElementById('bandsList');
  bands.forEach((band) => {

    const bandItem = document.createElement('div');
    bandItem.className = 'band-item';

    const label = document.createElement('label');
    label.className = 'band-label';
    label.textContent = band;
    bandItem.appendChild(label);

    const voteInput = document.createElement('input');
    voteInput.type = 'number';
    voteInput.className = 'form-control vote-input';
    voteInput.min = 1;
    voteInput.max = 10;
    voteInput.required = true;
    bandItem.appendChild(voteInput);

    bandsList.appendChild(bandItem);
  });
}
generateBandInputs();

function getVotesArray() {
    const votesArray = [];
    const inputs = document.querySelectorAll('.vote-input');
    inputs.forEach(input => {
      votesArray.push(parseInt(input.value));
    });
    return votesArray;
}
function displayResults(userFeatsTensor, features) {
    // Convertir el tensor en un array de JavaScript
    const userFeatsArray = userFeatsTensor.arraySync()[0];
  
    // Obtener el div donde mostrar los resultados
    const resultsDiv = document.getElementById('results');
  
    // Limpiar cualquier contenido anterior del div
    resultsDiv.innerHTML = '';
  
    // Crear elementos HTML para mostrar los resultados
    const resultsTitle = document.createElement('h2');
    resultsTitle.textContent = 'Results';
    resultsDiv.appendChild(resultsTitle);
  
    const resultList = document.createElement('ul');
  
    // Iterar sobre los géneros musicales y sus respectivas puntuaciones
    features.forEach((feature, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${feature}: ${userFeatsArray[index]}`;
      resultList.appendChild(listItem);
    });
  
    resultsDiv.appendChild(resultList);
  }
function calculateResults() {
    const votesArray = getVotesArray();
    const userFeatsTensor = tf.tensor([votesArray]); // Crear tensor de una fila y siete columnas
    const bandFeatsTensor = tf.tensor([
      [1, 1, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0],
      [0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 1],
      [0, 0, 1, 0, 0, 1],
      [1, 1, 0, 0, 0, 0],
    ]);
    const user_feats = tf.matMul(userFeatsTensor, bandFeatsTensor)
    // Mostrar los resultados en el HTML
    displayResults(user_feats, features);
}
  

