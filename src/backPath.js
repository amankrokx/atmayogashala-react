const backPath = () => {
    let s = window.location.toString()
    if (s.includes('localhost:3000')) return "http://localhost:3069"
    else if (s.includes('azurestaticapps')) return "https://atmayogashala.herokuapp.com"
    else return ""
}

export default backPath
