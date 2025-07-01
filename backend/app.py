# backend/app.py
import tornado.ioloop
import tornado.web
import tornado.escape
import json

students = [
    {"id": 1, "name": "Alice", "roll_number": "1001", "subject": "Math", "marks": 90},
    {"id": 2, "name": "Bob", "roll_number": "1002", "subject": "Science", "marks": 85}
]

admin_credentials = {"username": "admin", "password": "NueveIt"}
logged_in_admins = set()


class BaseHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Content-Type", "application/json")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "Content-Type")
        self.set_header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS")

    def options(self, *args, **kwargs):
        self.set_status(204)
        self.finish()


class AdminLoginHandler(BaseHandler):
    def post(self):
        data = tornado.escape.json_decode(self.request.body)
        if (data.get("username") == admin_credentials["username"] and
                data.get("password") == admin_credentials["password"]):
            logged_in_admins.add(self.request.remote_ip)
            self.write(json.dumps({"message": "Login successful"}))
        else:
            self.set_status(401)
            self.write(json.dumps({"error": "Invalid credentials"}))


class AdminLogoutHandler(BaseHandler):
    def post(self):
        logged_in_admins.discard(self.request.remote_ip)
        self.write(json.dumps({"message": "Logout successful"}))


class StudentHandler(BaseHandler):
    def get(self):
        self.write(json.dumps({"data": students}))

    def post(self):
        if self.request.remote_ip not in logged_in_admins:
            self.set_status(403)
            self.write(json.dumps({"error": "Not authorized"}))
            return

        data = tornado.escape.json_decode(self.request.body)
        data["id"] = students[-1]["id"] + 1 if students else 1
        students.append(data)
        self.write(json.dumps({"message": "Result added successfully."}))


class StudentDeleteHandler(BaseHandler):
    def options(self, student_id):
        self.set_status(204)
        self.finish()

    def delete(self, student_id):
        if self.request.remote_ip not in logged_in_admins:
            self.set_status(403)
            self.write(json.dumps({"error": "Not authorized"}))
            return

        global students
        student_id = int(student_id)
        students = [s for s in students if s["id"] != student_id]
        self.write(json.dumps({"message": "Result deleted successfully."}))


def make_app():
    return tornado.web.Application([
        (r"/results", StudentHandler),
        (r"/results/([0-9]+)", StudentDeleteHandler),
        (r"/admin/login", AdminLoginHandler),
        (r"/admin/logout", AdminLogoutHandler)
    ])


if __name__ == "__main__":
    app = make_app()
    app.listen(8000)
    print("Server started at http://localhost:8000")
    tornado.ioloop.IOLoop.current().start()