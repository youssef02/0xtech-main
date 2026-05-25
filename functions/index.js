const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const Mailjet = require("node-mailjet");

const mailjetApiKey = defineSecret("MAILJET_API_KEY");
const mailjetSecretKey = defineSecret("MAILJET_SECRET_KEY");

exports.onNewContact = onDocumentCreated(
  {
    document: "contacts/{contactId}",
    secrets: [mailjetApiKey, mailjetSecretKey],
  },
  async (event) => {
    const data = event.data?.data();
    if (!data) return;

    const { name, email, message } = data;

    const mailjet = Mailjet.Client.apiConnect(
      mailjetApiKey.value(),
      mailjetSecretKey.value()
    );

    try {
      await mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: "contactus@0xtech.dev",
              Name: "0xTech Contact Form",
            },
            To: [
              {
                Email: "contactus@0xtech.dev",
                Name: "0xTech",
              },
            ],
            Subject: `New Contact: ${name}`,
            HTMLPart: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #00ff88; background: #0a0a0a; padding: 20px; border-radius: 8px 8px 0 0; margin: 0;">
                  New Contact Submission
                </h2>
                <div style="padding: 20px; background: #111; border-radius: 0 0 8px 8px;">
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #00ff88;">${email}</a></p>
                  <p><strong>Message:</strong></p>
                  <div style="background: #1a1a1a; padding: 16px; border-radius: 6px; border-left: 3px solid #00ff88;">
                    ${message.replace(/\n/g, "<br>")}
                  </div>
                  <hr style="border: none; border-top: 1px solid #222; margin: 20px 0;">
                  <p style="color: #666; font-size: 12px;">
                    Reply directly to <a href="mailto:${email}" style="color: #00ff88;">${email}</a> to respond.
                  </p>
                </div>
              </div>
            `,
            ReplyTo: {
              Email: email,
              Name: name,
            },
          },
        ],
      });

      console.log(`Email sent for contact from ${name} (${email})`);
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  }
);
