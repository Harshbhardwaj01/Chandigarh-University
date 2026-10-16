import { getApplications, submitApplication } from '../services/applications.service.js';

export async function listApplications(req, res) {
  try {
    res.json(await getApplications());
  } catch (error) {
    console.error('Failed to fetch applications:', error.message);
    res.status(500).json({ success: false, error: 'Applications could not be loaded.' });
  }
}

export async function createApplication(req, res) {
  try {
    const result = await submitApplication(req.body);
    if (result.error) {
      return res.status(400).json({ success: false, error: result.error });
    }
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully.',
      applicationId: result.application.id,
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ success: false, error: 'This email has already been used.' });
    }
    console.error('Failed to save application:', error);
    res.status(500).json({ success: false, error: 'Application could not be saved.' });
  }
}
