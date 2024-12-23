import axios from 'axios';
import { ResponseDto } from './dto/response-item.dto';

const API_URL = 'http://localhost:3001/marketplace'; // Update with backend URL

export const fetchItems = async () => {
    const response = await axios.get(`${API_URL}/items`);
    return response.data;
};

/**
 * List a new item for sale
 * @param data - Data for listing an item (token address, amount, and price)
 * @returns The response data from the API
 */
export const listItem = async (data: { token: string; amount: string; price: string, address: string }): Promise<ResponseDto[]> => {
    const response = await axios.post<ResponseDto>(`${API_URL}/list`, data);
    return response.data as unknown as ResponseDto[];
};

/**
 * List a new item for sale behalf
 * @param data - Data for listing an item (token address, amount, and price)
 * @returns The response data from the API
 */
export const listItemBehalf = async (data: { token: string; amount: string; price: string,  address: string, signature?: string }): Promise<ResponseDto[]> => {
    const response = await axios.post<ResponseDto>(`${API_URL}/listBehalf`, data);
    return response.data as unknown as ResponseDto[];
};

/**
 * Purchase an item
 * @param data - Data for purchasing an item (listingId and value in ETH)
 * @returns The response data from the API
 */
export const purchaseItem = async (data: { listingId: string; value: string }): Promise<ResponseDto> => {
    const response = await axios.post<ResponseDto>(`${API_URL}/purchase`, data);
    return response.data;
};

/**
 * Withdraw accumulated funds
 * @param data - Optional data required for withdrawing funds (if any)
 * @returns The response data from the API
 */
export const withdrawFunds = async (data: { signerAddress: string; }): Promise<ResponseDto> => {
    const response = await axios.post<ResponseDto>(`${API_URL}/withdraw`, data);
    return response.data;

};
