const { default: axios } = require("axios");
const pool = require("../database/index");
const { setCache } = require("../redis");

const submissionController = {
  getAll: async (req, res) => {
    try {
        // latest first order by timestamp
        const [rows, fields] = await pool.query(
            "select * from code_submissions order by id desc"
            );
      setCache("submissions-all", rows);
      res.json({
        data: rows,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "select * from code_submissions where id = ?",
        [id]
      );
      res.json({
        data: rows,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
  create: async (req, res) => {
    try {
      const { username, source_code, language, stdin } = req.body;
      const [rows, fields] = await pool.query(
        "insert into code_submissions (username, source_code, language, stdin) values (?, ?, ?, ?)",
        [username, source_code, language, stdin]
      );
      setCache("submissions-all", null);
      res.json({
        status: "success",
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { username, source_code, language, stdin } = req.body;
      const [rows, fields] = await pool.query(
        "update code_submissions set username = ?, source_code = ?, language = ?, stdin = ? where id = ?",
        [username, source_code, language, stdin, id]
      );
      setCache("submissions-all", null);
      res.json({
        status: "success",
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "delete from code_submissions where id = ?",
        [id]
      );
      setCache("submissions-all", null);
      res.json({
        status: "success",
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
  deleteAll: async (req, res) => {
    try {
      const [rows, fields] = await pool.query("delete from code_submissions");
      setCache("submissions-all", null);
      res.json({
        status: "success",
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
  compileCode: async (req, res) => {
    try {
      const { source_code, language, stdin } = req.body;
      const options = {
        method: "POST",
        url: "https://judge0-ce.p.rapidapi.com/submissions",
        params: {
          base64_encoded: "true",
          fields: "*",
          wait: "true",
        },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": "3df8f0f7cbmsh8fabfbdfa8ca9ccp1b6a3fjsnf69f35f83373",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
        data: {
          language_id: language,
          source_code: Buffer.from(source_code).toString("base64"),
          stdin: Buffer.from(stdin).toString("base64"),
        },
      };
      console.log({
        language_id: language,
        source_code: Buffer.from(source_code).toString("base64"),
        stdin: Buffer.from(stdin).toString("base64"),
      },);
      const response = await axios.request(options);
      console.log(response.data);
      res.json({
        status: "success",
        data: response.data,
      });
    }
    catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
};

module.exports = submissionController;
