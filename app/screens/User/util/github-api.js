import axios from 'axios'

export {getRepos, getUserData}

function getRepos(user) {
  const url = `https://api.github.com/users/${user}/repos?per_page=250`
  return axios
    .get(url)
    .then(response => response.data)
}

function getUserData(user) {
  return axios.all([
      axios.get(`https://api.github.com/users/${user}`),
      axios.get(`https://api.github.com/users/${user}/orgs`)
    ])
    .then(axios.spread((user, orgs) => ({
      user: user.data,
      orgs: orgs.data,
    })))
}
