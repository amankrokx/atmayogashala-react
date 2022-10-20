import Razorpay from "razorpay"
import env from "dotenv"
import database from "../database.mjs"
import { ObjectId } from "mongodb"
import NodeCache from "node-cache"
import { createHmac } from "node:crypto"
env.config()

class Razor {
    constructor() {
        this.razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        })

        this.cache = new NodeCache()
    }
}

const razorpay = new Razor()

const getCost = async (req, res) => {
    const { courseId } = req.body

    try {
        let course = razorpay.cache.get(courseId)
        if (course === undefined) {
            course = await database.findOne({ collection: "courses", query: { _id: ObjectId(courseId) } })
            course = {
                currency: "INR",
                tax: process.env.TAX,
                taxAmount: (course.price * process.env.TAX) / 100,
                totalAmount: course.price + (course.price * process.env.TAX) / 100,
                ...course,
            }
            razorpay.cache.set(courseId, course, process.env.CACHE_EXPIRY_TIME)
        }
        console.log(course)
        res.json({
            status: "success",
            amount: course.price,
            currency: "INR",
            isPurchased: (req.session  && req.session.courses && req.session.courses.some(e => e.courseId === courseId)) ? true : false,
            ...course,
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "error",
            error,
            message: error.message || `Internal server error while creating order`,
        })
    }
}

const generateOrder = async (req, res) => {
    const { courseId } = req.body
    
    if (!courseId || req.session.courses.some(e => e.courseId === courseId) ) {
        res.json({
            status: "error",
            message: "Course already purchased",
        })
        return
    }

    try {
        let course = razorpay.cache.get(courseId)
        if (course === undefined) {
            course = await database.findOne({ collection: "courses", query: { _id: ObjectId(courseId) } })
            course = {
                currency: "INR",
                tax: process.env.TAX,
                taxAmount: (course.price * process.env.TAX) / 100,
                totalAmount: course.price + (course.price * process.env.TAX) / 100,
                ...course,
            }
            razorpay.cache.set(courseId, course, process.env.CACHE_EXPIRY_TIME)
        }

        razorpay.razorpay.orders.create(
            {
                amount: course.totalAmount * 100,
                currency: "INR",
                receipt: Date.now().toString(),
                notes: {
                    uid: req.session.profile.uid,
                    contact: req.session.profile.email || req.session.profile.phoneNumber || null,
                },
            },
            async (err, order) => {
                if (err) {
                    console.log(err)
                    res.json({
                        status: "error",
                        error: err,
                        message: err.message || `Internal server error while creating order`,
                    })
                } else {
                    order.key = process.env.RAZORPAY_KEY_ID
                    console.log(order)
                    await database.insertOne({
                        collection: "orders",
                        data: {
                            _id: order.id,
                            ...order,
                            course: course._id,
                        },
                    })
                    res.json({
                        status: "success",
                        order,
                        course,
                    })
                }
            }
        )
    } catch (error) {
        console.log(error)
        res.json({
            status: "error",
            error,
            message: error.message || `Internal server error while creating order`,
        })
    }
}

