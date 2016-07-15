import _ from 'lodash'
import {random as randomStarWarsName} from 'starwars-names'
import moment from 'moment'

export {getRepos, getMockRepo, getMockRepos}

function getRepos(user) {
  return Promise.resolve({
    data: getMockRepos()
  })
}

function getMockRepos(number = _.random(1, 40)) {
  return  _.times(number, () => getMockRepo())
}

function getMockRepo(overrides = {}) {
  const name = overrides.name || _.kebabCase(randomStarWarsName())
  return {
    id: _.uniqueId(),
    language: _.sample('JavaScript', 'CSS', 'HTML', 'Ruby', 'Go', 'Elm'),
    stargazers_count: _.random(0, 10000),
    forks_count: _.random(0, 500),
    html_url: `https://github.com/${_.kebabCase(randomStarWarsName())}/${name}`,
    name,
    description: `The awesome repo for the ${name} project!`,
    pushed_at: getRandomTimestamp(),
    ...overrides,
  }
}

function getRandomTimestamp() {
  return moment({
    year: _.random(2004, 2015),
    month: _.random(0, 11),
    day: _.random(0, 28),
    hour: _.random(0, 23),
    minute: _.random(0, 59),
    second: _.random(0, 59),
    millisecond: _.random(0, 999),
  }).format()
}
