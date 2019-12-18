import { parseISO, addMonths, isBefore } from 'date-fns';
import Plan from '../models/Plan';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';

class EnrollmentController {
  async index(req, res) {
    // const { page = 1 } = req.query;

    const enrollments = await Enrollment.findAll({
      order: ['end_date'],
      // limit: 1,
      // offset: (page - 1) * 1,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
      ],
    });

    return res.json(enrollments);
  }

  async store(req, res) {
    const { student_id, plan_id, start_date } = req.body;

    const plan = await Plan.findByPk(plan_id);

    const parsedStartDate = parseISO(start_date);

    if (isBefore(parsedStartDate, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    if (!plan) {
      return res.status(401).json({ error: 'Plan not exist' });
    }

    const amount = plan.price * plan.duration;

    const end_date = addMonths(parsedStartDate, plan.duration);

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price: amount,
    });

    return res.json(enrollment);
  }
}

export default new EnrollmentController();
