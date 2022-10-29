import backPath from "../../backPath"
import auth from "../../firebase/auth"

const verifyCred = (user)  => {
    return new Promise((resolve, reject) => {
        fetch(backPath + "/verifyCred", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow", // manual, *follow, error
            body: JSON.stringify({mode: "test"}), // body data type must match "Content-Type" header
        })
        .then(data => data.json())
        .then(res => {
            if (res.status === "success") {
                resolve(res)
                return
            }
            else if (res.status === "error" || res.status === "undefined") {
                reject(res.message)
                return
            }
            if (!user) user = auth.currentUser
            user.getIdToken(true).then(idToken => {
                fetch(backPath + "/verifyCred", {
                    method: "POST", // *GET, POST, PUT, DELETE, etc.
                    mode: "cors", // no-cors, *cors, same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: "follow", // manual, *follow, error
                    body: JSON.stringify({
                        mode: "set",
                        jwt: idToken,
                    }), // body data type must match "Content-Type" header
                })
                .then(data => data.json())
                .then(ress => {
                    if (ress.status === "success") resolve(ress.mode)
                    else reject(ress.message)
                })
                .catch(e => reject(e.toString()))
            })
            .catch(err => reject(err.toString()))
        })
        .catch(e => reject(e.toString()))
    })
}

export default verifyCred