import React, { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        enquiryType: '',
        message: '',
        consent: false,
    });

    const [errors, setErrors] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First Name is required';
        if (!formData.lastName) newErrors.lastName = 'Last Name is required';
        if (!formData.email) {
            newErrors.email = 'Email Address is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email Address is invalid';
        }
        if (!formData.enquiryType) newErrors.enquiryType = 'Please select an enquiry type';
        if (!formData.message) newErrors.message = 'Message is required';
        if (!formData.consent) newErrors.consent = 'You must consent to being contacted';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            setShowConfirmation(true);
        } else {
            setErrors(validationErrors);
        }
    };

    const closeConfirmation = () => {
        setShowConfirmation(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
                </div>
                <div>
                    <label>Email Address:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                </div>
                <div>
                    <label>Enquiry Type:</label>
                    <div>
                        <input
                            type="radio"
                            name="enquiryType"
                            value="General Enquiry"
                            onChange={handleChange}
                            checked={formData.enquiryType === 'General Enquiry'}
                        />
                        General Enquiry
                        <input
                            type="radio"
                            name="enquiryType"
                            value="Support Request"
                            onChange={handleChange}
                            checked={formData.enquiryType === 'Support Request'}
                        />
                        Support Request
                    </div>
                    {errors.enquiryType && <p style={{ color: 'red' }}>{errors.enquiryType}</p>}
                </div>
                <div>
                    <label>Message:</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                    />
                    {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
                </div>
                <div>
                    <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                    />
                    <label>I consent to being contacted by the team *</label>
                    {errors.consent && <p style={{ color: 'red' }}>{errors.consent}</p>}
                </div>
                <button type="submit">Submit</button>
            </form>

            {showConfirmation && (
                <div>
                    <p>Your submission was successful!</p>
                    <button onClick={closeConfirmation}>Close</button>
                </div>
            )}
        </div>
    );
};

export default ContactForm;
