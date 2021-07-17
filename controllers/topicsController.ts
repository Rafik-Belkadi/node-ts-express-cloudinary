import axios, { AxiosResponse } from "axios"
import { Request, Response } from 'express'

const apiUrl = process.env.API_URL
const token = process.env.API_TOKEN

const config = {
    headers: {
        "Authorization": "bearer " + token
    }
}

export const getTopics = (req: Request, res: Response) => {
    axios.get(`${apiUrl}/v1/topics`, config).then(response => {
        res.json({ topics: response.data.topics })
    }).catch(err => {
        res.status(500).json({ message: "Introuvable", error: err })
    })
}
