const API_URL = "http://localhost:3000";
async function request(endpoint, method = "GET", data = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const token = localStorage.getItem("token");

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(API_URL + endpoint, options);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Erreur serveur");
  }

  return result;
}
const AuthAPI = {
  login(data) {
    return request("/auth/login", "POST", data);
  },

  register(data) {
    return request("/auth/register", "POST", data);
  },
};
const UserAPI = {
  getAll() {
    return request("/users");
  },

  getById(id) {
    return request(`/users/${id}`);
  },

  create(data) {
    return request("/users", "POST", data);
  },

  update(id, data) {
    return request(`/users/${id}`, "PUT", data);
  },

  delete(id) {
    return request(`/users/${id}`, "DELETE");
  },
};

const StudentAPI = {
  getAll() {
    return request("/students");
  },

  getById(id) {
    return request(`/students/${id}`);
  },

  create(data) {
    return request("/students", "POST", data);
  },

  update(id, data) {
    return request(`/students/${id}`, "PUT", data);
  },

  delete(id) {
    return request(`/students/${id}`, "DELETE");
  },
};
const TeacherAPI = {
  getAll() {
    return request("/teachers");
  },

  getById(id) {
    return request(`/teachers/${id}`);
  },

  create(data) {
    return request("/teachers", "POST", data);
  },

  update(id, data) {
    return request(`/teachers/${id}`, "PUT", data);
  },

  delete(id) {
    return request(`/teachers/${id}`, "DELETE");
  },
};
const SubjectAPI = {
  getAll() {
    return request("/subjects");
  },

  getById(id) {
    return request(`/subjects/${id}`);
  },

  create(data) {
    return request("/subjects", "POST", data);
  },

  update(id, data) {
    return request(`/subjects/${id}`, "PUT", data);
  },

  delete(id) {
    return request(`/subjects/${id}`, "DELETE");
  },
};
const GradeAPI = {
  getAll() {
    return request("/grades");
  },

  getById(id) {
    return request(`/grades/${id}`);
  },

  create(data) {
    return request("/grades", "POST", data);
  },

  update(id, data) {
    return request(`/grades/${id}`, "PUT", data);
  },

  delete(id) {
    return request(`/grades/${id}`, "DELETE");
  },
};
const AbsenceAPI = {
  getAll() {
    return request("/absences");
  },

  getById(id) {
    return request(`/absences/${id}`);
  },

  create(data) {
    return request("/absences", "POST", data);
  },

  update(id, data) {
    return request(`/absences/${id}`, "PUT", data);
  },

  delete(id) {
    return request(`/absences/${id}`, "DELETE");
  },
};
const StatisticsAPI = {
  bestStudent() {
    return request("/grades/best");
  },

  generalAverage() {
    return request("/grades/general");
  },

  studentAverage(id) {
    return request(`/grades/student/${id}`);
  },

  studentStatistics(id) {
    return request(`/grades/statistics/${id}`);
  },

  subjectAverage(id) {
    return request(`/grades/subjects/${id}`);
  },

  absences(id) {
    return request(`/grades/absences/${id}`);
  },
};




// chat 
const API_URL = "http://localhost:3000/api";

export default API_URL;