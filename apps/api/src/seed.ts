import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/User';
import { Post } from './models/Post';
import { Comment } from './models/Comment';
import { University } from './models/University';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const SEED_USERS = [
    {
        firebaseUid: 'USER_ADMIN_001',
        fullName: 'Admin User',
        email: 'admin@eduwoy.com',
        avatarUrl: 'https://i.pravatar.cc/150?u=admin',
        role: 'admin',
        trustScore: 99,
    },
    {
        firebaseUid: 'USER_COUNSELLOR_001',
        fullName: 'Dr. Sarah Smith',
        email: 'sarah.s@eduwoy.com',
        avatarUrl: 'https://i.pravatar.cc/150?u=sarah',
        role: 'counsellor',
        trustScore: 95,
    }
];

const SEED_UNIVERSITIES = [
    {
        university_id: 'uni-toronto-001',
        name: 'University of Toronto',
        website: 'https://www.utoronto.ca',
        country: 'Canada',
        city: 'Toronto',
        ranking: '1st in Canada, 21st Globally',
        logoUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200',
        scraped_at: new Date()
    },
    {
        university_id: 'uni-oxford-001',
        name: 'University of Oxford',
        website: 'https://www.ox.ac.uk',
        country: 'UK',
        city: 'Oxford',
        ranking: '1st in UK, 3rd Globally',
        logoUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200',
        scraped_at: new Date()
    },
    {
        university_id: 'uni-harvard-001',
        name: 'Harvard University',
        website: 'https://www.harvard.edu',
        country: 'USA',
        city: 'Cambridge',
        ranking: '1st Globally',
        logoUrl: 'https://images.unsplash.com/photo-1519781542704-957ff19eff00?w=200',
        scraped_at: new Date()
    },
    {
        university_id: 'uni-nus-001',
        name: 'National University of Singapore',
        website: 'https://www.nus.edu.sg',
        country: 'Singapore',
        city: 'Singapore',
        ranking: '1st in Asia',
        logoUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200',
        scraped_at: new Date()
    }
];

