interface VerificationEmailProps {
  username: string;
  verifyCode: string;
}

export default function VerificationEmail({
  username,
  verifyCode,
}: VerificationEmailProps) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <link
      rel="preload"
      as="image"
      href="https://react-email-demo-3kjjfblod-resend.vercel.app/static/plaid-logo.png"
    />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--$-->
  </head>

  <body
    style="
      background-color: #ffffff;
      font-family: HelveticaNeue, Helvetica, Arial, sans-serif;
    "
  >
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="
        max-width: 500px;
        background-color: #ffffff;
        border: 1px solid #eee;
        border-radius: 5px;
        box-shadow: 0 5px 10px rgba(20, 50, 70, 0.2);
        margin-top: 20px;
        margin: 0 auto;
        padding-top: 68px;
        padding-bottom: 20px;
      "
    >
      <tbody>
        <tr style="width: 100%">
          <td>
            <img
              alt="Plaid"
              height="88"
              src="https://react-email-demo-3kjjfblod-resend.vercel.app/static/plaid-logo.png"
              style="
                display: block;
                outline: none;
                border: none;
                text-decoration: none;
                margin: 0 auto;
              "
              width="212"
            />
            <p
              style="
                font-size: 11px;
                line-height: 16px;
                margin: 16px 8px 8px 8px;
                color: #0a85ea;
                font-weight: 700;
                font-family: HelveticaNeue, Helvetica, Arial, sans-serif;
                height: 16px;
                letter-spacing: 0;
                text-transform: uppercase;
                text-align: center;
              "
            >
              Verify Your Account
            </p>
            <h1
              style="
                color: #000;
                display: inline-block;
                font-family: HelveticaNeue, Helvetica, Arial, sans-serif;
                font-size: 18px;
                font-weight: bold;
                line-height: 24px;
                margin-bottom: 0;
                margin-top: 0;
                text-align: center;
              "
            >
              Hello ${username}, Here's your verification code (OTP).
            </h1>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="
                background: rgba(0, 0, 0, 0.05);
                border-radius: 4px;
                margin: 16px auto 14px;
                vertical-align: middle;
                width: 280px;
                margin-top: 20px;
              "
            >
              <tbody>
                <tr>
                  <td>
                    <p
                      style="
                        font-size: 32px;
                        line-height: 40px;
                        margin: 0 auto;
                        color: #000;
                        display: inline-block;
                        font-weight: 700;
                        letter-spacing: 6px;
                        padding-bottom: 8px;
                        padding-top: 8px;
                        width: 100%;
                        text-align: center;
                      "
                    >
                      ${verifyCode}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              style="
                font-size: 15px;
                line-height: 23px;
                margin: 0;
                color: #444;
                font-family: HelveticaNeue, Helvetica, Arial, sans-serif;
                letter-spacing: 0;
                padding: 0 40px;
                text-align: center;
                margin-top: 25px;
              "
            >
              Thank you for registering. Please use the above OTP to complete
              your registration, <span style="font-weight:bold; color: #232323;">This code will expire in 1 hour.</span>
            </p>
            <p
              style="
                font-size: 15px;
                line-height: 23px;
                margin: 0;
                color: #444;
                font-family: HelveticaNeue, Helvetica, Arial, sans-serif;
                letter-spacing: 0;
                padding: 0 40px;
                text-align: center;
                margin-top: 25px;
              "
            >
              If you did not request this code, please ignore this email.
            </p>
            <p style="text-align: center; margin-top: 40px;">
              <a href="http://localhost:3000/verify/${username}" style="padding: 8px 12px; background-color: #0a85ea; color: #fff; text-decoration: none; border-radius: 4px;" target="_blank">Verify here</a>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <p
      style="
        font-size: 12px;
        line-height: 23px;
        margin: 0;
        color: #000;
        font-weight: 800;
        letter-spacing: 0;
        margin-top: 20px;
        font-family: HelveticaNeue, Helvetica, Arial, sans-serif;
        text-align: center;
        text-transform: uppercase;
      "
    >
      Securely powered by ProfileCraft.
    </p>
    <!--/$-->
  </body>
</html>
`;
}
