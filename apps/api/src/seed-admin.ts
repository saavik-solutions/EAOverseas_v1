import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import path from 'path';
import { User } from './models/User';

dotenv.config({ path: path.join(__dirname, '../.env') });

async function seedAdmin() {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) throw new Error('MONGODB_URI not found in .env');

        await mongoose.connect(mongoURI);
        console.log('✅ Connected to MongoDB');

        const email = 'admin@eduwoy.com';
        const password = 'Admin@2026!';

        // Check if admin already exists
        const existing = await User.findOne({ email });
        if (existing) {
            console.log('⚠️  Admin user already exists. Updating password and ensuring verified...');
            existing.passwordHash = await bcrypt.hash(password, 12);
            existing.emailVerified = true;
            existing.role = 'admin';
            existing.failedLoginAttempts = 0;
            existing.accountLockedUntil = undefined;
            await existing.save();
            console.log('✅ Admin credentials updated.');
        } else {
            const passwordHash = await bcrypt.hash(password, 12);
            const admin = new User({
                fullName: 'Super Admin',
                name: 'Super Admin',
                email,
                passwordHash,
                role: 'admin',
                emailVerified: true, // Pre-verified — no OTP required
            });
            await admin.save();
            console.log('✅ Admin user created.');
        }

        console.log('');
        console.log('══════════════════════════════════');
        console.log('  ADMIN LOGIN CREDENTIALS');
        console.log('══════════════════════════════════');
        console.log(`  Email   : ${email}`);
        console.log(`  Password: ${password}`);
        console.log('  Role    : admin → redirects to /Superadmin');
        console.log('══════════════════════════════════');
        console.log('');

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed admin error:', error);
        process.exit(1);
    }
}

seedAdmin();
