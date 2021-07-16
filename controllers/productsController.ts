import axios, { AxiosResponse } from "axios"
import { Request, Response } from 'express'

const apiUrl = "https://api.producthunt.com"
const token = "c_HObEN14Ow_wksJNuQ2Df2JKuh9RDF5u6AttbMHXms"
const config = {
    headers: {
        "Authorization": "bearer " + token
    } 
}

export const getProducts = (req: Request, res: Response) => {
    axios.get(`${apiUrl}/v1/posts`, config).then(response => {
        res.json({ posts: response.data.posts })
    }).catch(err => {
        res.status(500).json({ message: "Introuvable", error: err })
    })
}

interface Params {
    day: string
}

export const getProductsByDay = (req: Request<Params>, res: Response) => {
    const day = req.params.day

    // TODO: Vérifier si le format de la date est bien YYYY-MM-DD sinon retourner une erreur

    axios.get(`${apiUrl}/v1/posts?day=${day}`, config).then(response => {
        res.json({ posts: response.data.posts })
    }).catch(err => {
        res.status(500).json({ message: "Introuvable" })
    })
}
