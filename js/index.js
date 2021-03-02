const GITHUB_API_URL = "https://api.github.com/"
const GITHUB_URL = "https://github.com/"

document.addEventListener("DOMContentLoaded", ()=> {
    console.log("DOM Loaded")
    init()

})

const init = () => {
    const form = document.getElementById("github-form")
    form.addEventListener("submit", searchSubmit)
}

const searchSubmit = (e) => {
    e.preventDefault()
    const searchName = e.target.search.value
    const searchURL = GITHUB_API_URL + "search/users?q=" + searchName
    console.log(searchURL)

    reqObj = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.v3+json"
        }
    }

    fetch(searchURL,reqObj).then(res=>res.json()).then((searchResults) => {

        const userList = document.getElementById("user-list")
        userList.innerHTML = ""
        searchResults.items.forEach(showSearchResult)})
}

const showSearchResult = (searchResult) => {
    const userList = document.getElementById("user-list")

    const userLi = document.createElement('li')
    userLi.innerText = searchResult.login
    userLi.id = searchResult.login
    userLi.addEventListener('click',repoSearch)


    userList.append(userLi)
}

function repoSearch(e) {
    const searchURL = GITHUB_API_URL + "users/" + e.target.id +"/repos"

    reqObj = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.v3+json"
        }
    }

    fetch(searchURL,reqObj).then(res=>res.json()).then((repoSearchResults) => {
        const repoTable = document.getElementById("repos-list")
        repoTable.innerHTML = ""
        const repoHeader = document.createElement('tr')
        const nameHeader = document.createElement('th')
            nameHeader.innerText = "Repo Name"
        const createdHeader = document.createElement('th')
            createdHeader.innerText = "Created"
        const updatedHeader = document.createElement('th')
            updatedHeader.innerText = "Updated"
        const languageHeader = document.createElement('th')
            languageHeader.innerText = "Language"
        const sizeHeader = document.createElement('th')
            sizeHeader.innerText = "Size"
        repoHeader.append(nameHeader,createdHeader,updatedHeader,languageHeader,sizeHeader)
        repoTable.appendChild(repoHeader)

        repoSearchResults.forEach(showRepoSearchResult)})

}

function showRepoSearchResult(repo) {

    const repoTable = document.getElementById("repos-list")
    const repoTr = document.createElement('tr')
    const repoName = document.createElement('td')
        repoName.innerText = repo.name
    const repoCreated = document.createElement('td')
        repoCreated.innerText = repo.created_at
    const repoUpdated = document.createElement('td')
        repoUpdated.innerText = repo.updated_at
    const repoLanguage = document.createElement('td')
        repoLanguage.innerText = repo.language
    const repoSize = document.createElement('td')
        repoSize.innerText =repo.repoSize

    repoTr.append(repoName,repoCreated,repoUpdated,repoLanguage,repoSize)
    repoTable.append(repoTr)

}