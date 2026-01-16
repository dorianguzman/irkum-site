/**
 * Irikum Contact Form Handler
 * Google Apps Script to receive form submissions and send email notifications
 *
 * Deploy as Web App:
 * - Execute as: Me
 * - Who has access: Anyone
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const emailBody = `
New inquiry from Irikum website:

Name: ${data.name}
Email: ${data.email}
Interest: ${data.interest}

Message:
${data.message}
    `;

    MailApp.sendEmail({
      to: 'info.irikum@gmail.com',
      subject: 'New Irikum Inquiry from ' + data.name,
      body: emailBody,
      replyTo: data.email
    });

    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test function - run this to test the email sending
 */
function testEmail() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    interest: 'Bespoke Piece',
    message: 'This is a test message.'
  };

  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const result = doPost(mockEvent);
  console.log(result.getContent());
}
