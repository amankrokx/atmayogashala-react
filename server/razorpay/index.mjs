import Razorpay from 'razorpay';
import env from 'dotenv';
env.config()

class Razor {
    constructor() {
        this.razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        })
    }
}

const razorpay = new Razor();
export default razorpay;