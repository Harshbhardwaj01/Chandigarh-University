const cityOptions = new Set([
  'Amritsar', 'Ahmedabad', 'Bengaluru', 'Bhopal', 'Bhubaneswar', 'Chandigarh', 'Chennai',
  'Dehradun', 'Delhi', 'Gurugram', 'Guwahati', 'Hyderabad', 'Indore', 'Jaipur', 'Jalandhar',
  'Jammu', 'Kanpur', 'Kochi', 'Kolkata', 'Lucknow', 'Ludhiana', 'Mumbai', 'Mysuru',
  'Nagpur', 'New Delhi', 'Noida', 'Patna', 'Pune', 'Rohtak', 'Shimla', 'Srinagar',
  'Surat', 'Thiruvananthapuram', 'Varanasi', 'Visakhapatnam'
]);

export function validateApplication(application) {
  const namePattern = /^[\p{L}]+(?: [\p{L}]+)*$/u;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!namePattern.test(application.name)) return 'Enter a valid name.';
  if (!emailPattern.test(application.email)) return 'Enter a valid email address.';
  if (!/^\d{10}$/.test(application.phone)) return 'Enter a valid 10-digit phone number.';
  if (!application.program || application.program.length > 100) return 'Select a valid program.';
  if (!cityOptions.has(application.city)) return 'Select a city from the search results.';

  return null;
}
