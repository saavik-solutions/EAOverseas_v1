export const CONTACTS = {
    whatsapp: {
        number: '+91 97015 63362',
        link: 'https://wa.me/919701563362',
        message: 'Hello! I am interested in learning more about study abroad opportunities with Eduwoy.',
    },
    support: {
        email: 'edu@eduwoy.com',
        phone: '+91 97015 63362',
        phoneSecondary: '+91 97015 63362',
        address: '6250 West Park Dr Ste 319, Houston, TX 77057 United States',
    },
    socials: {
        facebook: 'https://facebook.com/eduwoy',
        youtube: 'https://youtube.com/eduwoy',
        twitter: 'https://twitter.com/eduwoy',
        instagram: 'https://instagram.com/eduwoy',
        linkedin: 'https://linkedin.com/company/eduwoy',
    }
};

export const getWhatsAppLink = (message?: string) => {
    const baseUrl = `https://wa.me/919701563362`;
    if (message) {
        return `${baseUrl}?text=${encodeURIComponent(message)}`;
    }
    return `${baseUrl}?text=${encodeURIComponent(CONTACTS.whatsapp.message)}`;
};
