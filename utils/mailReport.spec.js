const nodemailer = require("nodemailer");
const fs = require("fs");

async function sendEmail() {
    
    let transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false, 
        auth: {
            user: "ashritha@quality-matrix.com",  
            pass: "sxdfvvkxjgpdpxbc",         
        },
    });

   
    let reportPath = "playwright-report/index.html";
    let attachment = fs.existsSync(reportPath)
        ? [{ filename: "TestReport.html", path: reportPath }]
        : [];

    let mailOptions = {
        from: '"Playwright Test Results" <ashritha@quality-matrix.com>',
        to: "ashritha@quality-matrix.com", 
        subject: "Playwright Test Report",
        text: "Find attached the latest Playwright test report.",
        attachments: attachment,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully: " + info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}


sendEmail();


//cmd -node utils/mailReport.spec.js