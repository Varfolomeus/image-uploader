const express = require('express');
const app = express();
const cors = require("cors");
const multer = require('multer');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOrigin = 'http://localhost:3000';
app.use(cors({
  origin:[corsOrigin],
  methods:['GET','POST'],
  credentials: true 
})); 

const imageUploadPath = `${__dirname}\\image-upload`;


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, imageUploadPath)
  },
  filename: function(req, file, cb) {
let fileUploadDate= new Date();
let fileUploadDateForPath = `${String(fileUploadDate.getFullYear())}-${String(fileUploadDate.getMonth()).padStart(2, '0')}-${String(fileUploadDate.getDay()).padStart(2, '0')}--${String(fileUploadDate.getHours()).padStart(2, '0')}.${String(fileUploadDate.getMinutes()).padStart(2, '0')}.${String(fileUploadDate.getSeconds()).padStart(2, '0')}`;
    cb(null, `${file.fieldname}_dateVal_${fileUploadDateForPath}_${file.originalname}`);
  }
})

const imageUpload = multer({storage: storage})

app.post('/image-upload', imageUpload.array("my-image-file"), (req, res) => {
  console.log('POST request received to /image-upload.');
  // console.log('Axios POST body: ', req);
  res.send('POST request recieved on server to /image-upload.');
})

const port = 4000;
app.listen(port, process.env.IP, function(){
  console.log(`Server is running on port ${port}`);
  console.log('Server will place images to '+imageUploadPath);

});