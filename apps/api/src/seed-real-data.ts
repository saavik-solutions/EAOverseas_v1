import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { University } from './models/University';
import { User } from './models/User';
import { Post } from './models/Post';

dotenv.config();

const universities = [
    {
        university_id: 'asu-001',
        name: "Arizona State University",
        website: "https://www.asu.edu",
        country: "USA",
        city: "Tempe",
        logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUdzt3vabnFKzx_oJmfKMYvm9OPQf8tRgWs_Dw85RU5_1SoBwHcAF4l8viDzOlp9uijwjvga0QXKCFwqRvbuJRjcNHvS7c5gVRPiVSZYDft5sEn1XWQmJKkl8649GeMqM69ZuGFUOv3tb0Yh2PBOFSDrcaTF95DgWInD5SDa7HYpjy5Nr0V2UgrCDtR8CmFi2U73PRjLtm5I81RCn5NrZhTv3QdR-atqwiDrwYD8BxuM37Uk3vLwjpAgO1NVEo2PnzPZTwXuuBFQ2Y",
        ranking: "56",
        universityType: "Research",
        establishedYear: 1885,
        totalStudents: 75000,
        campusSize: "661 Acres",
        description: "A comprehensive public research university, measured not by whom it excludes, but by whom it includes and how they succeed."
    },
    {
        university_id: 'uom-001',
        name: "University of Manchester",
        website: "https://www.manchester.ac.uk",
        country: "United Kingdom",
        city: "Manchester",
        logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrz5opf6XSLf_jFqn-0A2HESJWZ5xcncY2JViYooxB062bvoQEfvOq77f5B3SJbDE-rW0JjKacZk6lJMAxGL65Uf0ud8ukzl4pYUxz2hMoIbP44PBG8DDRNqwhlt-XYShvpMQv9x4DOsendHngzBNlmGFdkmTD6Zb2kGPmDSM307Zz8L71EaQ3CCHMNBzehwXDJVoghPMc5TeGKBq_ENBpI94N02uMd1olu4t4wsOF3L-26cEpm8IgIPMJ-AxvJS9vjo8dQx8OkP00",
        ranking: "38",
        universityType: "Public",
        establishedYear: 1824,
        totalStudents: 40000,
        campusSize: "Urban",
        description: "One of the UK's most famous and forward-looking universities, with a rich heritage of innovation."
    },
    {
        university_id: 'uow-001',
        name: "University of Waterloo",
        website: "https://uwaterloo.ca",
        country: "Canada",
        city: "Waterloo",
        logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuALLciL-jFVPbmbjb2E4QB4dhDnpL74OVLJsFj1YZzWnBl73kctmVbI_5v46D51g30mzquMR0xjaW9A0kO1MGsxLOe4A9ML16jRbNP4V9FqnhTZsp6gl9HZhm8URHeWPAEMgkXg0smBG-flgVU9xUjPB2gmkB4zgFlmYJgEMwX2fa_AFJIlzwLg22aI62Bj0Skk37nGzcd12_LIe9i3CNLS1jiu8czaT47OBrlgQ7Kooru4TX6x4__txvynLxVEQQK0WYUoIOeIgN33",
        ranking: "112",
        universityType: "Public",
        establishedYear: 1957,
        totalStudents: 42000,
        campusSize: "400 Hectares",
        description: "Known for its world-leading co-operative education program and innovation hub."
    },
    {
        university_id: 'unimelb-001',
        name: "University of Melbourne",
        website: "https://www.unimelb.edu.au",
        country: "Australia",
        city: "Melbourne",
        logoUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=300&auto=format&fit=crop",
        ranking: "14",
        universityType: "Research",
        establishedYear: 1853,
        totalStudents: 52000,
        campusSize: "Parkville",
        description: "Australia's #1 university, providing a distinctive 'Melbourne Model' of education."
    },
    {
        university_id: 'tum-001',
        name: "Technical University of Munich",
        website: "https://www.tum.de",
        country: "Germany",
        city: "Munich",
        logoUrl: "https://images.unsplash.com/photo-1590240984813-98246df16298?q=80&w=300&auto=format&fit=crop",
        ranking: "30",
        universityType: "Technical",
        establishedYear: 1868,
        totalStudents: 50000,
        campusSize: "Multiple",
        description: "One of Europe's top universities, focusing on engineering, natural sciences, and life sciences."
    },
    {
        university_id: 'utoronto-001',
        name: "University of Toronto",
        website: "https://www.utoronto.ca",
        country: "Canada",
        city: "Toronto",
        logoUrl: "https://images.unsplash.com/photo-1623631484736-2182068aa828?q=80&w=300&auto=format&fit=crop",
        ranking: "21",
        universityType: "Research",
        establishedYear: 1827,
        totalStudents: 97000,
        campusSize: "St. George",
        description: "Canada's leading institution of learning, discovery and knowledge creation."
    },
    {
        university_id: 'stanford-001',
        name: "Stanford University",
        website: "https://www.stanford.edu",
        country: "USA",
        city: "Stanford",
        logoUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=300&auto=format&fit=crop",
        ranking: "3",
        universityType: "Private",
        establishedYear: 1885,
        totalStudents: 17000,
        campusSize: "8180 Acres",
        description: "A place for learning, discovery, innovation, expression and discourse."
    },
    {
        university_id: 'nus-001',
        name: "National University of Singapore (NUS)",
        website: "https://www.nus.edu.sg",
        country: "Singapore",
        city: "Singapore",
        logoUrl: "https://images.unsplash.com/photo-1510531752584-532a69e26719?q=80&w=300&auto=format&fit=crop",
        ranking: "8",
        universityType: "Public",
        establishedYear: 1905,
        totalStudents: 40000,
        campusSize: "150 Hectares",
        description: "A leading global university centered in Asia, NUS is Singapore's flagship university."
    }
];

