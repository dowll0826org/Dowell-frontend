import { api } from '@/lib/api';

export const submitContactFormApi = async (data: { name: string, email: string, subject: string, message: string }) => {
    try {
        const response = await api.post('/api/v1/contact', data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to submit contact form.');
    }
};
