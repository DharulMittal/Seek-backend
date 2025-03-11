import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// Wait for MongoDB connection before initializing Passport
const initializePassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        scope: ['profile', 'email']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user already exists by email
          let user = await User.findOne({ email: profile.emails[0].value });
          
          if (user) {
            // If user exists but doesn't have a googleId, update it
            if (!user.googleId) {
              user.googleId = profile.id;
              // Update profile picture if user doesn't have one
              if (!user.pfp && profile.photos && profile.photos.length > 0) {
                user.pfp = profile.photos[0].value;
              }
              await user.save();
            }
            return done(null, user);
          } else {
            // Create new user with Google profile data
            const newUser = new User({
              username: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
              pfp: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : ""
            });
            
            await newUser.save();
            return done(null, newUser);
          }
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
};

// Initialize Passport when MongoDB is connected
mongoose.connection.once('connected', () => {
  console.log('MongoDB connected - initializing Passport');
  initializePassport();
});

export default passport; 