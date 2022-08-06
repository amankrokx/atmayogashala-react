import * as fs from "fs"
import path, { dirname } from "path"
import { fileURLToPath } from "url"
import { google } from "googleapis"
import readline from "readline"
const OAuth2 = google.auth.OAuth2
const service = google.youtube("v3")
const __dirname = dirname(fileURLToPath(import.meta.url))

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/upload_app_session.json
const SCOPES = ["https://www.googleapis.com/auth/youtube.upload", "https://www.googleapis.com/auth/youtube.readonly"]
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + "/.credentials/"
const TOKEN_PATH = TOKEN_DIR + "upload_app_session.json"

let auth = null

const authorize = (credentials, cb) => {
    const clientSecret = credentials.installed.client_secret
    const clientId = credentials.installed.client_id
    const redirectUrl = credentials.installed.redirect_uris[0]
    const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl)

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (error, token) => {
        if (error) {
            return getNewToken(oauth2Client, cb)
        } else {
            oauth2Client.credentials = JSON.parse(token)
            return cb(null, oauth2Client)
        }
    })
}

const getNewToken = (oauth2Client, cb) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    })
    console.log("Authorize this app by visiting this url: ", authUrl)
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })
    rl.question("Enter the code from that page here: ", code => {
        rl.close()
        oauth2Client.getToken(code, (error, token) => {
            if (error) {
                return cb(new Error("Error while trying to retrieve access token", error))
            }
            oauth2Client.credentials = token
            storeToken(token)
            return cb(null, oauth2Client)
        })
    })
}

const storeToken = token => {
    try {
        fs.mkdirSync(TOKEN_DIR)
    } catch (error) {
        if (error.code != "EEXIST") {
            throw error
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), error => {
        if (error) throw error
        console.log("Token stored to " + TOKEN_PATH)
    })
}

const login = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname + "/client_secret.json"), (error, content) => {
            if (error) {
                console.log("Error loading client secret file: " + error)
                reject(error)
            }
            // Authorize a client with the loaded credentials
            authorize(JSON.parse(content), (err, a) => {
                if (err) reject(err)
                else {
                    auth = a
                    resolve(true)
                }
            })
        })

    })
}

const uploadVideo = (video, cb) => {
    if (!auth) login().then(() => {
        service.videos.insert(
            {
                auth: auth,
                part: "snippet,contentDetails,status",
                resource: {
                    // Video title and description
                    snippet: {
                        title: video.title,
                        description: video.description,
                    },
                    // I set to private for tests
                    status: {
                        privacyStatus: "private",
                    },
                },

                // Create the readable stream to upload the video
                media: {
                    body: video.videoReadStream, // Change here to your real video
                },
            },
            (error, data) => {
                if (error) {
                    return cb(error)
                }
                console.log("https://www.youtube.com/watch?v=" + data.data.id)
                return cb(null, data.data.id)
            }
        )
    }).catch(err => {cb(err)})
}


export { uploadVideo, authorize }