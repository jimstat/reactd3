const processData = data => {
    const current = Object.keys(data.current)
    .filter(feature => feature !== 'organic')
    .map(feature => {
      let total = data.current[feature].total_count
      total = isNaN(total) ? 0 : total
      return {
        feature,
        total
      }
    })
    .sort((a, b) => b.total - a.total)

  return {
    data: {
      current
    }
  }
}

export default processData