const seedRealData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log('Connected to MongoDB for Real Data Seeding...');

        // 1. Ensure Admin User
        let admin = await User.findOne({ role: 'admin' });
        if (!admin) {
            admin = await User.create({
                fullName: 'Super Admin',
                email: 'admin@eduwoy.com',
                passwordHash: 'seeded_hash', // In a real app, use a real hash
                role: 'admin',
                emailVerified: true
            });
        }

        // 2. Clear existing (Optional - let's just update/insert)
        // await University.deleteMany({});
        // await Post.deleteMany({});

        console.log('Upserting Universities...');
        const seededUnis = [];
        for (const uniData of universities) {
            const uni = await University.findOneAndUpdate(
                { university_id: uniData.university_id },
                {
                    ...uniData,
                    socialLinks: {
                        linkedin: `https://linkedin.com/school/${uniData.name.toLowerCase().replace(/ /g, '-')}`,
                        twitter: `https://twitter.com/${uniData.name.toLowerCase().replace(/ /g, '')}`,
                    }
                },
                { upsert: true, new: true }
            );
            seededUnis.push(uni);
        }

        console.log('Seeding diverse content for the Global Feed...');

        const contentTypes = [
            {
                category: 'Scholarship',
                titles: ['Global Excellence Award 2025', 'Merit Minority Grant', 'Future Leaders Fellowship'],
                tags: ['FinancialAid', 'Scholarship', '2025']
            },
            {
                category: 'Admission',
                titles: ['Spring 2025 Applications Open', 'Early Bird Discount for Fall', 'New Campus Information'],
                tags: ['Admissions', 'Deadlines', 'Enrollment']
            },
            {
                category: 'Policy Update',
                titles: ['Post-Study Work Visa Changes', 'New English Requirement Updates', 'Student Health Insurance Policy'],
                tags: ['Visa', 'Policy', 'Important']
            },
            {
                category: 'Event',
                titles: ['Global Education Fair', 'Meet the Alumni Webinar', 'Student Housing Virtual Tour'],
                tags: ['Webinar', 'GlobalFair', 'Networking']
            }
        ];

        for (const uni of seededUnis) {
            console.log(`Adding content for ${uni.name}...`);

            // Add a Program
            await Post.create({
                authorId: admin._id,
                title: `Master of Computer Science at ${uni.name}`,
                content: `Apply now for the highly competitive MCS program at ${uni.name}. World-class faculty and state-of-the-art labs await you.`,
                category: 'Program',
                universityId: uni._id,
                universityName: uni.name,
                universityLogo: uni.logoUrl,
                location: `${uni.city}, ${uni.country}`,
                tuitionFee: '$35,000 - $45,000',
                programDuration: '2 Years',
                intakes: 'Fall, Spring',
                academicLevel: 'Postgraduate',
                tags: ['STEM', 'ComputerScience', 'Career'],
                banner: uni.logoUrl // Use logo as banner for now or a generic education img
            });

            // Add a Scholarship or Admission update
            const type = contentTypes[Math.floor(Math.random() * contentTypes.length)];
            await Post.create({
                authorId: admin._id,
                title: `${type.titles[Math.floor(Math.random() * type.titles.length)]} - ${uni.name}`,
                content: `Detailed information about ${type.category.toLowerCase()} opportunities at ${uni.name} for international students.`,
                category: type.category,
                universityId: uni._id,
                universityName: uni.name,
                universityLogo: uni.logoUrl,
                location: `${uni.city}, ${uni.country}`,
                tags: type.tags,
                banner: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop'
            });
        }

        // Add some Global Articles (No specific university)
        console.log('Adding global industry articles...');
        const globalArticles = [
            {
                title: "Top 10 Global Trends in International Education for 2025",
                content: "Discover how AI and remote learning are reshaping the landscape of global higher education...",
                category: "Article",
                tags: ["Education", "Trends", "2025"],
                location: "Global",
                banner: "https://images.unsplash.com/photo-1454165833267-0c6ef2807f45?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Visa Interview Secrets: How to Guarantee Your Study Permit",
                content: "Our expert counsellors share the most common mistakes students make during visa interviews...",
                category: "Guide",
                tags: ["Visa", "Counseling", "Success"],
                location: "Global",
                banner: "https://images.unsplash.com/photo-1549421263-549421263?q=80&w=800&auto=format&fit=crop"
            }
        ];

        for (const art of globalArticles) {
            await Post.create({
                ...art,
                authorId: admin._id,
                score: 500
            });
        }

        console.log('Real Data Seeding Completed Successfully!');
        await mongoose.connection.close();
    } catch (err) {
        console.error('Seeding Error:', err);
    }
};

seedRealData();
