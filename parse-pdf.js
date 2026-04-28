const fs = require('fs');
const pdfParse = require('pdf-parse');

let dataBuffer = fs.readFileSync('components/portfolio-v3/CV_Sami_Bentaarit_eng.pdf');

pdfParse(dataBuffer).then(function(data) {
    fs.writeFileSync('cv_text.txt', data.text);
    console.log('PDF parsed successfully to cv_text.txt');
}).catch(err => {
    console.error('Error parsing PDF:', err);
});
