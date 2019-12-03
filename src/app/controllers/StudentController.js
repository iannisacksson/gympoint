import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const userExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, weight, height } = await Student.create(req.body);

    return res.json({ id, name, email, weight, height });
  }

  async update(req, res) {
    const { email, oldEmail } = req.body;

    const student = await Student.findOne({
      where: { email: oldEmail },
    });

    if (email !== student.email) {
      const userExists = await Student.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    const { id, name, weight, height } = await student.update(req.body);

    return res.json({ id, name, email, weight, height });
  }
}

export default new StudentController();
