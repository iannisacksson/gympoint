class UserController {
  async update(req, res) {
    return res.json({ ok: true });
  }
}

export default new UserController();
