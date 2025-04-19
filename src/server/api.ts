import { Resend } from "resend";

const resend = new Resend("re_fvmgHG1J_9NeVFjs849YXgodyiWdAbHMZ");

export const sendEmail = async (email: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "PACE Innovations <team@paceinv.com>",
      to: email,
      subject: "🎉 Welcome to the Journey with Pace Innovation!",
      html: `
        <div style="background-color:#ffffff; color:#141414; font-family: 'Helvetica Neue', sans-serif; padding: 2rem; border-radius: 12px; max-width: 600px; margin: 0 auto;">
          
          <!-- Logo -->
          <div style="text-align: center; margin-bottom: 1.5rem;">
            <a href="https://www.paceinv.com" target="_blank" rel="noopener noreferrer">
              <img src="https://paceinv.com/assets/logoicon.png" alt="Pace Innovation Logo" style="height: 60px;">
            </a>
          </div>

          <!-- Heading -->
          <h2 style="color:#1A1F2C; font-size: 1.75rem; margin-bottom: 0.75rem; text-align: center;">
            🎉 Welcome to the Journey with Pace Innovation!
          </h2>

          <!-- Body -->
          <p style="font-size: 1rem; line-height: 1.6;">Hey there 👋</p>

          <p style="font-size: 1rem; line-height: 1.6;">
            Thanks for subscribing to our newsletter — we’re so glad to have you with us! You’ve officially joined the <strong>Pace Innovation</strong> community — a space for <strong>visionaries, builders</strong>, and <strong>doers</strong> who want to stay ahead of the curve.
          </p>

          <p style="font-size: 1rem; line-height: 1.6;">
            Here’s what you can look forward to:
          </p>

          <ul style="font-size: 1rem; line-height: 1.6; padding-left: 1.2rem;">
            <li>✨ Smart money tips & tricks</li>
            <li>🚀 Feature rollouts & product updates</li>
            <li>💡 Exclusive insights & offers</li>
          </ul>

          <p style="font-size: 1rem; line-height: 1.6;">
            Explore more at <a href="https://www.paceinv.com" target="_blank" style="color: #2563eb; text-decoration: none;">paceinv.com</a> — your go-to hub for managing money smarter, not harder.
          </p>

          <p style="font-size: 1rem; line-height: 1.6;">
            And if you're hungry for more, our <a href="https://paceinv.com" target="_blank" style="color: #2563eb; text-decoration: none;">Finance Blog</a> has all the tips, stories, and insights you need to level up your financial game.
          </p>

          <p style="font-size: 1rem; line-height: 1.6;">Questions? Just reply — we’re always here for you.</p>

          <p style="font-size: 1rem; line-height: 1.6; margin-top: 1.5rem;">
            Stay tuned — the best is yet to come!
          </p>

          <!-- CTA Button -->
          <div style="margin-top: 2rem; text-align: center;">
            <a href="https://www.paceinv.com" target="_blank" rel="noopener noreferrer" style="background-color:#1A1F2C; color:#ffffff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600;">
              Visit Our Website
            </a>
          </div>

          <!-- Footer -->
          <hr style="border: none; border-top: 1px solid #eee; margin: 2rem 0;" />

          <p style="font-size: 0.875rem; color: #777;">
            You’re receiving this email because you signed up for the Pace Innovation newsletter. If this wasn’t you, feel free to ignore it.
          </p>
        </div>
      `,
    });

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return { success: false, error };
  }
};
