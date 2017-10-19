const excludeFeatures = [
  'organic',
  'answers (list)',
  'answers (paragraph)',
  'answers (table)',
  'amp (organic)',
  'amp (news)',
  'amp (recipes)',
  'knowledge graph (other)'
]
const featureFilter = feature => !excludeFeatures.includes(feature)

const processData = data => {
  const current = Object.keys(data.current)
    .filter(featureFilter)
    .map(feature => {
      let total = data.current[feature].total_count
      total = isNaN(total) ? 0 : total
      return {
        feature,
        total
      }
    })
    .sort((a, b) => b.total - a.total)

  const tsCount = data.time_series.count
  const timeSeries = Object.keys(tsCount)
    .filter(featureFilter)
    .map(feature => {
      return Object.keys(tsCount[feature])
        .map(date => {
          let featureCount = tsCount[feature][date]
          return {
            feature,
            count: featureCount ? featureCount.total.whole : 0,
            date: Date.parse(date)
          }
        })
    })
    .reduce((acc, cur) => {
      return acc.concat(cur)
    },[]); //flatten arrays

  return {
    data: {
      current,
      timeSeries
    }
  }
}

export default processData