const SEED_POSTS = [
    // Articles
    {
        title: "The Ultimate Guide to Studying in Canada 2026",
        content: "Discover everything you need to know about the Canadian education system, from visa requirements to cost of living and post-graduation work permits. This article breaks down the top provinces for international students.",
        category: "Article",
        tags: ["Canada", "Guide", "Visa", "Post-Graduation"],
        location: "Canada",
        viewCount: 1240,
        score: 85,
    },
    {
        title: "Top 10 High-Paying Degrees for International Students",
        content: "We've analyzed global market trends to bring you the top degree choices that offer the best ROI for international students in 2026. Data Science, Healthcare, and Renewable Energy lead the list.",
        category: "Article",
        tags: ["Career", "ROI", "Degrees", "Future Work"],
        location: "Global",
        viewCount: 3500,
        score: 120,
    },
    // Scholarships
    {
        title: "Global Excellence Scholarship - $15,000",
        content: "Available for undergraduate students entering STEM fields in Fall 2026. This merit-based scholarship covers $15,000 of tuition fees per year and includes a mentorship program.",
        category: "Scholarship",
        tags: ["Scholarship", "STEM", "Undergraduate", "Merit-based"],
        location: "UK",
        viewCount: 890,
        score: 340,
        universityName: "University of Oxford",
    },
    {
        title: "Harvard Presidential Fellowship 2026",
        content: "Full-ride scholarship for PhD candidates demonstrating exceptional leadership and research potential. Includes full tuition, stipend, and health insurance for 5 years.",
        category: "Scholarship",
        tags: ["Harvard", "PhD", "Full-ride", "Research"],
        location: "USA",
        viewCount: 4500,
        score: 500,
        universityName: "Harvard University",
    },
    // Announcements
    {
        title: "Fall 2026 Admissions: Integrated Portfolio Requirements",
        content: "Attention applicants: All Design and Architecture programs now require a digital integrated portfolio submitted 2 weeks before the main application deadline. Please check the portal for technical specs.",
        category: "Announcement",
        tags: ["Admissions", "Fall 2026", "Portfolio", "Design"],
        location: "Global",
        viewCount: 650,
        score: 45,
    },
    {
        title: "New Student Visa Regulations for Australia",
        content: "The Australian Department of Home Affairs has updated the financial capacity requirements for international students. Starting June 2026, applicants must show proof of $29,710 AUD for living costs.",
        category: "Announcement",
        tags: ["Australia", "Visa", "Regulations", "Financials"],
        location: "Australia",
        viewCount: 2100,
        score: 180,
    },
    // Events
    {
        title: "Global Education Expo March 2026",
        content: "Join us for the largest study abroad exhibition in the region. Meet representatives from 50+ universities, attend visa workshops, and get on-the-spot profile assessments.",
        category: "Event",
        tags: ["Expo", "Networking", "Workshops", "Assessments"],
        location: "Mumbai, India",
        viewCount: 5600,
        score: 95,
    },
    {
        title: "University of Toronto Virtual Open House",
        content: "Live stream with admissions officers from UofT. Explore campuses, learn about student life, and get your questions answered in real-time.",
        category: "Event",
        tags: ["UofT", "Virtual Event", "Open House", "Admissions"],
        location: "Online",
        viewCount: 1500,
        score: 60,
        universityName: "University of Toronto",
    },
    // Programs
    {
        title: "MSc in Advanced Computer Science",
        content: "A one-year intensive program focusing on AI, Machine Learning, and Cybersecurity. Top-ranked program with strong industry ties to Oxford Science Park companies.",
        category: "Program",
        tags: ["Computer Science", "AI", "Masters", "Oxford"],
        location: "UK",
        viewCount: 3200,
        score: 210,
        universityName: "University of Oxford",
    },
    {
        title: "Bachelors in International Business",
        content: "Four-year degree with a mandatory exchange semester and double-degree options. Curated for the next generation of global leaders.",
        category: "Program",
        tags: ["Business", "Undergraduate", "Global", "NUS"],
        location: "Singapore",
        viewCount: 1800,
        score: 140,
        universityName: "National University of Singapore",
    },
    // Guides
    {
        title: "Navigating the US F-1 Visa Process: 2026 Edition",
        content: "A step-by-step walkthrough of the I-20 application, SEVIS fee payment, and tips for a successful interview at the US Embassy.",
        category: "Guide",
        tags: ["USA", "Visa", "F-1", "Interview"],
        location: "USA",
        viewCount: 4200,
        score: 280,
    },
    {
        title: "Accommodation Scouting: A Guide for International Students",
        content: "Find the best student housing options. We compare on-campus dorms vs. private rentals and explain lease agreements in common study destinations.",
        category: "Guide",
        tags: ["Housing", "Accommodation", "Budgeting", "Living Abroad"],
        location: "Global",
        viewCount: 1300,
        score: 75,
    }
];

async function seed() {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) throw new Error('MONGODB_URI not found');

        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB for seeding');

        // Clear existing data
        await User.deleteMany({});
        await Post.deleteMany({});
        await Comment.deleteMany({});
        await University.deleteMany({});

        const createdUsers = await User.insertMany(SEED_USERS);
        console.log(`Created ${createdUsers.length} seed users`);

        const createdUniversities = await University.insertMany(SEED_UNIVERSITIES);
        console.log(`Created ${createdUniversities.length} seed universities`);

        // Create a map for easy lookup
        const uniMap = new Map();
        createdUniversities.forEach(u => uniMap.set(u.name, u));

        for (let i = 0; i < SEED_POSTS.length; i++) {
            const postData = SEED_POSTS[i];
            const author = createdUsers[i % createdUsers.length];

            // Link to university if name matches
            let linkedUniId = undefined;
            let linkedUniLogo = undefined;
            if (postData.universityName && uniMap.has(postData.universityName)) {
                const uni = uniMap.get(postData.universityName);
                linkedUniId = uni._id;
                linkedUniLogo = uni.logoUrl;
            }

            const post = new Post({
                ...postData,
                authorId: author._id,
                universityId: linkedUniId,
                universityLogo: linkedUniLogo || 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=100&h=100&fit=crop',
            });
            await post.save();
        }

        console.log(`Successfully created ${SEED_POSTS.length} high-fidelity seed posts`);
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
}

seed();
