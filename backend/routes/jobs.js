const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// @route   GET api/jobs
// @desc    Get all jobs
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Get query parameters for filtering
    const { status, startDate, endDate, sortBy } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (status) {
      filter.status = status;
    }
    
    if (startDate && endDate) {
      filter.applicationDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    } else if (startDate) {
      filter.applicationDate = { $gte: new Date(startDate) };
    } else if (endDate) {
      filter.applicationDate = { $lte: new Date(endDate) };
    }
    
    // Build sort object
    let sort = { applicationDate: -1 }; // Default sort by date (newest first)
    
    if (sortBy === 'company') {
      sort = { company: 1 };
    } else if (sortBy === 'role') {
      sort = { role: 1 };
    } else if (sortBy === 'status') {
      sort = { status: 1 };
    } else if (sortBy === 'dateAsc') {
      sort = { applicationDate: 1 };
    }
    
    const jobs = await Job.find(filter).sort(sort);
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/jobs/:id
// @desc    Get job by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }
    
    res.json(job);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Job not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

// @route   POST api/jobs
// @desc    Create a job
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { company, role, status, applicationDate, link, notes } = req.body;
    
    // Create new job
    const newJob = new Job({
      company,
      role,
      status,
      applicationDate: applicationDate || Date.now(),
      link,
      notes
    });
    
    const job = await newJob.save();
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/jobs/:id
// @desc    Update a job
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const { company, role, status, applicationDate, link, notes } = req.body;
    
    // Build job object
    const jobFields = {};
    if (company) jobFields.company = company;
    if (role) jobFields.role = role;
    if (status) jobFields.status = status;
    if (applicationDate) jobFields.applicationDate = applicationDate;
    if (link !== undefined) jobFields.link = link;
    if (notes !== undefined) jobFields.notes = notes;
    
    let job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }
    
    // Update
    job = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: jobFields },
      { new: true }
    );
    
    res.json(job);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Job not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/jobs/:id
// @desc    Delete a job
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }
    
    await job.deleteOne();
    
    res.json({ msg: 'Job removed' });
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Job not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

module.exports = router;