import React from 'react';
import { useNavigate } from 'react-router-dom';
import { experts } from '@/data/experts';

const Team = () => {
    const navigate = useNavigate();
    const teamMembers = experts;

    return (
        <div className="max-w-[1200px] mx-auto py-12 px-6">
                {/* Page Heading */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">Our Expert Team</h1>
                        <p className="text-[#636988] text-lg leading-relaxed">
                            Meet the dedicated professionals at Eduwoy committed to guiding your global education journey with integrity and expertise.
                        </p>
                    </div>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/expert-profile/${member.id}`)}
                            className="group bg-white rounded-xl p-4 shadow-sm transition-all duration-300 border border-transparent cursor-pointer hover:shadow-md"
                        >
                            <div className="relative overflow-hidden rounded-lg aspect-square mb-4">
                                <div
                                    className="w-full h-full bg-center bg-no-repeat bg-cover transform group-hover:scale-105 transition-transform duration-500"
                                    style={{ backgroundImage: `url(${member.image})` }}
                                />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-lg font-bold leading-tight">{member.name}</h3>
                                <p className="text-[#193ce6] text-sm font-semibold mb-3">{member.role}</p>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {member.tags.map((tag, i) => (
                                        <span key={i} className="px-2 py-1 bg-[#193ce6]/10 text-[#193ce6] text-[10px] font-bold uppercase rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                { /* Bio commented out or removed to follow 'only image' hover instruction strictly */}
                            </div>
                        </div>
                    ))}
                </div>
        </div>
    );
};

export default Team;


