import React, { useState } from 'react';
import checkmark_success from './icon-success-check.svg'

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
        if (!formData.firstName) newErrors.firstName = 'This field is required';
        if (!formData.lastName) newErrors.lastName = 'This field is required';
        if (!formData.email) {
            newErrors.email = 'This fields is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.enquiryType) newErrors.enquiryType = 'Please select a query type';
        if (!formData.message) newErrors.message = 'This field is required';
        if (!formData.consent) newErrors.consent = 'To submit this form, please consent to being contacted';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });

        if (name === "enquiryType") {
            const queryElements = document.querySelectorAll('.query');
            queryElements.forEach(element => {
                element.classList.remove('selected');
            });

            if (value === 'General Enquiry') {
                document.querySelector('.query input[value="General Enquiry"]').parentElement.classList.add('selected');
            } else if (value === 'Support Request') {
                document.querySelector('.query input[value="Support Request"]').parentElement.classList.add('selected');
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            setShowConfirmation(true);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                enquiryType: '',
                message: '',
                consent: false,
            })
            setTimeout(() => {
                setShowConfirmation(false)
            }, 3000)
        } else {
            setErrors(validationErrors);
            // Clears errors after 3 seconds
            setTimeout(() => {
                setErrors({})
            }, 3000)
        }
    };

    return (
        <>
            {showConfirmation && (
                <div className='success-alert'>
                    <p><img src={checkmark_success}/><strong>Message Sent!</strong></p>
                    <p>Thanks for completing the form. We'll be in touch soon!</p>
                </div>
            )}
        
            <div className='formContainer' role='form'>
                <h1>Contact Us</h1>
                <form onSubmit={handleSubmit}>
                    <div className={`form-input half ${errors.firstName ? 'input-error': ''}`}>
                        <label for="firstName">First Name <span>*</span></label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        {errors.firstName && <p className='error'>{errors.firstName}</p>}
                    </div>
                    <div className={`form-input half ${errors.lastName ? 'input-error': ''}`}>
                        <label for="lastName">Last Name <span>*</span></label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        {errors.lastName && <p className='error'>{errors.lastName}</p>}
                    </div>
                    <div className={`form-input full ${errors.email ? 'input-error': ''}`}>
                        <label for="email">Email Address <span>*</span></label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className='error'>{errors.email}</p>}
                    </div>
                    <div className='form-input full queries-container'>
                        <label for="enquiryType">Query Type <span>*</span></label>
                        <div className='queries'>
                            <div className={`query ${formData.enquiryType === 'General Enquiry' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="enquiryType"
                                    value="General Enquiry"
                                    onChange={handleChange}
                                    checked={formData.enquiryType === 'General Enquiry'}
                                />
                                General Enquiry
                            </div>
                            <div className={`query ${formData.enquiryType === 'Support Request' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="enquiryType"
                                    value="Support Request"
                                    onChange={handleChange}
                                    checked={formData.enquiryType === 'Support Request'}
                                />
                                Support Request
                            </div>
                        </div>
                        {errors.enquiryType && <p className='error'>{errors.enquiryType}</p>}
                    </div>
                    <div className={`form-input full ${errors.message ? 'input-error': ''}`}>
                        <label for="message">Message <span>*</span></label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                        />
                        {errors.message && <p className='error'>{errors.message}</p>}
                    </div>
                    <div className='form-input full checkbox-container'>
                        <input
                            type="checkbox"
                            name="consent"
                            checked={formData.consent}
                            onChange={handleChange}
                            id="consent"
                        />
                        <label for="consent">I consent to being contacted by the team <span>*</span></label>
                    </div>
                    {errors.consent && <p className='error'>{errors.consent}</p>}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
};

export default ContactForm;
