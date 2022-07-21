import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import auth from ".."
import SnackbarUtils from "../../../components/SnackbarUtils"
import LoaderUtils from "../../../components/Loader/LoaderUtils"

class LoginPhone {
    // generateRecaptcha() {
        
    //     this.recaptchaVerifier.render()
    // }
    sendOtp(phone) {
        return new Promise((resolve, reject) => {
            LoaderUtils.open()
            if (!this.recaptchaVerifier) {
                this.recaptchaVerifier = new RecaptchaVerifier(
                    "recaptcha-container",
                    {
                        size: "invisible",
                        callback: response => {
                            // reCAPTCHA solved, allow signInWithPhoneNumber.
                            SnackbarUtils.info("Recaptcha Verified .")
                        },
                        "expired-callback": () => {
                            SnackbarUtils.error("Recaptcha Failed .")
                        },
                    },
                    auth
                )
            }
            signInWithPhoneNumber(auth, phone, this.recaptchaVerifier)
                .then(confirmationResult => {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).
                    this.confirmationResult = confirmationResult
                    SnackbarUtils.success("OTP sent .")
                    LoaderUtils.close()
                    resolve(true)
                })
                .catch(error => {
                    // Error; SMS not sent
                    console.error(error)
                    LoaderUtils.close()
                    SnackbarUtils(error.message)
                    // grecaptcha.reset(this.recaptchaWidgetId)
                    // Or, if you haven't stored the widget ID:
                    this.recaptchaVerifier.render().then(function (widgetId) {
                        this.recaptchaVerifier.reset(widgetId)
                    })
                    reject(false)
                })
            // resolve(false)
        })

    }

    verifyOtp(otp) {
        LoaderUtils.open()
        this.confirmationResult
        .confirm(otp)
        .then(result => {
                LoaderUtils.close()
                // User signed in successfully.
                SnackbarUtils.success("Login Success with Phone !")
            })
            .catch(error => {
                LoaderUtils.close()
                // User couldn't sign in (bad verification code?)
                console.error(error)
                SnackbarUtils.error(error.message)
            })
    }
}

export default new LoginPhone()