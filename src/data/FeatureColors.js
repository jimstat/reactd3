const featureColors = {
    'organic': '#8cc051',
    'amp': '#1b91db',
    'amp (news)': '#1b91db',
    'amp (organic)': '#006eb3',
    'amp (recipes)': '#055689',
    'answers': '#6a4abc',
    'answers (list)': '#6a4abc',
    'answers (paragraph)': '#5233a0',
    'answers (table)': '#3a1a8b',
    'app download': '#ee4db9',
    'carousel': '#e67e33',
    'explore': '#88715c',
    'flights': '#4b89dc',
    'home services': '#37bb9b',
    'images': '#890a40',
    'jobs': '#f6bb43',
    'knowledge graph': '#d1b23d',
    'knowledge graph (other)': '#d1b23d',
    'knowledge graph (videos)': '#bb9f34',
    'news': '#83c5b2',
    'people also ask': '#967bdc',
    'placesv3': '#fedc22',
    'recipes': '#b7b511',
    'refine by': '#e9573e',
    'related searches': '#da4553',
    'shopping': '#d273ab',
    'twitter box': '#37abf1',
    'unknown': '#373150',
    'videos': '#c81f1f',
    'default': '#3b3b3b'
  }

export default feature => featureColors[feature] || featureColors['default']
