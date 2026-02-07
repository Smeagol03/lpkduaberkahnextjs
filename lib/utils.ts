// lib/utils.ts

/**
 * Helper function to get nested property values
 */
export function getNestedProperty(obj: Record<string, any>, path: string): any {
  if (!obj) return null;
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : null;
  }, obj);
}

/**
 * Format date to Indonesian format
 */
export function formatDateIndonesia(dateString: string): string {
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return dateString;
    }
    
    const monthNames = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

/**
 * Check if user is admin
 */
export function isAdmin(): boolean {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('admin') !== null;
  }
  return false;
}

/**
 * Redirect to login if not admin
 */
export function redirectToLogin(router: { push: (path: string) => void }) {
  if (typeof window !== 'undefined') {
    router.push('/admin/login');
  }
}