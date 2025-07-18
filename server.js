require('dotenv').config();
const express = require('express');
const path = require("path");
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');

const allowedOrigins = [
  process.env.CLIENT_URL?.replace(/\/$/, ""),
  process.env.ADMIN_URL?.replace(/\/$/, ""),
   process.env.LOCAL_URL?.replace(/\/$/, ""),

];
// const allowedOrigins =['https://giveummah.com', 'https://admin.giveummah.com']
const port = process.env.PORT || 3000;
// app.use(cors({
//   origin: function (origin, callback) {
//   // console.log("Origin:", origin); 
//   if (!origin || allowedOrigins.includes(origin)) {
//     callback(null, true);
//   } else {
//     callback(new Error("Not allowed by CORS"));
//   }
// },
  
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true  }));


// db connection
const connectDB = require('./config/db');
const { connection } = require('mongoose');


connectDB();

// Serve static images
app.use("/images", express.static(path.join(__dirname, "public/images")));
// Use the upload route
const uploadRoutes = require("./routes/upload");
app.use("/api", uploadRoutes);

// route configration
const HolidayPackageRoutes =require('./routes/HolidayPackeges')
const CategoryRoutes =require('./routes/category')
const EnquiryRoutes =require('./routes/Enquiry')
const BlogRoutes =require('./routes/Blog')
const DestinationRoutes =require('./routes/Destination')
const PageRoutes =require('./routes/Page')
app.use('/v1/api', HolidayPackageRoutes);
app.use('/v1/api', CategoryRoutes);
app.use('/v1/api', EnquiryRoutes );
app.use('/v1/api', PageRoutes);
app.use('/v1/api', BlogRoutes);
app.use('/v1/api', DestinationRoutes);

app.use((error,req,res,next)=>{
console.log(error);
res.status(500).send(error.message);

})


app.post('/contact/send-email', async (req, res) => {
  const { from, name, phone, subject, message ,email} = req.body;

  try {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

const mailOptions = {
  from: `"${name}" <sales@maximtrip.com>`,
  to: "sales@maximtrip.com",
  replyTo: email,
  subject: "New Contact Form Submission",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #ce3c3d;">New Message from Contact Form</h2>
      <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
      <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
      <p style="margin: 10px 0;"><strong>Phone:</strong> ${phone}</p>
      <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
      <p style="margin: 10px 0;"><strong>Message:</strong><br/>
        <span style="white-space: pre-line;">${message}</span>
      </p>
    </div>
  `
};

    await transporter.sendMail(mailOptions);

 res.status(200).json({ message: 'Message sent successfully!' });
 
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Email sending failed!' });
  }
});

app.post('/enquiry/send-email', async (req, res) => {
  const { from, fullName, mobile, distination, members ,email,packageName, date} = req.body;

  try {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

const mailOptions = {
  from: `"${fullName}" <sales@maximtrip.com>`,
  to: "sales@maximtrip.com",
  replyTo: email,
  subject: "New Enquiry Form Submission",
  html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
  
  <h3 style="color: #ce3c3d;">New Message from Contact Form</h3>
  <p style="margin: 10px 0;"><strong>Name:</strong> ${fullName}</p>
  <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
  <p style="margin: 10px 0;"><strong>Phone No:</strong> ${mobile}</p>
  <p style="margin: 10px 0;"><strong>Distination:</strong> ${distination}</p>
  <p style="margin: 10px 0;"><strong>Members:</strong><br/>${members}</p>
  <p style="margin: 10px 0;"><strong>Package:</strong><br/>${packageName}</p>
  <p style="margin: 10px 0;"><strong>Date:</strong><br/>${date}</p>
  </div>
  `
};

    await transporter.sendMail(mailOptions);

 res.status(200).json({ message: 'Message sent successfully!' });
 
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Email sending failed!' });
  }
});
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// app.use(cors(corsOptions));
// 
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));