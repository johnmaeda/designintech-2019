/* global google */

import loadScript from './loadScript'

const libraries = loadScript('https://www.gstatic.com/charts/loader.js')
  .then(() => {
    return new Promise((resolve, reject) => {
      google.charts.load('current', {
        packages: ['wordtree', 'bar', 'piechart'],
        callback: resolve
      })
    })
  })

async function drawWordTree (element, data, options = {}) {
  await libraries
  const dataTable = google.visualization.arrayToDataTable(data)
  const chart = new google.visualization.WordTree(element)
  chart.draw(dataTable, options)
}

async function drawBarChart (element, data, options = {}) {
  await libraries
  const dataTable = google.visualization.arrayToDataTable(data)
  const chart = new google.charts.Bar(element)
  chart.draw(dataTable, options)

}
async function drawPieChart (element, data, options = {}) {
  await libraries
  const dataTable = google.visualization.arrayToDataTable(data)
  const chart = new google.visualization.PieChart(element)
  chart.draw(dataTable, options)
}

export default function drawGoogleChart (element, type, data, options = {}) {
  if (!data) {
    throw new Error('Data must be supplied for chart.')
  }
  switch (type) {
    case 'bar':
      return drawBarChart(element, data, options)
    case 'wordtree':
      return drawWordTree(element, data, options)
    case 'pie':
      return drawPieChart(element, data, options)
    default:
      throw new Error(`Unknown char type: ${type}`)
  }
}
