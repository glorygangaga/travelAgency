import { FetchDefault  } from "./data";

export const fetchBookings = async () => FetchDefault('/api/user/booking', 'GET');
export const fetchReview = async () => FetchDefault('/api/user/review', 'GET');
