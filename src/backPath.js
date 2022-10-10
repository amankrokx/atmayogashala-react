const bp = () => {
    let s = window.location.toString()
    if (s.includes('localhost:3000')) return "http://localhost:3069"
    else if (s.includes('azurestaticapps')) return "https://atmayogashala.herokuapp.com"
    else if (s.includes('192.168.29')) return "http://" + window.location.hostname + ":3069"
    else return ""
}

const backPath = bp()

export default backPath
