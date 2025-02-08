const express = require('express');
const router = express.Router();
const { Intro, About } = require('../Models/ProtfolioModel');
const service = require('../Models/Sevice');
const blog = require('../Models/Blog');
const team = require('../Models/Team');
const User = require('../Models/UserModel')


router.get('/portfolio-data', async (req, res) => {
    try {
        const intros = await Intro.find();
        const abouts = await About.find();
        const services = await service.find();
        const teams = await team.find();
        const blogs = await blog.find();

        res.status(200).send({
            intro: intros[0],
            about: abouts[0],
            service: services,
            team: teams,
            blog: blogs,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// **Intro Update API**
router.post('/update-intro', async (req, res) => {
    try {
        const intro = await Intro.findOneAndUpdate(  // ✅ এখানে "Intro" মডেল ব্যবহার করা হয়েছে
            { _id: req.body._id }, 
            req.body, 
            { new: true }
        );

        if (!intro) {
            return res.status(404).json({ success: false, message: "Intro data not found!" });
        }

        res.status(200).json({
            data: intro,
            success: true,
            message: "Intro updated successfully!"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});


// **About Update API**


router.post('/update-about', async (req, res) => {
  try {
      const about = await About.findOneAndUpdate(
          { _id: req.body._id }, 
          req.body, 
          { new: true, runValidators: true }
      );

      if (!about) {
          return res.status(404).json({ success: false, message: "About data not found!" });
      }

      res.status(200).json({
          data: about,
          success: true,
          message: "About section updated successfully!"
      });
  } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// ** Team add API**
router.post('/team-add', async (req, res) => {
    try {
        const newTeamMember = new team(req.body);
        await newTeamMember.save();
        res.status(200).send({
            data: newTeamMember,
            success: true,
            message: "Team member added successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }   
});


router.put('/team-edit/:id', async (req, res) => {
    try {
        // URL থেকে id বের করা
        const { id } = req.params;

        // MongoDB-তে থাকা টিম মেম্বার খোঁজা ও আপডেট করা
        const updatedTeamMember = await team.findByIdAndUpdate(id, req.body, { new: true });

        // যদি মেম্বার না পাওয়া যায়
        if (!updatedTeamMember) {
            return res.status(404).send({ success: false, message: "Team member not found" });
        }

        res.status(200).send({
            data: updatedTeamMember,
            success: true,
            message: "Team member updated successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/team-delete/:id', async (req, res) => {
    try {
        // URL থেকে id বের করা
        const { id } = req.params;

        // MongoDB-তে থাকা টিম মেম্বার খোঁজা ও মুছে ফেলা
        const deletedTeamMember = await team.findByIdAndDelete(id);

        // যদি মেম্বার না পাওয়া যায়
        if (!deletedTeamMember) {
            return res.status(404).send({ success: false, message: "Team member not found" });
        }

        res.status(200).send({
            success: true,
            message: "Team member deleted successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Blog api

router.post('/blog-add', async (req, res) => {
    try {
        const newBlog = new blog(req.body);
        await newBlog.save();
        res.status(200).send({
            data: newBlog,
            success: true,
            message: "Blog added successfully",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
});

// Edit an existing blog
router.put('/blog-edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBlog = await blog.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedBlog) {
            return res.status(404).send({
                success: false,
                message: "Blog not found",
            });
        }

        res.status(200).send({
            data: updatedBlog,
            success: true,
            message: "Blog updated successfully",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
});

// Delete a blog
router.delete('/blog-delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).send({
                success: false,
                message: "Blog not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Blog deleted successfully",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
});


// Add a new service
router.post('/service-add', async (req, res) => {
    try {
        const { title, description, image } = req.body;
        const newService = new service({ title, description, image });
        
        await newService.save();

        res.status(200).send({
            success: true,
            message: "Service added successfully",
            data: newService
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Something went wrong. Please try again.",
            error: error.message
        });
    }
});

// Edit an existing service
router.put('/service-edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedService = await service.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedService) {
            return res.status(404).send({
                success: false,
                message: "Service not found"
            });
        }

        res.status(200).send({
            success: true,
            message: "Service updated successfully",
            data: updatedService
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

// Delete a service
router.delete('/service-delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedService = await service.findByIdAndDelete(id);

        if (!deletedService) {
            return res.status(404).send({
                success: false,
                message: "Service not found"
            });
        }

        res.status(200).send({
            success: true,
            message: "Service deleted successfully"
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

router.post("/admin-login", async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });

        if (user) {
            return res.status(200).send({
                success: true,
                message: "Login Successfully"
            });
        } else {
            return res.status(400).send({
                success: false,
                message: "Invalid username or password"
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
});

module.exports = router;




module.exports = router;
