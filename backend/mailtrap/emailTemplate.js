export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;



export const WELCOME_EMAIL_TEMPLATE = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to FreelanceHub</title>
</head>
<body style="margin:0;padding:0;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:60px 20px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,0.15);overflow:hidden;">
          
          <!-- Header with Gradient -->
          <tr>
            <td style="background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);padding:40px 30px;text-align:center;">
              <div style="background:#ffffff;width:80px;height:80px;margin:0 auto 20px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                <span style="font-size:40px;">🎉</span>
              </div>
              <h1 style="margin:0;font-size:32px;color:#ffffff;font-weight:700;">Welcome to FreelanceHub!</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding:40px 30px;">
              <p style="margin:0 0 20px;font-size:18px;color:#111827;line-height:1.6;">
                Hi <strong style="color:#667eea;">{username}</strong>,
              </p>
              <p style="margin:0 0 30px;font-size:16px;color:#4b5563;line-height:1.6;">
                We're thrilled to have you join our community of talented freelancers and clients! 🚀
              </p>
              
              <!-- Features Grid -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:20px;background:#f3f4f6;border-radius:12px;margin-bottom:15px;">
                    <div style="font-size:24px;margin-bottom:8px;">💼</div>
                    <h3 style="margin:0 0 8px;font-size:16px;color:#111827;font-weight:600;">Browse Projects</h3>
                    <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.5;">Discover amazing opportunities from clients worldwide</p>
                  </td>
                </tr>
                <tr>
                  <td style="height:15px;"></td>
                </tr>
                <tr>
                  <td style="padding:20px;background:#f3f4f6;border-radius:12px;margin-bottom:15px;">
                    <div style="font-size:24px;margin-bottom:8px;">🤝</div>
                    <h3 style="margin:0 0 8px;font-size:16px;color:#111827;font-weight:600;">Connect & Collaborate</h3>
                    <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.5;">Build lasting relationships with professionals</p>
                  </td>
                </tr>
                <tr>
                  <td style="height:15px;"></td>
                </tr>
                <tr>
                  <td style="padding:20px;background:#f3f4f6;border-radius:12px;">
                    <div style="font-size:24px;margin-bottom:8px;">⚡</div>
                    <h3 style="margin:0 0 8px;font-size:16px;color:#111827;font-weight:600;">Manage Workflows</h3>
                    <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.5;">Streamline your projects with our efficient tools</p>
                  </td>
                </tr>
              </table>
              

            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:30px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 12px;font-size:14px;color:#6b7280;">
                Need help? We're here for you!
              </p>
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                © 2024 FreelanceHub. All rights reserved.
              </p>
              <p style="margin:8px 0 0;font-size:12px;color:#9ca3af;">
                You received this email because you signed up for FreelanceHub.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;