const verifyPayment = async (req, res) => {
    // console.log(req.body)
    try {
        if (!req.body.razorpay_order_id) throw new Error("Order id not found")
        if (!req.body.razorpay_payment_id) throw new Error("Payment id not found")
        if (!req.body.razorpay_signature) throw new Error("Signature not found")

        const order = await database.findOne({ collection: "orders", query: { _id: req.body.razorpay_order_id } })
        if (!order) throw new Error("Order not found")
        if (order.notes.uid !== req.session.profile.uid) throw new Error("Wrong order id for the user.")
        
        const generated_signature = createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(`${order.id}|${req.body.razorpay_payment_id}`).digest("hex")
        
        if (generated_signature === req.body.razorpay_signature) {
            await database.updateOne({
                collection: "orders",
                query: { _id: order.id },
                data: {
                    status: "paid",
                    amount_paid: order.amount,
                    amount_due: 0,
                    paymentId: req.body.razorpay_payment_id,
                    paymentSignature: req.body.razorpay_signature,
                    verifiedByAPI: true,
                },
            })

            if (order.status === "paid") {
                res.json({
                    status: "success",
                    message: "Payment already done.",
                    courseId: order.course,
                })
                return
            }
            
            await database.db.collection("courses").updateOne({ _id: ObjectId(order.course) }, { $inc: { buyers: 1 } })
            // await database.updateOne({
            //     collection : "courses",
            //     query: { _id: ObjectId(order.course) },
            //     data: {
            //         "$inc": {
            //             buyers: 1
            //         }
            //     }
            // })

            await database.db.collection("users").updateOne(
                {
                    _id: order.notes.uid,
                },
                {
                    $push: {
                        orders: order.id,
                        courses: {
                            order_id: order.id,
                            courseId: order.course,
                            progress: 0,
                        },
                    },
                }
            )

            // await database.updateOne({
            //     collection: "users",
            //     query: { _id: order.notes.uid },
            //     data: {
            //         $push: {
            //             orders: order.id,
            //             courses: {
            //                 order_id: order.id,
            //                 courseId: order.course,
            //                 progress: 0,
            //             },
            //         },
            //     },
            // })

            database.findOne({ collection: "users", query: { _id: req.session.profile.uid } }).then(result => {
                if (result) {
                    Object.assign(req.session, result)
                } else {
                    database.insertOne({ collection: "users", data: { _id: req.session.profile.uid, points: 1, courses: [], orders: [] } }).then(result => {
                        // console.log(result)
                        Object.assign(req.session, { _id: req.session.profile.uid, points: 1, courses: [] })
                    })
                }
            })

            res.json({
                status: "success",
                message: "Payment verified",
                courseId: order.course,
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            status: "error",
            error,
            message: error.message || `Internal server error while verifying payment`,
        })
    }
    //  generated_signature = hmac_sha256(order_id + "|" + razorpay_payment_id, secret);

    //   if (generated_signature == razorpay_signature) {
    //     payment is successful
    //   }
}

const handleWebhook = async (req, res) => {
    const expected_signature = createHmac("sha256", process.env.WEBHOOK_SECRET).update(JSON.stringify(req.body)).digest("hex")

    if (expected_signature !== req.headers["x-razorpay-signature"]) {
        res.status(400).send("Webhook Error: Invalid Signature")
        console.log("Webhook Error: Invalid Signature")
        return
    }
    // console.log(req.body)
    // console.log(req.body.payload.payment)

    try {
        if (!(req.body.event === "order.paid" || req.body.event === "payment.captured")) {
            res.sendStatus(200)
            return
        }

        const order_id = req.body.payload.payment.entity.order_id || req.body.payload.payment.order.id || req.body.payload.payment.order.order_id
        if (!order_id) throw new Error("Payment not found")
        const order = await database.findOne({ collection: "orders", query: { _id: order_id } })
        if (!order) throw new Error("Order not found")

        await database.updateOne({
            collection: "orders",
            query: { _id: order.id },
            data: {
                status: "paid",
                amount_paid: order.amount,
                amount_due: 0,
                paymentId: req.body.payload.payment.entity.id || null,
                info: req.body,
                verifiedByWebHook: true,
            },
        })

        if (order.status === "paid") {
            res.sendStatus(200)
            return
        }

        await database.db.collection("courses").updateOne({ _id: ObjectId(order.course) }, { $inc: { buyers: 1 } })
        // await database.updateOne({
        //     collection : "courses",
        //     query: { _id: ObjectId(order.course) },
        //     data: {
        //         "$inc": {
        //             buyers: 1
        //         }
        //     }
        // })
        await database.db.collection("users").updateOne(
            {
                _id: order.notes.uid,
            },
            {
                $push: {
                    orders: order.id,
                    courses: {
                        order_id: order.id,
                        courseId: order.course,
                        progress: 0,
                    },
                },
            }
        )
        // await database.updateOne({
        //     collection: "users",
        //     query: { _id: order.notes.uid },
        //     data: {
        //         $push: {
        //             orders: order.id,
        //             courses: {
        //                 order_id: order.id,
        //                 courseId: order.course,
        //                 progress: 0,
        //             },
        //         },
        //     },
        // })

        database.findOne({ collection: "users", query: { _id: order.notes.uid } }).then(result => {
            if (result) {
                Object.assign(req.session, result)
            } else {
                database.insertOne({ collection: "users", data: { _id: order.notes.uid, points: 1, courses: [], orders: [] } }).then(result => {
                    // console.log(result)
                    Object.assign(req.session, { _id: order.notes.uid, points: 1, courses: [] })
                })
            }
        })

        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export { getCost, razorpay, generateOrder, verifyPayment, handleWebhook }
