import { generateToken } from "../lib/util.js";

// Handle successful Google authentication
export const googleAuthCallback = (req, res) => {
  try {
    // Generate JWT token
    generateToken(req.user._id, res);
    
    // Redirect to frontend with success status
    res.redirect(`${process.env.ORIGIN || 'http://localhost:5173'}?auth=success`);
  } catch (error) {
    console.error('Google auth callback error:', error);
    res.redirect(`${process.env.ORIGIN || 'http://localhost:5173'}?auth=error`);
  }
};

// Handle Google authentication failure
export const googleAuthFailure = (req, res) => {
  res.redirect(`${process.env.ORIGIN || 'http://localhost:5173'}?auth=failed`);
}; 