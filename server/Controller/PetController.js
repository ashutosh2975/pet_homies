const Pet = require('../Model/PetModel');
const fs = require('fs');
const path = require('path');
const { sendEmail } = require('../utils/emailService');

const postPetRequest = async (req, res) => {
  try {
    const { name, age, area, justification, email, phone, type } = req.body;
    const { filename } = req.file;

    const pet = await Pet.create({
      name,
      age,
      area,
      justification,
      email,
      phone,
      type,
      filename,
      status: 'Pending'
    });

    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const approveRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const { email, phone, status } = req.body;
    const pet = await Pet.findByIdAndUpdate(id, { email, phone, status }, { new: true });

    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    // Send approval email
    if (status === 'Approved') {
      await sendEmail(
        pet.email,
        'Pet Adoption Request Approved',
        `Dear Pet Owner,\n\nYour request to sell your pet "${pet.name}" for adoption has been approved by pet Homies. 
        \n\nWe'll be in touch shortly to arrange the transfer of your pet to our adoption center.
        \n\nBest regards,\npet Homies Team`
      );
    }

    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const pet = await Pet.findById(id);
    
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    // Send rejection email before deleting
    await sendEmail(
      pet.email,
      'Pet Adoption Request Update',
      `Dear Pet Owner,\n\nWe regret to inform you that your request to sell your pet "${pet.name}" for adoption has been rejected.
      \n\nThis decision was made based on our current capacity and requirements. You may submit a new request in the future.
      \n\nBest regards,\npet Homies Team`
    );

    // Delete the pet record and image
    await Pet.findByIdAndDelete(id);
    const filePath = path.join(__dirname, '../images', pet.filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const allPets = async (reqStatus, req, res) => {
  try {
    const data = await Pet.find({ status: reqStatus }).sort({ updatedAt: -1 });
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: 'No data found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  postPetRequest,
  approveRequest,
  deletePost,
  allPets
};
