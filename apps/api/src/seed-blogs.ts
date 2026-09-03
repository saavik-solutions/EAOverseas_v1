import mongoose from 'mongoose';
import { Blog } from './models/Blog';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedBlogs = [
    {
        title: "2025 Global Education Outlook: Why Germany is Dominating the Tech Landscape",
        slug: "2025-global-education-outlook-germany-tech",
        content: `
            <h2>The German Technical Renaissance</h2>
            <p>As we approach the mid-2020s, the landscape of international education is shifting dramatically. While traditional powerhouse destinations like the US and UK remain popular, Germany has emerged as a formidable challenger, particularly for students in STEM fields.</p>
            
            <blockquote>"The zero-tuition model, combined with high-tech industry integration, makes Germany the most strategic choice for the modern engineer." - Eduwoy Strategy Team</blockquote>

            <h3>Key Competitive Advantages</h3>
            <ul>
                <li><strong>Economic Stability:</strong> Germany remains the industrial heart of Europe, offering unparalleled job security.</li>
                <li><strong>Research Infrastructure:</strong> Institutions like TU Munich and RWTH Aachen are at the forefront of AI and Green Energy.</li>
                <li><strong>Post-Study Opportunities:</strong> With an 18-month job seeker visa, the transition to the workforce is seamless.</li>
            </ul>

            <p>For international students, the primary hurdle is no longer financial—it's linguistic and cultural integration. At Eduwoy, we optimize your profile to meet these specific institutional requirements.</p>
        `,
        excerpt: "Discover why Germany has become the top destination for international STEM students in 2025, from zero-tuition to industrial dominance.",
        author: "Prasenjeet Kumar",
        coverImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2940&auto=format&fit=crop",
        category: "Strategy",
        tags: ["Germany", "STEM", "2025 Guide"],
        isPublished: true
    },
    {
        title: "Mastering the Ivy League: A Blueprint for Tier-1 Admissions",
        slug: "mastering-ivy-league-blueprint",
        content: `
            <h2>Beyond the GPA: The Institutional Fit</h2>
            <p>Admissions at Tier-1 US universities have evolved beyond numerical metrics. A 4.0 GPA and perfect SAT scores are now baseline requirements, not differentiators.</p>
            
            <h3>The Eduwoy Framework for Success</h3>
            <ol>
                <li><strong>Intellectual Vitality:</strong> Demonstrating a passion that extends beyond the classroom.</li>
                <li><strong>Social Impact:</strong> Quantifiable contributions to your community or industry.</li>
                <li><strong>Institutional Alignment:</strong> Tailoring your narrative to the specific values of the university.</li>
            </ol>
 
            <p>Our consultants specialize in 'Narrative Engineering'—crafting a compelling story that resonates with admissions officers at Harvard, Stanford, and MIT.</p>
        `,
        excerpt: "Learn the secrets of Tier-1 US admissions. It's not just about your grades; it's about your narrative and institutional alignment.",
        author: "EA Strategy Team",
        coverImage: "https://images.unsplash.com/photo-1498243639391-a647421c3c55?q=80&w=2940&auto=format&fit=crop",
        category: "Elite Admissions",
        tags: ["USA", "Ivy League", "Admissions"],
        isPublished: true
    },
    {
        title: "Digital Nomad vs. International Student: Navigating the New Visa Reality",
        slug: "digital-nomad-vs-international-student",
        content: `
            <h2>A New Era of Global Mobility</h2>
            <p>The rise of remote work has created a complex intersection between work and study visas. Countries like Spain, Italy, and Greece are introducing hybrid models that appeal to the modern 'Study-Worker'.</p>
 
            <p>Understanding the legal nuances of these new visa categories is essential to maintaining compliance while maximizing your international experience.</p>
        `,
        excerpt: "Navigating the complex world of modern visas. Which path is right for your career trajectory in a post-pandemic world?",
        author: "Legal Compliance Unit",
        coverImage: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2940&auto=format&fit=crop",
        category: "Visa Intelligence",
        tags: ["Visa", "Legal", "Digital Nomad"],
        isPublished: true
    }
];

async function runSeed() {
    try {
        const uri = process.env.MONGODB_URI || '';
        await mongoose.connect(uri);
        console.log('Connected to MongoDB Cluster');

        // Clear existing blogs to avoid duplicates (optional, based on slug)
        for (const blogData of seedBlogs) {
            await Blog.findOneAndUpdate(
                { slug: blogData.slug },
                blogData,
                { upsert: true, new: true }
            );
        }

        console.log('Institutional Knowledge Base Seeded Successfully');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

runSeed();
