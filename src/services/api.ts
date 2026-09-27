import {
  PublicContentResponse,
  SiteSettings,
  ServiceItem,
  PortfolioItem,
  Film,
  TestimonialItem,
  EnquiryItem,
  DashboardStats,
  AdminUser,
} from '../types';

const ADMIN_TOKEN_KEY = 'rishabh_admin_token';

export function getAdminToken(): string | null {
  return sessionStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token: string): void {
  sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken(): void {
  sessionStorage.removeItem(ADMIN_TOKEN_KEY);
}

function authHeaders(): Record<string, string> {
  const token = getAdminToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// 1. Fetch public content
export async function fetchPublicContent(): Promise<PublicContentResponse> {
  const res = await fetch('/api/public/content');
  if (!res.ok) {
    throw new Error('Failed to load portfolio content.');
  }
  return res.json();
}

// 2. Submit enquiry
export async function submitEnquiry(payload: {
  name: string;
  email: string;
  phone?: string;
  eventType?: string;
  eventDate?: string;
  message: string;
}): Promise<{ success: boolean; message: string; enquiryId?: string }> {
  const res = await fetch('/api/enquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to submit enquiry.');
  }
  return data;
}

// 3. Admin login
export async function adminLogin(
  email: string,
  password: string
): Promise<{ success: boolean; token: string; admin: AdminUser }> {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Login failed.');
  }
  setAdminToken(data.token);
  return data;
}

// 4. Verify admin token
export async function fetchAdminMe(): Promise<{ admin: AdminUser }> {
  const res = await fetch('/api/admin/me', {
    headers: authHeaders(),
  });
  if (!res.ok) {
    clearAdminToken();
    throw new Error('Session invalid or expired.');
  }
  return res.json();
}

// 5. Admin logout
export async function adminLogout(): Promise<void> {
  try {
    await fetch('/api/admin/logout', {
      method: 'POST',
      headers: authHeaders(),
    });
  } finally {
    clearAdminToken();
  }
}

// 6. Change admin password/profile
export async function updateAdminSecurity(payload: {
  currentPassword: string;
  newPassword?: string;
  email?: string;
  name?: string;
}): Promise<{ success: boolean; message: string }> {
  const res = await fetch('/api/admin/change-password', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to update security settings.');
  }
  return data;
}

// 7. Dashboard stats
export async function fetchDashboardStats(): Promise<DashboardStats> {
  const res = await fetch('/api/admin/dashboard-stats', {
    headers: authHeaders(),
  });
  if (!res.ok) {
    throw new Error('Failed to load dashboard metrics.');
  }
  return res.json();
}

// 8. Site settings
export async function fetchSiteSettings(): Promise<SiteSettings> {
  const res = await fetch('/api/admin/site-settings', {
    headers: authHeaders(),
  });
  if (!res.ok) {
    throw new Error('Failed to load site settings.');
  }
  return res.json();
}

export async function updateSiteSection<K extends keyof SiteSettings>(
  section: K,
  data: SiteSettings[K]
): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`/api/admin/site-settings/${section}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  const resData = await res.json();
  if (!res.ok) {
    throw new Error(resData.error || `Failed to update ${section}.`);
  }
  return resData;
}

// 9. Services CRUD
export async function fetchAdminServices(): Promise<ServiceItem[]> {
  const res = await fetch('/api/admin/services', { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to load services.');
  return res.json();
}

export async function createService(payload: Partial<ServiceItem>): Promise<ServiceItem> {
  const res = await fetch('/api/admin/services', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to create service.');
  return data;
}

export async function updateService(id: string, payload: Partial<ServiceItem>): Promise<ServiceItem> {
  const res = await fetch(`/api/admin/services/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update service.');
  return data;
}

export async function deleteService(id: string): Promise<void> {
  const res = await fetch(`/api/admin/services/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete service.');
}

// 10. Portfolio CRUD
export async function fetchAdminPortfolio(): Promise<PortfolioItem[]> {
  const res = await fetch('/api/admin/portfolio', { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to load portfolio.');
  return res.json();
}

export async function createPortfolioItem(payload: Partial<PortfolioItem>): Promise<PortfolioItem> {
  const res = await fetch('/api/admin/portfolio', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to create portfolio item.');
  return data;
}

export async function updatePortfolioItem(id: string, payload: Partial<PortfolioItem>): Promise<PortfolioItem> {
  const res = await fetch(`/api/admin/portfolio/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update portfolio item.');
  return data;
}

export async function deletePortfolioItem(id: string): Promise<void> {
  const res = await fetch(`/api/admin/portfolio/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete portfolio item.');
}

export async function reorderPortfolio(items: Array<{ id: string; order: number }>): Promise<void> {
  const res = await fetch('/api/admin/portfolio-reorder', {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ items }),
  });
  if (!res.ok) throw new Error('Failed to save order.');
}

// 11. Testimonials CRUD
export async function fetchAdminTestimonials(): Promise<TestimonialItem[]> {
  const res = await fetch('/api/admin/testimonials', { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to load testimonials.');
  return res.json();
}

export async function createTestimonial(payload: Partial<TestimonialItem>): Promise<TestimonialItem> {
  const res = await fetch('/api/admin/testimonials', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to create testimonial.');
  return data;
}

export async function updateTestimonial(id: string, payload: Partial<TestimonialItem>): Promise<TestimonialItem> {
  const res = await fetch(`/api/admin/testimonials/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update testimonial.');
  return data;
}

export async function deleteTestimonial(id: string): Promise<void> {
  const res = await fetch(`/api/admin/testimonials/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete testimonial.');
}

// 12. Enquiries Management
export async function fetchAdminEnquiries(params?: {
  status?: string;
  eventType?: string;
  search?: string;
}): Promise<EnquiryItem[]> {
  const query = new URLSearchParams();
  if (params?.status) query.append('status', params.status);
  if (params?.eventType) query.append('eventType', params.eventType);
  if (params?.search) query.append('search', params.search);

  const res = await fetch(`/api/admin/enquiries?${query.toString()}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to load enquiries.');
  return res.json();
}

export async function updateEnquiryStatus(id: string, status: 'read' | 'unread'): Promise<void> {
  const res = await fetch(`/api/admin/enquiries/${id}/status`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update enquiry status.');
}

export async function deleteEnquiry(id: string): Promise<void> {
  const res = await fetch(`/api/admin/enquiries/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete enquiry.');
}

// 13. Image upload
export async function uploadImage(dataUri: string, fileName?: string): Promise<{ fileUrl: string }> {
  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ dataUri, fileName }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to upload image.');
  }
  return data;
}

// 14. Films / Cinematography CRUD
export async function fetchAdminFilms(): Promise<Film[]> {
  const res = await fetch('/api/admin/films', { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to load films.');
  return res.json();
}

export async function createFilm(payload: Partial<Film>): Promise<Film> {
  const res = await fetch('/api/admin/films', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to create film.');
  return data;
}

export async function updateFilm(id: string, payload: Partial<Film>): Promise<Film> {
  const res = await fetch(`/api/admin/films/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update film.');
  return data;
}

export async function deleteFilm(id: string): Promise<void> {
  const res = await fetch(`/api/admin/films/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete film.');
}

export async function reorderFilms(items: Array<{ id: string; order: number }>): Promise<void> {
  const res = await fetch('/api/admin/films-reorder', {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ items }),
  });
  if (!res.ok) throw new Error('Failed to save films order.');
}

