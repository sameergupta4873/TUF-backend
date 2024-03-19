const pool = require("../database/index")
const { setCache } = require("../redis")

const submissionController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from code_submissions")
            setCache("submissions-all", rows)
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("select * from code_submissions where id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    create: async (req, res) => {
        try {
            const { username, source_code, language, stdin} = req.body
            const [rows, fields] = await pool.query("insert into code_submissions (username, source_code, language, stdin) values (?, ?, ?, ?)", [username, source_code, language, stdin])
            setCache("submissions-all", null)
            res.json({
                status: "success",
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params
            const { username, source_code, language, stdin} = req.body
            const [rows, fields] = await pool.query("update code_submissions set username = ?, source_code = ?, language = ?, stdin = ? where id = ?", [username, source_code, language, stdin, id])
            setCache("submissions-all", null)
            res.json({
                status: "success",
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("delete from code_submissions where id = ?", [id])
            res.json({
                status: "success",
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    deleteAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("delete from code_submissions")
            res.json({
                status: "success",
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }
}

module.exports = submissionController