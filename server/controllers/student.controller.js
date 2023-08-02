const { Student, User, Class, Testing, Exam } = require('../models');

const create = async (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: 'Content can not be empty!',
      });
      return;
    }

    // Create a user
    const user = {
      displayName: req.body.displayName,
      gender: req.body.gender,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      address: req.body.address,
      dob: req.body.dob,
    };
    const newUser = await User.create(user);

    // Save Student in the database
    const newStudent = await Student.create({ idUser: newUser.idUser });

    const response = await Student.findByPk(newStudent.idStudent, {
      include: [
        { model: User },
        {
          model: Class,
        },
        {
          model: Exam,
          include: [{ model: Class }],
        },
      ],
    });
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({
      message: err || 'Some error occurred while creating the Student.',
    });
  }
};

// Retrieve all Students from the database.
const findAll = (req, res) => {
  Student.findAll({
    include: [
      { model: User },
      {
        model: Class,
        as: 'Classes',
      },
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving students.',
      });
    });
};

// Find a single Student with an id
const findOne = (req, res) => {
  const idStudent = req.params.idStudent;

  Student.findOne({
    where: { idStudent: idStudent },
    include: [
      { model: User },
      {
        model: Class,
      },
      {
        model: Exam,
        include: [{ model: Class }],
      },
    ],
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Student. Maybe student was deleted`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error retrieving Student',
      });
    });
};

// Update a Student by the id in the request
const update = async (req, res) => {
  try {
    const idStudent = req.params.idStudent;
    const idUser = req.body.idUser;
    const { idClasses } = req.body;

    const student = await Student.findByPk(idStudent);
    const classes = await Class.findAll({
      where: {
        idClass: idClasses,
      },
    });

    student.setClasses(classes);

    const num = await User.update(req.body.User, {
      where: { idUser: idUser },
    });
    if (num == 1) {
      res.send({
        message: 'Student was updated successfully.',
      });
    } else {
      res.send({
        message: `Cannot update Student with id=${idStudent}. Maybe Student was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error updating Student with id=' + idStudent,
    });
  }
};
const updateScore = async (req, res) => {
  // const idStudent = req.params.idStudent;
  const testings = req.body;
  testings.map(testing => {
    Testing.findOne({
      where: { idStudent: testing.idStudent, idExam: testing.idExam },
    })
      .then(existTest => {
        if (existTest) {
          Testing.update(
            { score: testing.score },
            {
              where: { idStudent: testing.idStudent, idExam: testing.idExam },
            }
          );
        } else {
          Testing.create({
            idStudent: testing.idStudent,
            idExam: testing.idExam,
            score: testing.score,
          });
        }
      })
      .catch(err => {
        res.send(err);
      });
  });
  res.send('Update succesfully');
};
// Delete a Student with the specified id in the request
const remove = (req, res) => {
  const idStudent = req.params.idStudent;

  Student.update(
    { isDeleted: true },
    {
      where: { idStudent: idStudent },
    }
  )
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Student was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Student with id=${idStudent}. Maybe Student was not found!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Could not delete Student with id=' + idStudent,
      });
    });
};

// Retrieve all Students from the database.
const findByIdClass = (req, res) => {
  const { idClass } = req.params;
  Student.findAll({
    include: [
      { model: User },
      {
        model: Class,
        as: 'Classes',
        where: { idClass: idClass },
      },
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message,
      });
    });
};
module.exports = { create, findAll, findOne, update, remove, updateScore, findByIdClass };
