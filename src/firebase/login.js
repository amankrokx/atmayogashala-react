import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  TwitterAuthProvider,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signInWithPopup,
  FacebookAuthProvider,
  getAuth,
  onAuthStateChanged,
  signOut,
  getIdToken,
} from "firebase/auth"

class Authmgrs {
  constructor(firebaseApp) {
    this.isSigned = false // signed or unsigned for UI
    this.loginElements = document.querySelectorAll(".ifLoggedIn")

    this.auth = getAuth(firebaseApp)
    // Observer login state
    onAuthStateChanged(this.auth, user => {
      if (user) {
        // logged in state...
        getIdToken(user).then(r => console.log(r))
        console.log(user)
        this.user = user
        this.loggedInState(true)
        this.initUser()
        if (window.location.hash === "#login") window.location.hash = "" // hide login ui after signin
      } else {
        // logged out state...
        this.loggedInState(false)
        toast("Please Sign In .")
      }
    })
  }

  // set up items based on user state
  initUser = () => {
    if ( this.user.displayName ) document.querySelector('nav div.login > button.login').innerHTML = this.user.displayName.split(' ')[0]
    else {
      document.querySelector("nav div.login > button.login").innerHTML = "Hellow !"
      toast("Set Up your profile !")
    }

    // Gather data , take action !
  }

  loggedInState = flag => {
    if (flag) {
      if (!this.isSigned) {
        this.loginElements.forEach(e => {
          if (e.classList.contains("hidden")) e.classList.remove("hidden")
          else e.classList.add("hidden")
          document.querySelector("#loginlink").href = "#"
          document.querySelector("nav div.login button.logout").onclick = () => {
            signOut(this.auth)
              .then(() => {
                toast("Logged Out !")
                this.loggedInState(false)
              })
              .catch(e => {
                toast("Error Logging Out !")
              })
          }
        })
      }
      this.isSigned = true
    } else {
      if (this.isSigned) {
        this.loginElements.forEach(e => {
          if (e.classList.contains("hidden")) e.classList.remove("hidden")
          else e.classList.add("hidden")
          document.querySelector("nav div.login").onclick = "#login"
        })
      }
      // Setup events
      document.querySelector("#loginlink").href = "#login"
      const socials = document.querySelectorAll("div.sign div.socials img")
      // socials[0].onclick = 
      // socials[1].onclick = 
      socials[2].onclick = this.loginGoogle
      // Signup email
      document.querySelector("div.logup div.emailsignup button").onclick = () => {
        let email = document.querySelector("div.logup div.emailsignup div.email input[type=email]").value
        let password = document.querySelector("div.logup div.emailsignup div.password input[type=password]").value
        if (!email || !password) {
          toast("Please Check Email and Password")
          return
        }
        this.signupEmail(email, password)
      }
      // Logon email
      document.querySelector("div.logup div.email button").onclick = () => {
        let email = document.querySelector("div.logup div.email div.email input[type=email]").value
        let password = document.querySelector("div.logup div.email div.password input[type=password]").value
        if (!email || !password) {
          toast("Please Check Email and Password")
          return
        }
        this.loginEmail(email, password)
      }
      // Login Phone
      document.querySelector("div.logup div.phone button").onclick = () => {
        let phone = document.querySelector("div.logup div.phone div.phone input[type=tel]").value
        if (phone.length != 10) {
          if (phone.charAt(0) === '0') phone = "+91" + phone.substring(1)
          else {
            toast("Please Check Phone Number ")
            return
          }
        } else phone = "+91" + phone.substring(1)
        showLoader()
        this.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: response => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
            },
            "expired-callback": () => {
              toast("ReCaptcha Loading Failed")
            },
          },
          this.auth
        )
        this.submitPhoneNumberAuth(phone)
      }

      this.isSigned = false
    }
  }

  // send otp to phone number after recaptcha verify
  submitPhoneNumberAuth = phone => {
    signInWithPhoneNumber(this.auth, phone, this.recaptchaVerifier)
      .then(confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult
        hideLoader()
        toast("OTP Sent Successfully !")
        document.querySelector("div.logup div.phone button").innerHTML = "Verify"
        document.querySelector("div.logup div.phone button").onclick = () => {
          let otp = document.querySelector("div.logup div.phone input[type=password]").value
          if (otp.length != 6) {
            toast("PLease Check ypur OTP !")
            return
          }
          this.submitPhoneNumberAuthCode(otp)
        }
      })
      .catch(error => {
        // Error; SMS not sent
        console.error(error)
        toast(error.message)
        grecaptcha.reset(this.recaptchaWidgetId)

        // Or, if you haven't stored the widget ID:
        this.recaptchaVerifier.render().then(function (widgetId) {
          grecaptcha.reset(widgetId)
        })
      })
  }

  submitPhoneNumberAuthCode = otp => {
    confirmationResult
      .confirm(otp)
      .then(result => {
        // User signed in successfully.
        toast("Login Success with Phone !")
      })
      .catch(error => {
        // User couldn't sign in (bad verification code?)
        console.error(error)
        toast(error.message)
      })
  }

  // email Signup helper
  signupEmail = (email, password) => {
    // console.log('Signup with email
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        // Signed in
        // const user = userCredential.user;
        toast("Signed in with Email !")
        toast("Please Fill your Profile !")
      })
      .catch(error => {
        console.error(error)
        toast(error.message)
      })
  }

  loginEmail = (email, password) => {
    // console.log('Login with Email loaded')
    signInWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        // Signed in
        // const user = userCredential.user;
        toast("Signed in with Email !")
      })
      .catch(error => {
        console.error(error)
        toast(error.message)
        // ..
      })
  }

  loginGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(this.auth, provider)
      .then(res => {
        getRedirectResult(this.auth)
          .then(result => {
            // This gives you a Google Access Token. You can use it to access Google APIs.
            // const credential = GoogleAuthProvider.credentialFromResult(result)
            // const token = credential.accessToken;
            // The signed-in user info.
            // const user = result.user
            toast("Signed in with Google !")
          })
          .catch(error => {
            // Handle Errors here.
            const errorMessage = error.message
            // The email of the user's account used.
            const email = error.email
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error)
            // console.log(email, credential)
            console.error(error)
            toast(error.message)
          })
      })
      .catch(error => {
        console.error(error)
        toast(error.message)
      })
  }
}
