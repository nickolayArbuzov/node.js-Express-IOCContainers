import {Request, Response, NextFunction} from 'express'

const resolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']
const checkResolution = (res: string[]) => {
    res.forEach(r => {
        if(!resolutions.includes(r)) {
            return false
        }
    })
    return true
}

export const validMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let errors = {errorMessages: [] as {message: string, field: string}[]}
    if(!req.body.title || req.body.title.trim().length < 1 || req.body.title.trim().length > 40 ) {
        errors.errorMessages.push({message: 'incorrect title', field: 'title'})
    }
    if(!req.body.author || req.body.author.trim().length < 1 || req.body.author.trim().length > 20 ) {
        errors.errorMessages.push({message: 'incorrect author', field: 'author'})
    }
    if(req.body.availableResolutions && Array.isArray(req.body.availableResolutions) && !checkResolution(req.body.availableResolutions)) {
        errors.errorMessages.push({message: 'incorrect availableResolutions', field: 'availableResolutions'})
    }
    if(req.body.minAgeRestriction && (typeof req.body.minAgeRestriction !== "number" || req.body.minAgeRestriction < 0)) {
        errors.errorMessages.push({message: 'incorrect minAgeRestriction', field: 'minAgeRestriction'})
    }
    if(req.body.canBeDownloaded && typeof req.body.canBeDownloaded !== "boolean") {
        errors.errorMessages.push({message: 'incorrect canBeDownloaded', field: 'canBeDownloaded'})
    }
    if(errors.errorMessages.length > 0) {
        res.status(400).send(errors)
        return
    } 
    next()
}