import { createApplication, listApplications } from '../repositories/applications.repository.js';
import { validateApplication } from '../validators/application.validator.js';

export async function getApplications() {
  return listApplications();
}

export async function submitApplication(input) {
  const fields = ['name', 'email', 'phone', 'program', 'city'];
  if (!input || fields.some((field) => typeof input[field] !== 'string')) {
    return { error: 'Name, email, phone, program, and city are required.' };
  }

  const application = {
    name: input.name.trim().replace(/\s+/g, ' '),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim().replace(/\s+/g, ' '),
    program: input.program.trim().replace(/\s+/g, ' '),
    city: input.city.trim().replace(/\s+/g, ' '),
    submittedAt: new Date().toISOString(),
  };
  const validationError = validateApplication(application);
  if (validationError) return { error: validationError };

  return { application: await createApplication(application) };
}
